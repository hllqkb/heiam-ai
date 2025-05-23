package com.springai.springai.service.impl;

import com.springai.springai.Constant.StringConstant;
import com.springai.springai.model.enums.ChatType;
import com.springai.springai.service.ChatService;
import com.springai.springai.service.DataBaseChatMemory;
import com.springai.springai.service.LLMService;
import com.springai.springai.service.OriginFileService;
import com.springai.springai.tools.WeatherTool;
import com.springai.springai.tools.SqlQueryTool;
import com.springai.springai.utils.SaTokenUtil;
import core.pojo.entity.SystemUser;
import core.pojo.vo.ChatMessageVO;
import core.pojo.vo.ChatRequestVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.content.Media;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.springai.springai.Constant.StringConstant.CHAT_MEDIAS;
import static com.springai.springai.Constant.StringConstant.RAG_TOP_K;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final LLMService llmService;
    private final SaTokenUtil saTokenUtil;
    private final OriginFileService originFileService;
    private final DataBaseChatMemory databaseChatMemory;
    private final WeatherTool weatherTool;
    private final OpenAiImageModel openAiImageModel;
    private final SqlQueryTool sqlQueryTool;
    @Value("classpath:prompt/RAG.txt")
    private Resource ragPrompt;
    @Override
    public Flux<ChatResponse> unifyChat(ChatRequestVO chatRequestVO) {
        //获取前端的请求聊天类型
        String chatType = chatRequestVO.getChatType();
        //创建一个消息
        ChatMessageVO chatMessageVO = new ChatMessageVO();
        //把ChatMessageVO的内容拷贝到chatRequestVO中
        BeanUtils.copyProperties(chatRequestVO, chatMessageVO);
        // 确保 conversationId 正确设置为 String 类型
        chatMessageVO.setConversationId(String.valueOf(chatRequestVO.getConversationId()));
        //根据聊天类型，调用不同的聊天服务
        //获取枚举类型
        ChatType type = ChatType.parse(chatType);
        return switch (type) {
            case SIMPLE -> this.simpleChat(chatMessageVO);
            case SIMPLE_RAG -> this.simpleRAGChat(chatMessageVO, chatRequestVO.getKnowledgeIds());
            case MULTIMODEL -> this.multimodalChat(chatMessageVO);
            case MULTIMODEL_RAG -> this.multimodalRAGChat(chatMessageVO, chatRequestVO.getKnowledgeIds());
            case LONGMODEL -> this.longChat(chatRequestVO);
            default -> Flux.error(new IllegalArgumentException("未知对话类型: " + chatType));
        };

    }

    @Override
    public Flux<ChatResponse> getFunctionChat(ChatRequestVO chatMessageVO) {
        ChatModel chatModel = llmService.getChatModel();
        ChatClient chatClient = ChatClient.builder(chatModel)
                .defaultTools(weatherTool, sqlQueryTool)
                .build();
        
        return chatClient.prompt()
                .user(user -> {
                    user.param(StringConstant.CHAT_CONSERVATION_NAME, String.valueOf(chatMessageVO.getConversationId()));
                    user.text(chatMessageVO.getContent());
                })
                .system("""
                    你是一个智能助手，可以查询天气和历史对话记录。
                    当用户询问天气时，你可以调用天气工具获取实时数据。
                    当用户需要查看历史对话记录时，你可以调用SQL查询工具获取详细信息。
                    工具调用格式示例：
                    天气查询：
                    {
                        "province": "四川省",
                        "city": "绵阳市"
                    }
                    历史对话查询：
                    {
                        "conversationId": "123",
                        "limit": 10
                    }
                    请根据用户的问题选择合适的工具。
                    """)
                .advisors(MessageChatMemoryAdvisor.builder(databaseChatMemory)
                        .chatMemoryRetrieveSize(StringConstant.CHAT_MAX_LENGTH)
                        .conversationId(String.valueOf(chatMessageVO.getConversationId()))
                        .build())
                .stream()
                .chatResponse();
    }

    @Override
    public String draw(String prompt) {
        log.info("prompt: {}", prompt);
        if (prompt == null) {
            return null;
        }
        ImageResponse response = openAiImageModel.call(
                new ImagePrompt(prompt,
                        OpenAiImageOptions.builder()
                                .quality("hd")
                                .N(1)
                                .height(1024)
                                .width(1024).build())

        );
        log.info("response: {}", response);
        return response.getResult().getOutput().getUrl();
    }

    private Flux<ChatResponse> longChat(ChatRequestVO chatMessageVO) {
        ChatModel chatModel = llmService.getLongContextChatModel();
        ChatClient chatClient = ChatClient.builder(chatModel).build();
        Flux<ChatResponse> chatResponseFlux = chatClient.prompt().user(user -> {
            user.param(StringConstant.CHAT_CONSERVATION_NAME, String.valueOf(chatMessageVO.getConversationId()));
            user.text(chatMessageVO.getContent());
        }).advisors(MessageChatMemoryAdvisor.builder(databaseChatMemory).chatMemoryRetrieveSize(
                StringConstant.CHAT_MAX_LENGTH
        ).conversationId(String.valueOf(chatMessageVO.getConversationId())).build()).stream().chatResponse();
        return chatResponseFlux;
    }

    /**
     * 简单对话
     * @param chatMessageVO
     * @return
     */
    public Flux<ChatResponse> simpleChat(ChatMessageVO chatMessageVO) {
        ChatModel chatModel = llmService.getChatModel();
        ChatClient chatClient = ChatClient.builder(chatModel).build();
        // 确保 conversationId 不为 null
        String conversationId = chatMessageVO.getConversationId();
        if (conversationId == null) {
            log.error("对话id为空");
            return Flux.error(new IllegalArgumentException("conversationId不能为空"));
        }
        Flux<ChatResponse> chatResponseFlux = chatClient.prompt().user(user -> {
            user.param(StringConstant.CHAT_CONSERVATION_NAME, conversationId);
            user.text(chatMessageVO.getContent());
        }).advisors(MessageChatMemoryAdvisor.builder(databaseChatMemory).chatMemoryRetrieveSize(
                StringConstant.CHAT_MAX_LENGTH
        ).conversationId(conversationId).build()).stream().chatResponse();
        return chatResponseFlux;
    }

    /**
     * 多模态对话
     * @param chatMessageVO
     * @return
     */
    @Override
    public Flux<ChatResponse> multimodalChat(ChatMessageVO chatMessageVO) {
        ChatModel chatModel = llmService.getMultimodalModel();
        List<String> resourceIds = chatMessageVO.getResourceIds();
        ChatClient chatClient = ChatClient.builder(chatModel).build();
        // 确保 conversationId 不为 null
        String conversationId = chatMessageVO.getConversationId();
        if (conversationId == null) {
            log.error("对话id为空");
            return Flux.error(new IllegalArgumentException("conversationId不能为空"));
        }
        
        // 设置conversationResources，确保DataBaseChatMemory能够获取到resourceIds
        databaseChatMemory.setConversationResources(conversationId, resourceIds);
        
        Flux<ChatResponse> chatResponseFlux = chatClient.prompt().user(user -> {
            HashMap<String, Object> params = new HashMap<>();
            params.put(CHAT_MEDIAS, resourceIds);
            params.put(StringConstant.CHAT_CONSERVATION_NAME, conversationId);
            user.text(chatMessageVO.getContent());
            if(resourceIds!=null&& !resourceIds.isEmpty()){
                List<Media> medias = originFileService.formResourceIds(resourceIds);
                user.media(medias.toArray(new Media[0]));
            }
            user.params(params);
            log.info("params: {}", params);
        })
        .advisors(MessageChatMemoryAdvisor.builder(databaseChatMemory).chatMemoryRetrieveSize(
                StringConstant.CHAT_MAX_LENGTH
        ).conversationId(conversationId)
                .build()).stream().chatResponse();
        return chatResponseFlux;
    }

    /**
     * 简单RAG对话
     * @param chatMessageVO
     * @param baseIds
     * @return
     * @throws Exception
     */
    @Override
    public Flux<ChatResponse> simpleRAGChat(ChatMessageVO chatMessageVO, List<Long> baseIds) {
        ChatModel chatModel = llmService.getChatModel();
        ChatClient chatClient = ChatClient.builder(chatModel).build();
        // 确保 conversationId 不为 null
        String conversationId = chatMessageVO.getConversationId();
        if (conversationId == null) {
            log.error("对话id为空");
            return Flux.error(new IllegalArgumentException("conversationId不能为空"));
        }
        //构建Prompt
        String prompt = "";
        try {
            PromptTemplate promptTemplate = new PromptTemplate(ragPrompt);
            prompt = promptTemplate.getTemplate();
        } catch (Exception e) {
            log.error("构建RAG对话模板失败: {}", e.getMessage());
            return Flux.error(new RuntimeException("构建RAG对话模板失败: " + e.getMessage()));
        }
        //向量查询条件, 这里只查询 baseIds 对应的知识库
        SearchRequest searchRequest = SearchRequest.builder().topK(RAG_TOP_K)
                .query(chatMessageVO.getContent()).filterExpression(buildBaseAccessFilter(baseIds)).build();
        Flux<ChatResponse> chatResponseFlux = chatClient.prompt().user(user -> {
            user.param(StringConstant.CHAT_CONSERVATION_NAME, conversationId);
            user.text(chatMessageVO.getContent());
        }).advisors(new SimpleLoggerAdvisor(),MessageChatMemoryAdvisor.builder(databaseChatMemory).chatMemoryRetrieveSize(
                StringConstant.CHAT_MAX_LENGTH
        ).conversationId(conversationId).build()
        ,QuestionAnswerAdvisor.builder(llmService.getVectorStore()).userTextAdvise(prompt)
                        .searchRequest(searchRequest).build()
        ).stream().chatResponse();
        return chatResponseFlux;
    }
    /**
     * 多模态RAG对话
     * @param chatMessageVO
     * @param baseIds
     * @return
     * @throws Exception
     */
    @Override
    public Flux<ChatResponse> multimodalRAGChat(ChatMessageVO chatMessageVO, List<Long> baseIds) {
        ChatModel chatModel = llmService.getMultimodalModel();
        List<String> resourceIds = chatMessageVO.getResourceIds();
        ChatClient chatClient = ChatClient.builder(chatModel).build();
        // 确保 conversationId 不为 null
        String conversationId = chatMessageVO.getConversationId();
        if (conversationId == null) {
            log.error("对话为空");
            return Flux.error(new IllegalArgumentException("conversationId不能为空"));
        }
        
        // 设置conversationResources，确保DataBaseChatMemory能够获取到resourceIds
        databaseChatMemory.setConversationResources(conversationId, resourceIds);
        
        //构建Prompt
        String prompt = "";
        try {
            PromptTemplate promptTemplate = new PromptTemplate(ragPrompt);
            prompt = promptTemplate.getTemplate();
        } catch (Exception e) {
            log.error("构建RAG对话模板失败: {}", e.getMessage());
            return Flux.error(new RuntimeException("构建RAG对话模板失败: " + e.getMessage()));
        }
        //向量查询条件, 这里只查询 baseIds 对应的知识库
        SearchRequest searchRequest = SearchRequest.builder().topK(RAG_TOP_K)
                .query(chatMessageVO.getContent()).filterExpression(buildBaseAccessFilter(baseIds)).build();
        Flux<ChatResponse> chatResponseFlux = chatClient.prompt().user(user -> {
            HashMap<String, Object> params = new HashMap<>();
            params.put(CHAT_MEDIAS, resourceIds);
            params.put(StringConstant.CHAT_CONSERVATION_NAME, conversationId);
            user.text(chatMessageVO.getContent());
            if(resourceIds!=null&& !resourceIds.isEmpty()){
                List<Media> medias = originFileService.formResourceIds(resourceIds);
                user.media(medias.toArray(new Media[0]));
            }
            user.params(params);
            log.info("params: {}", params);
        }).advisors(new SimpleLoggerAdvisor(), MessageChatMemoryAdvisor.builder(databaseChatMemory).chatMemoryRetrieveSize(
                StringConstant.CHAT_MAX_LENGTH
        ).conversationId(conversationId).build()
        ,QuestionAnswerAdvisor.builder(llmService.getVectorStore()).userTextAdvise(prompt)
                        .searchRequest(searchRequest).build()
        ).stream().chatResponse();
        return chatResponseFlux;
    }

    /**
     * 构建知识库访问权限过滤条件
     * @param knowledgeBaseIds
     * @return
     *
     **/
    private String buildBaseAccessFilter(List<Long> knowledgeBaseIds) {
        // 如果没有 ID，返回一个 false 的表达式
        if (knowledgeBaseIds == null || knowledgeBaseIds.isEmpty()) {
            return "knowledge_base_id in [0]"; // 不让查询任何知识库
        }
        StringBuilder sb = new StringBuilder();
        sb.append("knowledge_base_id in [");
        for (int i = 0; i < knowledgeBaseIds.size(); i++) {
            if (i != 0) {
                sb.append(",");
            }
            sb.append(knowledgeBaseIds.get(i)); // 直接使用数字，不需要引号
        }
        sb.append("]");
        log.info("Vector Search Filter SQL: {}", sb);
        log.info("Vector Search Filter Parameter: {}", knowledgeBaseIds);
        return sb.toString();
    }
}
