(this["webpackJsonpmaterial-app"]=this["webpackJsonpmaterial-app"]||[]).push([[21],{1112:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==m(e)&&"function"!==typeof e)return{default:e};var n=o(t);if(n&&n.has(e))return n.get(e);var a={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in e)if("default"!==c&&Object.prototype.hasOwnProperty.call(e,c)){var l=r?Object.getOwnPropertyDescriptor(e,c):null;l&&(l.get||l.set)?Object.defineProperty(a,c,l):a[c]=e[c]}a.default=e,n&&n.set(e,a);return a}(n(0)),r=["placeholder","separator","isLastChild","inputStyle","focus","isDisabled","hasErrored","errorStyle","focusStyle","disabledStyle","shouldAutoFocus","isInputNum","index","value","className","isInputSecure"];function o(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(o=function(e){return e?n:t})(e)}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function s(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function p(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=y(e);if(t){var r=y(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return h(this,n)}}function h(e,t){return!t||"object"!==m(t)&&"function"!==typeof t?b(e):t}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){return(m="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var g=function(e){return"object"===m(e)},O=function(e){p(n,e);var t=d(n);function n(e){var r;return u(this,n),v(b(r=t.call(this,e)),"getClasses",(function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return!g(e)&&!1!==e})).join(" ")})),v(b(r),"getType",(function(){var e=r.props,t=e.isInputSecure,n=e.isInputNum;return t?"password":n?"tel":"text"})),r.input=a.default.createRef(),r}return s(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.focus,n=e.shouldAutoFocus,a=this.input.current;a&&t&&n&&a.focus()}},{key:"componentDidUpdate",value:function(e){var t=this.props.focus,n=this.input.current;e.focus!==t&&n&&t&&(n.focus(),n.select())}},{key:"render",value:function(){var e=this.props,t=e.placeholder,n=e.separator,o=e.isLastChild,u=e.inputStyle,i=e.focus,s=e.isDisabled,p=e.hasErrored,f=e.errorStyle,d=e.focusStyle,h=e.disabledStyle,b=(e.shouldAutoFocus,e.isInputNum),y=e.index,v=e.value,m=e.className,O=(e.isInputSecure,l(e,r));return a.default.createElement("div",{className:m,style:{display:"flex",alignItems:"center"}},a.default.createElement("input",c({"aria-label":"".concat(0===y?"Please enter verification code. ":"").concat(b?"Digit":"Character"," ").concat(y+1),autoComplete:"off",style:Object.assign({width:"1em",textAlign:"center"},g(u)&&u,i&&g(d)&&d,s&&g(h)&&h,p&&g(f)&&f),placeholder:t,className:this.getClasses(u,i&&d,s&&h,p&&f),type:this.getType(),maxLength:"1",ref:this.input,disabled:s,value:v||""},O)),!o&&n)}}]),n}(a.PureComponent),I=function(e){p(n,e);var t=d(n);function n(){var e;u(this,n);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return v(b(e=t.call.apply(t,[this].concat(o))),"state",{activeInput:0}),v(b(e),"getOtpValue",(function(){return e.props.value?e.props.value.toString().split(""):[]})),v(b(e),"getPlaceholderValue",(function(){var t=e.props,n=t.placeholder,a=t.numInputs;if("string"===typeof n){if(n.length===a)return n;n.length>0&&console.error("Length of the placeholder should be equal to the number of inputs.")}})),v(b(e),"handleOtpChange",(function(t){(0,e.props.onChange)(t.join(""))})),v(b(e),"isInputValueValid",(function(t){return(e.props.isInputNum?!isNaN(parseInt(t,10)):"string"===typeof t)&&1===t.trim().length})),v(b(e),"focusInput",(function(t){var n=e.props.numInputs,a=Math.max(Math.min(n-1,t),0);e.setState({activeInput:a})})),v(b(e),"focusNextInput",(function(){var t=e.state.activeInput;e.focusInput(t+1)})),v(b(e),"focusPrevInput",(function(){var t=e.state.activeInput;e.focusInput(t-1)})),v(b(e),"changeCodeAtFocus",(function(t){var n=e.state.activeInput,a=e.getOtpValue();a[n]=t[0],e.handleOtpChange(a)})),v(b(e),"handleOnPaste",(function(t){t.preventDefault();var n=e.state.activeInput,a=e.props,r=a.numInputs;if(!a.isDisabled){for(var o=e.getOtpValue(),c=n,l=t.clipboardData.getData("text/plain").slice(0,r-n).split(""),u=0;u<r;++u)u>=n&&l.length>0&&(o[u]=l.shift(),c++);e.setState({activeInput:c},(function(){e.focusInput(c),e.handleOtpChange(o)}))}})),v(b(e),"handleOnChange",(function(t){var n=t.target.value;e.isInputValueValid(n)&&e.changeCodeAtFocus(n)})),v(b(e),"handleOnKeyDown",(function(t){8===t.keyCode||"Backspace"===t.key?(t.preventDefault(),e.changeCodeAtFocus(""),e.focusPrevInput()):46===t.keyCode||"Delete"===t.key?(t.preventDefault(),e.changeCodeAtFocus("")):37===t.keyCode||"ArrowLeft"===t.key?(t.preventDefault(),e.focusPrevInput()):39===t.keyCode||"ArrowRight"===t.key?(t.preventDefault(),e.focusNextInput()):32!==t.keyCode&&" "!==t.key&&"Spacebar"!==t.key&&"Space"!==t.key||t.preventDefault()})),v(b(e),"handleOnInput",(function(t){if(e.isInputValueValid(t.target.value))e.focusNextInput();else if(!e.props.isInputNum){var n=t.nativeEvent;null===n.data&&"deleteContentBackward"===n.inputType&&(t.preventDefault(),e.changeCodeAtFocus(""),e.focusPrevInput())}})),v(b(e),"renderInputs",(function(){for(var t=e.state.activeInput,n=e.props,r=n.numInputs,o=n.inputStyle,c=n.focusStyle,l=n.separator,u=n.isDisabled,i=n.disabledStyle,s=n.hasErrored,p=n.errorStyle,f=n.shouldAutoFocus,d=n.isInputNum,h=n.isInputSecure,b=n.className,y=[],v=e.getOtpValue(),m=e.getPlaceholderValue(),g=e.props["data-cy"],I=e.props["data-testid"],k=function(n){y.push(a.default.createElement(O,{placeholder:m&&m[n],key:n,index:n,focus:t===n,value:v&&v[n],onChange:e.handleOnChange,onKeyDown:e.handleOnKeyDown,onInput:e.handleOnInput,onPaste:e.handleOnPaste,onFocus:function(t){e.setState({activeInput:n}),t.target.select()},onBlur:function(){return e.setState({activeInput:-1})},separator:l,inputStyle:o,focusStyle:c,isLastChild:n===r-1,isDisabled:u,disabledStyle:i,hasErrored:s,errorStyle:p,shouldAutoFocus:f,isInputNum:d,isInputSecure:h,className:b,"data-cy":g&&"".concat(g,"-").concat(n),"data-testid":I&&"".concat(I,"-").concat(n)}))},j=0;j<r;j++)k(j);return y})),e}return s(n,[{key:"render",value:function(){var e=this.props.containerStyle;return a.default.createElement("div",{style:Object.assign({display:"flex"},g(e)&&e),className:g(e)?"":e},this.renderInputs())}}]),n}(a.Component);v(I,"defaultProps",{numInputs:4,onChange:function(e){return console.log(e)},isDisabled:!1,shouldAutoFocus:!1,value:"",isInputSecure:!1});var k=I;t.default=k},1153:function(e,t,n){"use strict";var a=n(1),r=n(3),o=n(0),c=n.n(o),l=(n(5),n(4)),u=n(313),i=n(185),s=Object(i.a)(c.a.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),p=Object(i.a)(c.a.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),f=n(13),d=Object(i.a)(c.a.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),h=n(10),b=n(6),y=c.a.createElement(p,null),v=c.a.createElement(s,null),m=c.a.createElement(d,null),g=c.a.forwardRef((function(e,t){var n=e.checkedIcon,o=void 0===n?y:n,i=e.classes,s=e.color,p=void 0===s?"secondary":s,f=e.disabled,d=void 0!==f&&f,b=e.icon,g=void 0===b?v:b,O=e.indeterminate,I=void 0!==O&&O,k=e.indeterminateIcon,j=void 0===k?m:k,C=e.inputProps,S=Object(r.a)(e,["checkedIcon","classes","color","disabled","icon","indeterminate","indeterminateIcon","inputProps"]);return c.a.createElement(u.a,Object(a.a)({type:"checkbox",checkedIcon:I?j:o,classes:{root:Object(l.a)(i.root,i["color".concat(Object(h.a)(p))],I&&i.indeterminate),checked:i.checked,disabled:i.disabled},color:p,inputProps:Object(a.a)({"data-indeterminate":I},C),icon:I?j:g,ref:t,disabled:d},S))}));t.a=Object(b.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(f.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(f.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(g)},1155:function(e,t,n){"use strict";var a=n(1),r=n(3),o=n(0),c=n.n(o),l=(n(5),n(4)),u=n(70),i=n(6),s=n(182),p=n(10),f=c.a.forwardRef((function(e,t){e.checked;var n=e.classes,o=e.className,i=e.control,f=e.disabled,d=(e.inputRef,e.label),h=e.labelPlacement,b=void 0===h?"end":h,y=(e.name,e.onChange,e.value,Object(r.a)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),v=Object(u.a)(),m=f;"undefined"===typeof m&&"undefined"!==typeof i.props.disabled&&(m=i.props.disabled),"undefined"===typeof m&&v&&(m=v.disabled);var g={disabled:m};return["checked","name","onChange","value","inputRef"].forEach((function(t){"undefined"===typeof i.props[t]&&"undefined"!==typeof e[t]&&(g[t]=e[t])})),c.a.createElement("label",Object(a.a)({className:Object(l.a)(n.root,o,"end"!==b&&n["labelPlacement".concat(Object(p.a)(b))],m&&n.disabled),ref:t},y),c.a.cloneElement(i,g),c.a.createElement(s.a,{component:"span",className:Object(l.a)(n.label,m&&n.disabled)},d))}));t.a=Object(i.a)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(f)}}]);
//# sourceMappingURL=21.be5525f7.chunk.js.map