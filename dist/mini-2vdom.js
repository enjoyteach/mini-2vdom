/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Scanner.js":
/*!************************!*\
  !*** ./src/Scanner.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Scanner {\n  constructor(text) {\n    this.text  = text;\n    // 指针\n    this.pos = 0;\n    // 尾巴  剩余字符\n    this.tail = text;\n  }\n\n  /**\n   * 路过指定内容\n   *\n   * @memberof Scanner\n   */\n  scan(tag) {\n    if (this.tail.indexOf(tag) === 0) {\n      // 直接跳过指定内容的长度\n      this.pos += tag.length;\n      // 更新tail\n      this.tail = this.text.substring(this.pos);\n    }\n  }\n\n  /**\n   * 让指针进行扫描，直到遇见指定内容，返回路过的文字\n   *\n   * @memberof Scanner\n   * @return str 收集到的字符串\n   */\n   scanUntil(stopTag) {\n    // 记录开始扫描时的初始值\n    const startPos = this.pos;\n    // 当尾巴的开头不是stopTg的时候，说明还没有扫描到stopTag\n    while (!this.eos() && this.tail.indexOf(stopTag) !== 0 ) {\n      // 改变尾巴为当前指针这个字符到最后的所有字符\n      this.tail = this.text.substring(++this.pos);\n    }\n\n    // 返回经过的文本数据\n    return this.text.substring(startPos, this.pos).trim();\n  }\n\n  /**\n   * 判断指针是否到达文本末尾（end of string）\n   *\n   * @memberof Scanner\n   */\n  eos() {\n    return this.pos >= this.text.length;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Scanner);\n\n\n//# sourceURL=webpack:///./src/Scanner.js?");

/***/ }),

/***/ "./src/classParser.js":
/*!****************************!*\
  !*** ./src/classParser.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * 将html标签的class属性的字符串解析为{key: boolean}的形式\n *\n * @param {string} str\n * @return {object}\n */\nfunction classParser(str) {\n  if (!str) return {};\n\n  const classNames = {};\n  str.replace(/\\s+/g, ' ')\n     .split(' ')\n     .forEach(key => classNames[key] = true)\n\n  return classNames;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (classParser);\n\n\n//# sourceURL=webpack:///./src/classParser.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tokenizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenizer */ \"./src/tokenizer.js\");\n/* harmony import */ var _tokens2vdom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens2vdom */ \"./src/tokens2vdom.js\");\n\n\n\nwindow.toVDOM = function(html) {\n\n  const tokens = Object(_tokenizer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(html);\n  const vdom = Object(_tokens2vdom__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(tokens);\n\n  return vdom;\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/propsParser.js":
/*!****************************!*\
  !*** ./src/propsParser.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Scanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scanner */ \"./src/Scanner.js\");\n\n\nfunction propsParser(propsStr) {\n  propsStr = propsStr.trim();\n\n  const scanner = new _Scanner__WEBPACK_IMPORTED_MODULE_0__[\"default\"](propsStr);\n\n  const props = {};\n\n  while(!scanner.eos()) {\n    const key = scanner.scanUntil('=');\n    scanner.scan('=\"');\n\n    const val = scanner.scanUntil('\"');\n    props[key] = val;\n    scanner.scan('\"');\n  }\n\n  return props;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (propsParser);\n\n//# sourceURL=webpack:///./src/propsParser.js?");

/***/ }),

/***/ "./src/styleParser.js":
/*!****************************!*\
  !*** ./src/styleParser.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * 将html标签的style属性的字符串解析为{key: value}的形式\n *\n * @param {string} str\n * @return {object}\n */\n\nfunction styleParser(str) {\n  if (!str) return {};\n\n  const styles = {};\n\n  str.split(';').forEach(statement => {\n    const [key, val] = statement.trim().split(':');\n    if (key.trim()) {\n      styles[key.trim()] = val && val.trim();\n    }\n  })\n\n  return styles;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (styleParser);\n\n\n//# sourceURL=webpack:///./src/styleParser.js?");

/***/ }),

/***/ "./src/tokenizer.js":
/*!**************************!*\
  !*** ./src/tokenizer.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Scanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scanner */ \"./src/Scanner.js\");\n/* harmony import */ var _propsParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./propsParser */ \"./src/propsParser.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n\n\n\nfunction tokenizer(html) {\n  return nestTokens(collectTokens(html));\n}\n\n/**\n * 将html字符串转为无嵌套结构的token，返回tokens数组\n *\n * @param {string} html\n * @return {array} \n */\nfunction collectTokens(html) {\n  const scanner = new _Scanner__WEBPACK_IMPORTED_MODULE_0__[\"default\"](html);\n  const tokens = [];\n\n  let word = '';\n  // console.log(html);\n  while (!scanner.eos()) {\n    // 扫描文本\n    const text = scanner.scanUntil('<');\n    scanner.scan('<');\n    tokens[tokens.length - 1] && tokens[tokens.length - 1].push(text);\n    // 扫描标签<>中的内容\n    word = scanner.scanUntil('>');\n    scanner.scan('>');\n    // 如果没有扫描到值，就跳过本次进行下一次扫描\n    if (!word) continue;\n    // 区分开始标签 # 和结束标签 /\n    if (word.startsWith('/')) {\n      tokens.push(['/', word.slice(1)]);\n    } else {\n      // 如果有属性存在，则解析属性\n      const firstSpaceIdx = word.indexOf(' ');\n      if (firstSpaceIdx === -1) {\n        tokens.push(['#', word, {}]);\n      } else {\n        // 解析属性\n        const data = Object(_propsParser__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(word.slice(firstSpaceIdx))\n        tokens.push(['#', word.slice(0, firstSpaceIdx), data]);\n      }\n    }\n  }\n\n  return tokens;\n}\n\nfunction nestTokens(tokens) {\n  const nestedTokens = [];\n  const stack = [];\n  let collector = nestedTokens;\n\n  for (let i = 0, len = tokens.length; i < len; i++) {\n    const token = tokens[i];\n\n    switch (token[0]) {\n      case '#':\n        // 收集当前token\n        collector.push(token);\n        // 压入栈中\n        stack.push(token);\n        // 由于进入了新的嵌套结构，新建一个数组保存嵌套结构\n        // 并修改collector的指向\n        if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"isEmptyObject\"])(token[2])) {\n          token.splice(2, 0, []);\n          collector = token[2] = [];\n        } else {\n          token.splice(2, 0, []);\n          collector = token[2];\n        }\n\n        break;\n      case '/':\n        // 出栈\n        stack.pop();\n        // 将收集器指向上一层作用域中用于存放嵌套结构的数组\n        collector = stack.length > 0\n          ? stack[stack.length - 1][2]\n          : nestedTokens;\n        break;\n      default:\n        collector.push(token);\n    }\n  }\n\n  return nestedTokens;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (tokenizer);\n\n\n//# sourceURL=webpack:///./src/tokenizer.js?");

/***/ }),

/***/ "./src/tokens2vdom.js":
/*!****************************!*\
  !*** ./src/tokens2vdom.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _classParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classParser */ \"./src/classParser.js\");\n/* harmony import */ var _styleParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styleParser */ \"./src/styleParser.js\");\n\n\n\n\n\n/**\n * 将toknes转换为虚拟DOM\n *\n * @param {token[]} tokens\n * @return {object} vdom \n */\nfunction tokens2vdom(tokens) {\n  const vdom = {};\n\n  for (let i = 0, len = tokens.length; i < len; i++) {\n    const token = tokens[i];\n    vdom['sel'] = token[1];\n    vdom['data'] = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isArray\"])(token[2]) ? token[3] : token[2];\n\n    // 解析类名\n    if (vdom['data']['class']) {\n      vdom['data']['class'] = Object(_classParser__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(vdom['data']['class']);\n    }\n\n    // 解析行类样式\n    if (vdom['data']['style']) {\n      vdom['data']['style'] = Object(_styleParser__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(vdom['data']['style']);\n    }\n\n    if (token[4]) {\n      vdom['text'] = token[token.length - 1];\n    }\n    vdom['children'] = [];\n    \n    const children = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isArray\"])(token[2]) ? token[2] : token[3];\n    if (!children) continue;\n\n    for (let j = 0; j < children.length; j++) {\n      vdom['children'].push(tokens2vdom([children[j]]));\n    }\n\n    if (vdom['children'].length === 0) {\n      delete vdom['children'];\n    }\n  }\n\n  return vdom;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (tokens2vdom);\n\n//# sourceURL=webpack:///./src/tokens2vdom.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: toString, isObject, isEmptyObject, isArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toString\", function() { return toString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isObject\", function() { return isObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isEmptyObject\", function() { return isEmptyObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isArray\", function() { return isArray; });\nfunction toString(arg) {\n  return Object.prototype.toString.call(arg);\n}\n\nfunction isObject(arg) {\n  return toString(arg) === '[object Object]';\n}\n\nfunction isEmptyObject(obj) {\n  if (isObject(obj)) {\n    for (const key in obj) {\n      if (obj.hasOwnProperty(key)) return false;\n    }\n    return true;\n  } else {\n    return false;\n  }\n}\n\nfunction isArray(arg) {\n  return toString(arg) === '[object Array]';\n}\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });