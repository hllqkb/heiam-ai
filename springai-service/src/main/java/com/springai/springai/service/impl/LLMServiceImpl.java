package com.springai.springai.service.impl;

import com.springai.springai.service.LLMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.document.MetadataMode;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.openai.*;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.pgvector.PgVectorStore;
import org.springframework.ai.vectorstore.pgvector.autoconfigure.PgVectorStoreProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.time.Duration;

/**
 * @author hllqk
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class LLMServiceImpl implements LLMService {

    @Value("${chat.simple.base-url}")
    private String simpleBaseUrl;

    @Value("${chat.simple.api-key}")
    private String simpleApiKey;

    @Value("${chat.simple.model}")
    private String simpleModel;

    @Value("${chat.long.base-url}")
    private String longBaseUrl;

    @Value("${chat.long.api-key}")
    private String longApiKey;

    @Value("${chat.long.model}")
    private String longModel;

    @Value("${chat.multimodal.base-url}")
    private String multimodalBaseUrl;

    @Value("${chat.multimodal.api-key}")
    private String multimodalApiKey;

    @Value("${chat.multimodal.model}")
    private String multimodalModel;

    @Value("${embedding.base-url}")
    private String embeddingBaseUrl;

    @Value("${embedding.api-key}")
    private String embeddingApiKey;

    @Value("${embedding.model}")
    private String embeddingModel;

    private final JdbcTemplate jdbcTemplate;

    private final PgVectorStoreProperties pgVectorStoreProperties;

    @Override
    public ChatModel getChatModel() {
        OpenAiApi openAiApi = OpenAiApi.builder()
                .baseUrl(simpleBaseUrl)
                .apiKey(simpleApiKey)
                .build();
        return OpenAiChatModel.builder()
                .openAiApi(openAiApi)
                .retryTemplate(retryTemplate())
                .defaultOptions(OpenAiChatOptions.builder().model(simpleModel).build())
                .build();
    }

    @Override
    public ChatModel getLongContextChatModel() {
        OpenAiApi openAiApi = OpenAiApi.builder()
                .baseUrl(longBaseUrl)
                .apiKey(longApiKey)
                .build();
        return OpenAiChatModel.builder()
                .openAiApi(openAiApi)
                .retryTemplate(retryTemplate())
                .defaultOptions(OpenAiChatOptions.builder().model(longModel).build())
                .build();
    }

    @Override
    public ChatModel getMultimodalModel() {
        OpenAiApi openAiApi = OpenAiApi.builder()
                .baseUrl(multimodalBaseUrl)
                .apiKey(multimodalApiKey)
                .build();
        return OpenAiChatModel.builder()
                .openAiApi(openAiApi)
                .retryTemplate(retryTemplate())
                .defaultOptions(OpenAiChatOptions.builder().model(multimodalModel).build())
                .build();
    }

    @Override
    public EmbeddingModel getEmbeddingModel() {
        OpenAiApi openAiApi = OpenAiApi.builder().baseUrl(embeddingBaseUrl).apiKey(embeddingApiKey).build();
        return new OpenAiEmbeddingModel(openAiApi, MetadataMode.EMBED,
                OpenAiEmbeddingOptions.builder().model(embeddingModel).build());
    }

    @Override
    public VectorStore getVectorStore() {
        log.info("PgVectorStore 配置: 维度={}, tableName={}, initializeSchema={}",
            pgVectorStoreProperties.getDimensions(),
            pgVectorStoreProperties.getTableName(),
            pgVectorStoreProperties.isInitializeSchema());
            
        return PgVectorStore.builder(jdbcTemplate, this.getEmbeddingModel())
                .initializeSchema(pgVectorStoreProperties.isInitializeSchema())
                .dimensions(pgVectorStoreProperties.getDimensions())
                .distanceType(pgVectorStoreProperties.getDistanceType())
                .indexType(pgVectorStoreProperties.getIndexType())
                .maxDocumentBatchSize(pgVectorStoreProperties.getMaxDocumentBatchSize())
                .schemaName(pgVectorStoreProperties.getSchemaName())
                .vectorTableName(pgVectorStoreProperties.getTableName())
                .removeExistingVectorStoreTable(pgVectorStoreProperties.isRemoveExistingVectorStoreTable())
                .idType(pgVectorStoreProperties.getIdType())
                .vectorTableValidationsEnabled(pgVectorStoreProperties.isSchemaValidation())
                .build();
    }


    private RetryTemplate retryTemplate() {
        return RetryTemplate.builder()
                .maxAttempts(3)
                .exponentialBackoff(1000, 2.0, 10000)
                .retryOn(WebClientResponseException.class)
                .build();
    }

}
