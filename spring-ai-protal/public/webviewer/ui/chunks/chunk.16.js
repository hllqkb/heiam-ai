(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1681:function(e,o,t){var n=t(32),a=t(1860);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var i={insert:function(e){if(!window.isApryseWebViewerWebComponent)return void document.head.appendChild(e);let o;o=document.getElementsByTagName("apryse-webviewer"),o.length||(o=function e(o,t=document){const n=[];return t.querySelectorAll(o).forEach(e=>n.push(e)),t.querySelectorAll("*").forEach(t=>{t.shadowRoot&&n.push(...e(o,t.shadowRoot))}),n}("apryse-webviewer"));const t=[];for(let n=0;n<o.length;n++){const a=o[n];if(0===n)a.shadowRoot.appendChild(e),e.onload=function(){t.length>0&&t.forEach(o=>{o.innerHTML=e.innerHTML})};else{const o=e.cloneNode(!0);a.shadowRoot.appendChild(o),t.push(o)}}},singleton:!1};n(a,i);e.exports=a.locals||{}},1769:function(e,o,t){"use strict";t(19),t(11),t(13),t(8),t(14),t(10),t(9),t(12),t(16),t(15),t(20),t(18);var n=t(0),a=t.n(n),i=t(6),l=t(3),d=t(428),r=(t(1858),t(80));function p(e,o){return function(e){if(Array.isArray(e))return e}(e)||function(e,o){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,a,i,l,d=[],r=!0,p=!1;try{if(i=(t=t.call(e)).next,0===o){if(Object(t)!==t)return;r=!1}else for(;!(r=(n=i.call(t)).done)&&(d.push(n.value),d.length!==o);r=!0);}catch(e){p=!0,a=e}finally{try{if(!r&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(p)throw a}}return d}}(e,o)||function(e,o){if(!e)return;if("string"==typeof e)return c(e,o);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return c(e,o)}(e,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,o){(null==o||o>e.length)&&(o=e.length);for(var t=0,n=new Array(o);t<o;t++)n[t]=e[t];return n}var s=function(e){var o=e.defaultValue,t=e.onFileSelect,c=e.acceptFormats,s=e.extension,b=e.setExtension,m=p(Object(d.a)(),1)[0],u=p(Object(n.useState)(o||""),2),h=u[0],g=u[1],f=Object(i.e)((function(e){var o;return null===(o=l.a.getFeatureFlags(e))||void 0===o?void 0:o.customizableUI}));return Object(n.useEffect)((function(){o||o===h||g("")})),a.a.createElement("div",{className:"FileInputPanel"},a.a.createElement("label",{htmlFor:"urlInput",className:"url-input-header"},m("link.enterUrlAlt")),a.a.createElement("div",{className:"url-input"},a.a.createElement("input",{type:"text",id:"urlInput",className:"file-input",style:{width:"100%",height:32,paddingLeft:8,fontSize:13,boxSizing:"border-box"},value:h,onChange:function(e){g(e.target.value),t(e.target.value)},placeholder:f?"":m("link.urlLink")})),b?a.a.createElement("div",{className:"extension-dropdown"},a.a.createElement(r.a,{disabled:!h,id:"open-file-extension-dropdown",labelledById:"open-file-extension-dropdown-label",placeholder:m("tool.selectAnOption"),onClick:function(e){return e.stopPropagation()},items:c,ariaLabel:m("OpenFile.extension"),onClickItem:b,currentSelectionKey:s,maxHeight:200,height:32}),a.a.createElement("label",{id:"open-file-extension-dropdown-label"},m("OpenFile.extension"))):null)};o.a=s},1858:function(e,o,t){var n=t(32),a=t(1859);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[e.i,a,""]]);var i={insert:function(e){if(!window.isApryseWebViewerWebComponent)return void document.head.appendChild(e);let o;o=document.getElementsByTagName("apryse-webviewer"),o.length||(o=function e(o,t=document){const n=[];return t.querySelectorAll(o).forEach(e=>n.push(e)),t.querySelectorAll("*").forEach(t=>{t.shadowRoot&&n.push(...e(o,t.shadowRoot))}),n}("apryse-webviewer"));const t=[];for(let n=0;n<o.length;n++){const a=o[n];if(0===n)a.shadowRoot.appendChild(e),e.onload=function(){t.length>0&&t.forEach(o=>{o.innerHTML=e.innerHTML})};else{const o=e.cloneNode(!0);a.shadowRoot.appendChild(o),t.push(o)}}},singleton:!1};n(a,i);e.exports=a.locals||{}},1859:function(e,o,t){(e.exports=t(33)(!1)).push([e.i,".FileInputPanel{display:flex;justify-content:center;height:100%;flex-direction:column;background-color:var(--document-background-color);border-radius:4px}.FileInputPanel .url-input-header{font-size:13px;line-height:16px;padding-left:16px;padding-bottom:8px;font-weight:700}.FileInputPanel .url-input{padding:0 16px}.FileInputPanel .url-input input:focus{border-color:var(--outline-color)}.FileInputPanel .url-input input:active{border-color:var(--focus-border)}.FileInputPanel ::-moz-placeholder{color:var(--placeholder-text)}.FileInputPanel ::placeholder{color:var(--placeholder-text)}",""])},1860:function(e,o,t){(o=e.exports=t(33)(!1)).push([e.i,".open.OpenFileModal,.open.PageReplacementModal{visibility:visible}.closed.OpenFileModal,.closed.PageReplacementModal{visibility:hidden}:host{display:inline-block;container-type:inline-size;width:100%;height:100%;overflow:hidden}@media(min-width:901px){.App:not(.is-web-component) .hide-in-desktop{display:none}}@container (min-width: 901px){.hide-in-desktop{display:none}}@media(min-width:641px)and (max-width:900px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .hide-in-tablet{display:none}}@container (min-width: 641px) and (max-width: 900px){.App.is-web-component:not(.is-in-desktop-only-mode) .hide-in-tablet{display:none}}@media(max-width:640px)and (min-width:431px){.App:not(.is-web-component) .hide-in-mobile{display:none}}@container (max-width: 640px) and (min-width: 431px){.App.is-web-component .hide-in-mobile{display:none}}@media(max-width:430px){.App:not(.is-web-component) .hide-in-small-mobile{display:none}}@container (max-width: 430px){.App.is-web-component .hide-in-small-mobile{display:none}}.always-hide{display:none}.OpenFileModal .container .footer .modal-btn:hover:not(:disabled),.OpenFileModal .footer .modal-button.confirm:hover,.PageReplacementModal .container .footer .modal-btn:hover:not(:disabled),.PageReplacementModal .footer .modal-button.confirm:hover{background:var(--primary-button-hover);border-color:var(--primary-button-hover);color:var(--gray-0)}.OpenFileModal .container .footer .modal-btn,.OpenFileModal .footer .modal-button.confirm,.PageReplacementModal .container .footer .modal-btn,.PageReplacementModal .footer .modal-button.confirm{background:var(--primary-button);border-color:var(--primary-button);color:var(--primary-button-text)}.OpenFileModal .container .Button.disabled,.OpenFileModal .container .footer .modal-btn:disabled,.OpenFileModal .footer .modal-button.confirm.disabled,.PageReplacementModal .container .Button.disabled,.PageReplacementModal .container .footer .modal-btn:disabled,.PageReplacementModal .footer .modal-button.confirm.disabled{cursor:default;background:var(--disabled-button-color);color:var(--primary-button-text)}.OpenFileModal .container .Button.disabled span,.OpenFileModal .container .footer .modal-btn:disabled span,.OpenFileModal .footer .modal-button.confirm.disabled span,.PageReplacementModal .container .Button.disabled span,.PageReplacementModal .container .footer .modal-btn:disabled span,.PageReplacementModal .footer .modal-button.confirm.disabled span{color:var(--primary-button-text)}.OpenFileModal .footer .modal-button.cancel:hover,.OpenFileModal .footer .modal-button.secondary-btn-custom:hover,.PageReplacementModal .footer .modal-button.cancel:hover,.PageReplacementModal .footer .modal-button.secondary-btn-custom:hover{border:none;box-shadow:inset 0 0 0 1px var(--blue-6);color:var(--blue-6)}.OpenFileModal .footer .modal-button.cancel,.OpenFileModal .footer .modal-button.secondary-btn-custom,.PageReplacementModal .footer .modal-button.cancel,.PageReplacementModal .footer .modal-button.secondary-btn-custom{border:none;box-shadow:inset 0 0 0 1px var(--primary-button);color:var(--primary-button)}.OpenFileModal .footer .modal-button.cancel.disabled,.OpenFileModal .footer .modal-button.secondary-btn-custom.disabled,.PageReplacementModal .footer .modal-button.cancel.disabled,.PageReplacementModal .footer .modal-button.secondary-btn-custom.disabled{cursor:default;border:none;box-shadow:inset 0 0 0 1px rgba(43,115,171,.5);color:rgba(43,115,171,.5)}.OpenFileModal .footer .modal-button.cancel.disabled span,.OpenFileModal .footer .modal-button.secondary-btn-custom.disabled span,.PageReplacementModal .footer .modal-button.cancel.disabled span,.PageReplacementModal .footer .modal-button.secondary-btn-custom.disabled span{color:rgba(43,115,171,.5)}.OpenFileModal.modular-ui .thumb-card:hover,.PageReplacementModal.modular-ui .thumb-card:hover{cursor:pointer;border:none;box-shadow:inset 0 0 0 1px var(--blue-6);color:var(--blue-6);background-color:var(--faded-component-background)}.OpenFileModal,.PageReplacementModal{position:fixed;left:0;bottom:0;z-index:100;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:var(--modal-negative-space)}.OpenFileModal .modal-container .wrapper .modal-content,.PageReplacementModal .modal-container .wrapper .modal-content{padding:10px}.OpenFileModal .footer,.PageReplacementModal .footer{display:flex;flex-direction:row;justify-content:flex-end;width:100%;margin-top:13px}.OpenFileModal .footer.modal-footer,.PageReplacementModal .footer.modal-footer{padding:16px;margin:0;border-top:1px solid var(--divider)}.OpenFileModal .footer .modal-button,.PageReplacementModal .footer .modal-button{display:flex;justify-content:center;align-items:center;padding:6px 18px;margin:8px 0 0;width:auto;width:-moz-fit-content;width:fit-content;border-radius:4px;height:30px;cursor:pointer}.OpenFileModal .footer .modal-button.confirm,.PageReplacementModal .footer .modal-button.confirm{margin-left:4px}.OpenFileModal .footer .modal-button.secondary-btn-custom,.PageReplacementModal .footer .modal-button.secondary-btn-custom{border-radius:4px;padding:2px 20px 4px;cursor:pointer}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .OpenFileModal .footer .modal-button,.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageReplacementModal .footer .modal-button{padding:23px 8px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .OpenFileModal .footer .modal-button,.App.is-web-component:not(.is-in-desktop-only-mode) .PageReplacementModal .footer .modal-button{padding:23px 8px}}.OpenFileModal .swipe-indicator,.PageReplacementModal .swipe-indicator{background:var(--swipe-indicator-bg);border-radius:2px;height:4px;width:38px;position:absolute;top:12px;margin-left:auto;margin-right:auto;left:0;right:0}@media(min-width:641px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .OpenFileModal .swipe-indicator,.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageReplacementModal .swipe-indicator{display:none}}@container (min-width: 641px){.App.is-web-component:not(.is-in-desktop-only-mode) .OpenFileModal .swipe-indicator,.App.is-web-component:not(.is-in-desktop-only-mode) .PageReplacementModal .swipe-indicator{display:none}}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .OpenFileModal .swipe-indicator,.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageReplacementModal .swipe-indicator{width:32px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .OpenFileModal .swipe-indicator,.App.is-web-component:not(.is-in-desktop-only-mode) .PageReplacementModal .swipe-indicator{width:32px}}.OpenFileModal .container,.PageReplacementModal .container{overflow-y:auto;max-height:100%}@media(max-height:500px){.App:not(.is-web-component) .OpenFileModal .container,.App:not(.is-web-component) .PageReplacementModal .container,.OpenFileModal .App:not(.is-web-component) .container,.PageReplacementModal .App:not(.is-web-component) .container{overflow:auto;max-height:100%}}@container (max-height: 500px){.App.is-web-component .OpenFileModal .container,.App.is-web-component .PageReplacementModal .container,.OpenFileModal .App.is-web-component .container,.PageReplacementModal .App.is-web-component .container{overflow:auto;max-height:100%}}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .OpenFileModal .container,.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageReplacementModal .container,.OpenFileModal .App:not(.is-in-desktop-only-mode):not(.is-web-component) .container,.PageReplacementModal .App:not(.is-in-desktop-only-mode):not(.is-web-component) .container{width:100%;position:fixed;left:0;bottom:0;padding-top:4px;min-width:100px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .OpenFileModal .container,.App.is-web-component:not(.is-in-desktop-only-mode) .PageReplacementModal .container,.OpenFileModal .App.is-web-component:not(.is-in-desktop-only-mode) .container,.PageReplacementModal .App.is-web-component:not(.is-in-desktop-only-mode) .container{width:100%;position:fixed;left:0;bottom:0;padding-top:4px;min-width:100px}}.OpenFileModal .container .tab-list,.PageReplacementModal .container .tab-list{width:100%;height:28px;display:flex;border-radius:4px;color:var(--text-color)}.OpenFileModal .container .tab-list .tab-options-button,.PageReplacementModal .container .tab-list .tab-options-button{text-align:center;vertical-align:middle;line-height:24px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;flex:1;border-radius:0;cursor:pointer}.OpenFileModal .container .tab-list .tab-options-button:first-child,.PageReplacementModal .container .tab-list .tab-options-button:first-child{border-bottom-left-radius:4px;border-top-left-radius:4px}.OpenFileModal .container .tab-list .tab-options-button:last-child,.PageReplacementModal .container .tab-list .tab-options-button:last-child{border-bottom-right-radius:4px;border-top-right-radius:4px}.OpenFileModal .container .tab-list .tab-options-button:hover,.PageReplacementModal .container .tab-list .tab-options-button:hover{background:var(--popup-button-hover)}.OpenFileModal .container .tab-list .tab-options-button.selected,.PageReplacementModal .container .tab-list .tab-options-button.selected{cursor:default}.OpenFileModal .container .tab-list .tab-options-button.focus-visible,.OpenFileModal .container .tab-list .tab-options-button:focus-visible,.PageReplacementModal .container .tab-list .tab-options-button.focus-visible,.PageReplacementModal .container .tab-list .tab-options-button:focus-visible{outline:var(--focus-visible-outline)}.OpenFileModal .container .tab-panel,.PageReplacementModal .container .tab-panel{width:100%;display:flex;flex-direction:column;align-items:center}.OpenFileModal .container .tab-panel.focus-visible,.OpenFileModal .container .tab-panel:focus-visible,.PageReplacementModal .container .tab-panel.focus-visible,.PageReplacementModal .container .tab-panel:focus-visible{outline:var(--focus-visible-outline)!important}.OpenFileModal .container,.PageReplacementModal .container{box-sizing:border-box;display:flex;flex-direction:column;border-radius:4px;box-shadow:0 0 3px 0 var(--document-box-shadow);padding:0;background:var(--component-background);overflow-y:visible;width:480px}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .OpenFileModal .container,.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageReplacementModal .container{border-radius:0}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .OpenFileModal .container,.App.is-web-component:not(.is-in-desktop-only-mode) .PageReplacementModal .container{border-radius:0}}@media(max-height:320px){.App:not(.is-web-component) .OpenFileModal .container,.App:not(.is-web-component) .PageReplacementModal .container{display:grid;height:100%;position:fixed;top:0;grid-template-rows:100px auto 70px;justify-content:normal}}@container (max-height: 320px){.App.is-web-component .OpenFileModal .container,.App.is-web-component .PageReplacementModal .container{display:grid;height:100%;position:fixed;top:0;grid-template-rows:100px auto 70px;justify-content:normal}}.OpenFileModal .container .Button,.PageReplacementModal .container .Button{height:100%;justify-content:right}.OpenFileModal .container .Button.close-button,.PageReplacementModal .container .Button.close-button{justify-content:center}.OpenFileModal .container .page-replacement-divider,.PageReplacementModal .container .page-replacement-divider{border-top:1px solid var(--divider);margin:0}.OpenFileModal .container .modal-container,.PageReplacementModal .container .modal-container{overflow-y:unset}.OpenFileModal .container .tabs-header-container,.PageReplacementModal .container .tabs-header-container{padding:16px}.OpenFileModal .container .header,.PageReplacementModal .container .header{margin:0;display:flex;justify-content:space-between;width:100%;font-size:16px;line-height:24px;font-weight:700}.OpenFileModal .container .footer,.PageReplacementModal .container .footer{margin-top:0;padding:16px;justify-content:flex-end}.OpenFileModal .container .footer.isFileSelected,.PageReplacementModal .container .footer.isFileSelected{justify-content:space-between}.OpenFileModal .container .footer .deselect-thumbnails,.PageReplacementModal .container .footer .deselect-thumbnails{border:none;background-color:transparent;color:var(--secondary-button-text);padding:0 8px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer}.OpenFileModal .container .footer .deselect-thumbnails,:host(:not([data-tabbing=true])) .PageReplacementModal .container .footer .deselect-thumbnails,html:not([data-tabbing=true]) .PageReplacementModal .container .footer .deselect-thumbnails{outline:none}.OpenFileModal .container .footer .deselect-thumbnails:hover,.PageReplacementModal .container .footer .deselect-thumbnails:hover{color:var(--secondary-button-hover)}.OpenFileModal .container .footer .deselect-thumbnails.disabled,.PageReplacementModal .container .footer .deselect-thumbnails.disabled{visibility:hidden}.OpenFileModal .container .footer .modal-btn,.PageReplacementModal .container .footer .modal-btn{border:none;background-color:transparent;border-radius:4px;padding:0 20px;height:32px;width:67px;display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;background-color:var(--primary-button)}.OpenFileModal .container .footer .modal-btn,:host(:not([data-tabbing=true])) .PageReplacementModal .container .footer .modal-btn,html:not([data-tabbing=true]) .PageReplacementModal .container .footer .modal-btn{outline:none}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .OpenFileModal .container .footer .modal-btn,.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageReplacementModal .container .footer .modal-btn{height:32px;width:100px;font-size:13px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .OpenFileModal .container .footer .modal-btn,.App.is-web-component:not(.is-in-desktop-only-mode) .PageReplacementModal .container .footer .modal-btn{height:32px;width:100px;font-size:13px}}.OpenFileModal .container .footer .modal-btn.noFile,.PageReplacementModal .container .footer .modal-btn.noFile{opacity:.5;cursor:default}.OpenFileModal .container .modal-body,.PageReplacementModal .container .modal-body{height:unset;display:flex;flex-direction:column;font-size:13px}.OpenFileModal .container .modal-body .modal-body-container,.PageReplacementModal .container .modal-body .modal-body-container{width:100%;height:409px;padding:16px 0 16px 16px;border-radius:4px;overflow:auto;background-color:var(--gray-2);display:flex;flex-wrap:wrap;grid-gap:16px;gap:16px}.OpenFileModal .container .modal-body .modal-body-container.isLoading,.PageReplacementModal .container .modal-body .modal-body-container.isLoading{justify-content:center;align-items:center}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .OpenFileModal .container .modal-body .modal-body-container,.App:not(.is-in-desktop-only-mode):not(.is-web-component) .PageReplacementModal .container .modal-body .modal-body-container{padding:12px 0 12px 12px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .OpenFileModal .container .modal-body .modal-body-container,.App.is-web-component:not(.is-in-desktop-only-mode) .PageReplacementModal .container .modal-body .modal-body-container{padding:12px 0 12px 12px}}.OpenFileModal .container .tab-panel .panel-body,.PageReplacementModal .container .tab-panel .panel-body{width:100%;height:240px;position:relative;padding:0 16px 16px;font-size:13px;border-radius:4px}.OpenFileModal .container .tab-panel .panel-body.upload,.PageReplacementModal .container .tab-panel .panel-body.upload{background:transparent}.OpenFileModal .container .tab-list .tab-options-button,.PageReplacementModal .container .tab-list .tab-options-button{padding:0;border:none;background-color:transparent}.OpenFileModal .container .tab-list .tab-options-button,:host(:not([data-tabbing=true])) .PageReplacementModal .container .tab-list .tab-options-button,html:not([data-tabbing=true]) .PageReplacementModal .container .tab-list .tab-options-button{outline:none}.OpenFileModal .container .tab-list .tab-options-divider+.tab-options-button,.PageReplacementModal .container .tab-list .tab-options-divider+.tab-options-button{border-left:none!important}.OpenFileModal .container .tab-list .tab-options-button,.PageReplacementModal .container .tab-list .tab-options-button{border-top:1px solid var(--tab-border-color);border-bottom:1px solid var(--tab-border-color)}.OpenFileModal .container .tab-list .tab-options-button:first-child,.PageReplacementModal .container .tab-list .tab-options-button:first-child{border-left:1px solid var(--tab-border-color)}.OpenFileModal .container .tab-list .tab-options-button:last-child,.PageReplacementModal .container .tab-list .tab-options-button:last-child{border-right:1px solid var(--tab-border-color)}.OpenFileModal .container .tab-list .tab-options-button:hover,.PageReplacementModal .container .tab-list .tab-options-button:hover{background:var(--tab-background-color-hover);border-top:1px solid var(--tab-border-color-hover);border-bottom:1px solid var(--tab-border-color-hover);border-right:1px solid var(--tab-border-color-hover)}.OpenFileModal .container .tab-list .tab-options-button:hover+button,.OpenFileModal .container .tab-list .tab-options-button:hover+div,.PageReplacementModal .container .tab-list .tab-options-button:hover+button,.PageReplacementModal .container .tab-list .tab-options-button:hover+div{border-left:none}.OpenFileModal .container .tab-list .tab-options-button.selected,.PageReplacementModal .container .tab-list .tab-options-button.selected{background:var(--tab-color-selected);border:1px solid var(--tab-color-selected);color:var(--tab-text-color-selected)}.OpenFileModal .container .tab-list .tab-options-button.selected+button,.OpenFileModal .container .tab-list .tab-options-button.selected+div,.PageReplacementModal .container .tab-list .tab-options-button.selected+button,.PageReplacementModal .container .tab-list .tab-options-button.selected+div{border-left:none!important}.OpenFileModal .container .tab-list .tab-options-button:not(.selected),.PageReplacementModal .container .tab-list .tab-options-button:not(.selected){border-right:1px solid var(--tab-border-color)}.OpenFileModal.modular-ui .thumb-card,.PageReplacementModal.modular-ui .thumb-card{border:none;box-shadow:inset 0 0 0 1px var(--lighter-border)}.OpenFileModal.modular-ui .thumb-card:hover,.PageReplacementModal.modular-ui .thumb-card:hover{background:var(--gray-1)}",""]),o.locals={LEFT_HEADER_WIDTH:"41px",RIGHT_HEADER_WIDTH:"41px"}}}]);
//# sourceMappingURL=chunk.16.js.map