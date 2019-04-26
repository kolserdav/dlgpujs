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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/frontend/line.js":
/*!*******************************!*\
  !*** ../src/frontend/line.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Line {\n  constructor(){\n    const negative = true;\n    let indentX = 10;\n    let indentY = 10;\n    let tabY = 0;\n    let line = [-80, -20, 0, 0, 100, 100, 130, -10];\n    const arrowLength = 10;\n    const arrowWidth = 5;\n    const strokeWidth = 2;\n    let lengthX = 400;\n    let tabX = (negative)? lengthX / 2 : indentX;\n    const lengthY = 400;\n    const width = window.innerWidth;\n    const height = window.innerHeight;\n    const stage = new Konva.Stage({\n        container: 'container',\n        width: width,\n        height: height\n    });\n    var layer = new Konva.Layer();\n    const arrowY = new Konva.Arrow({\n      x: indentX,\n      y: indentY,\n      points: [ tabX, lengthX, tabX, tabY],\n      pointerLength: arrowLength,\n      pointerWidth: arrowWidth,\n      fill: 'black',\n      stroke: 'black',\n      strokeWidth: strokeWidth\n    });\n    lengthX = (negative)? lengthX/2 : lengthX;\n    this.nullX = tabX;\n    this.nullY = lengthX;\n    line = line.map((item, index) => {\n      if (index === 0 || index % 2 === 0){\n        return this.nullX + item + indentX;\n      }\n      else {\n        return this.nullY - item + indentY;\n      }\n    });\n    console.log(line)\n    const vector = new Konva.Line({\n      points: line,\n      stroke: 'red',\n      strokeWidth: 2,\n      lineCap: 'round',\n      lineJoin: 'round'\n    });\n    tabX = (negative)? 0 : tabX;\n    const arrowX = new Konva.Arrow({\n      x: indentX,\n      y: indentY,\n      points: [tabX, lengthX, lengthY, lengthX],\n      pointerLength: arrowLength,\n      pointerWidth: arrowWidth,\n      fill: 'black',\n      stroke: 'black',\n      strokeWidth: strokeWidth\n    });\n    layer.add(arrowY);\n    layer.add(vector);\n    layer.add(arrowX);\n    stage.add(layer);\n  }\n}\n\nmodule.exports = { Line };\n\n//# sourceURL=webpack:///../src/frontend/line.js?");

/***/ }),

/***/ "./module.js":
/*!*******************!*\
  !*** ./module.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst Line = __webpack_require__(/*! ../src/frontend/line.js */ \"../src/frontend/line.js\").Line;\nconst canvas2 = document.querySelector('#canvas2');\nlet ctx2 = canvas2.getContext('2d');\n\nclass Module {\n\n    constructor(){\n        new Line();\n        this.socket = io('http://localhost');\n        this.socket.on('connect', function(){\n            console.info('Connected!');\n        });\n        this.socket.on('message', function(data){\n            if (data.canvas === 2){\n                console.log(data.data);\n                var dataImage = ctx2.createImageData(data.width, data.height);\n                const array = data.data.split(',');\n                array.map((item, index) => {\n                    dataImage.data[index] = parseInt(item);\n                });\n                ctx2.putImageData(dataImage, 0, 0);\n            }\n        });\n        this.socket.on('disconnect', function(){\n            console.warn('Disconnected!');\n        });\n\n\n        const buttonRand = document.querySelector('#button-random');\n        buttonRand.addEventListener('click', () => {\n            this.socket.send({\n                request: 0,\n                message: 'Start random'\n            });\n        })\n\n        const buttonStart = document.querySelector('#button-start');\n        buttonStart.addEventListener('click', () => {\n            this.socket.send({\n                request: 1,\n                message: 'Start train'\n            });\n        })\n    }\n}\n\nconst m = new Module();\n\n\n//# sourceURL=webpack:///./module.js?");

/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./module.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./module.js */\"./module.js\");\n\n\n//# sourceURL=webpack:///multi_./module.js?");

/***/ })

/******/ });