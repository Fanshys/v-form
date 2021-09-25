/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/VForm.ts":
/*!**********************!*\
  !*** ./src/VForm.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var VInput_1 = __webpack_require__(/*! ./VInput */ "./src/VInput.ts");
var VForm = /** @class */ (function () {
    function VForm(form, _a) {
        var fields = _a.fields, _b = _a.focusValidate, focusValidate = _b === void 0 ? true : _b, classes = _a.classes;
        this.form = form;
        this.fields = fields;
        this.focusValidate = focusValidate;
        this.classes = __assign({ error: 'error', empty: 'empty', correct: 'correct' }, classes);
        this.events = {
            correct: [],
            empty: [],
            error: [],
            submit: []
        };
        this.init();
    }
    /**
     * Init the validate form process
    */
    VForm.prototype.init = function () {
        var _this = this;
        var _a;
        if (this.form === null || !this.form.length)
            return;
        if (!((_a = this.fields) === null || _a === void 0 ? void 0 : _a.length))
            return;
        if (this.form instanceof HTMLFormElement) {
            this.initForm(this.form);
        }
        else {
            this.form.forEach(function (item) { return _this.initForm(item); });
        }
    };
    /**
     * Init form events and inputs
     *
     * @param {HTMLFormElement} form
     */
    VForm.prototype.initForm = function (form) {
        var _this = this;
        this.fields.forEach(function (field) {
            var fieldElem = form.querySelector(field.selector);
            if (fieldElem === null || !(fieldElem instanceof HTMLInputElement))
                return;
            _this.setFieldHandlers(fieldElem, field);
        });
        form.noValidate = true;
        form.addEventListener('submit', function (event) { return _this.submitHandler(form, event); });
    };
    /**
     * Add all needed for validate events to field
     *
     * @param {HTMLInputElement} field input element
     * @param {IField} params validate params
     */
    VForm.prototype.setFieldHandlers = function (field, params) {
        var _this = this;
        if (this.focusValidate) {
            field.addEventListener('change', function () { return VInput_1.default.changeHandler(field, params, _this.classes, _this.events); });
            field.addEventListener('blur', function () { return VInput_1.default.changeHandler(field, params, _this.classes, _this.events); });
        }
        if (params.realTime && params.realTimeRegExp) {
            field.addEventListener('input', function () { return VInput_1.default.filterInput(field, params.realTimeRegExp); });
        }
        if (params.mask) {
            field.addEventListener('input', function (event) {
                if (event instanceof InputEvent)
                    VInput_1.default.mask(event, params.mask);
            });
            field.addEventListener('focus', function (event) {
                if (event instanceof FocusEvent)
                    VInput_1.default.mask(event, params.mask);
            });
        }
    };
    /**
     * Validate form by all correct inputs
     *
     * @param {HTMLFormElement} form
     * @returns {boolean}
     */
    VForm.prototype.validate = function (form) {
        var _this = this;
        var status = true;
        this.fields.forEach(function (field) {
            var fieldElem = form.querySelector(field.selector);
            if (fieldElem === null || !(fieldElem instanceof HTMLInputElement))
                return;
            var VInputResponse = VInput_1.default.changeHandler(fieldElem, field, _this.classes, _this.events);
            if (!VInputResponse.status) {
                status = false;
            }
        });
        return status;
    };
    /**
     * Handler for work with submit form event
     *
     * @param {HTMLFormElement} form
     * @param {Event} event
     */
    VForm.prototype.submitHandler = function (form, event) {
        if (!this.validate(form)) {
            event.preventDefault();
        }
        else if (this.events.submit.length) {
            this.events.submit.forEach(function (callback) { return callback(event); });
        }
    };
    /**
     * Method for add custom callbacks to validate events
     *
     * @param {EventsType} event
     * @param {Function} callback
     */
    VForm.prototype.on = function (event, callback) {
        this.events[event].push(callback);
    };
    return VForm;
}());
exports["default"] = VForm;


/***/ }),

/***/ "./src/VHelper.ts":
/*!************************!*\
  !*** ./src/VHelper.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var VHelper = /** @class */ (function () {
    function VHelper() {
        this.regExp = {
            email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            phone: /^((\+7|7|8)+([0-9()-_ ]){10,20})$/,
        };
        this.regExpSymbols = {
            email: /[^A-Za-zА-Яа-я0-9@._-]+/g,
            phone: /[^0-9+-_() ]+/g,
            text: /[^\,A-Za-zА-Яа-я0-9.,@\-_#№%*+=$"!/ ]+/g,
            num: /[^0-9]+/g,
            letters: /[^a-zA-Zа-яА-я]+/g,
        };
    }
    /**
     * Validate string for max/min length
     *
     * @param {string} str
     * @param {number} min
     * @param {number} max
     * @returns {boolean}
     */
    VHelper.prototype.minMaxLength = function (str, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = Infinity; }
        if (!str)
            return false;
        if (str.length < min)
            return false;
        if (max && str.length > max)
            return false;
        return true;
    };
    /**
     * Validate number for min/max
     *
     * @param {number} num
     * @param {number} min
     * @param {number} max
     * @returns {boolean}
     */
    VHelper.prototype.minMax = function (num, min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = Infinity; }
        if (!num)
            return false;
        if (num < min)
            return false;
        if (max && num > max)
            return false;
        return true;
    };
    /**
     * Validate string for regular expression
     *
     * @param {string} str
     * @param {RegExp} regExp
     * @returns {boolean}
     */
    VHelper.prototype.checkByRegExp = function (str, regExp) {
        if (!str || !regExp)
            return false;
        var thisRegExp = null;
        if (regExp instanceof RegExp) {
            thisRegExp = regExp;
        }
        else if (this.regExp[regExp]) {
            thisRegExp = this.regExp[regExp];
        }
        if (thisRegExp !== null && !thisRegExp.test(str)) {
            thisRegExp.lastIndex = 0;
            return false;
        }
        return true;
    };
    /**
     * Validate string by RexExp to contains only valid symbols
     *
     * @param {string} str
     * @param {RegExp} regExp
     * @returns {boolean}
     */
    VHelper.prototype.checkByRegExpSymbols = function (str, regExp) {
        if (!str || !regExp)
            return false;
        if (regExp.test(str)) {
            regExp.lastIndex = 0;
            return false;
        }
        return true;
    };
    /**
     * Check if input have value
     *
     * @param {HTMLInputElement} field input element
     * @returns {boolean}
     */
    VHelper.prototype.checkRequired = function (field) {
        var type = field.type;
        var checkedTypes = ['radio', 'checkbox'];
        var valueTypes = ['text', 'textarea', 'email', 'tel', 'search', 'date'];
        if (checkedTypes.includes(type) && !field.checked)
            return false;
        if (valueTypes.includes(type) && !field.value)
            return false;
        return true;
    };
    return VHelper;
}());
exports["default"] = VHelper;


/***/ }),

/***/ "./src/VInput.ts":
/*!***********************!*\
  !*** ./src/VInput.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var VHelper_1 = __webpack_require__(/*! ./VHelper */ "./src/VHelper.ts");
var VInput = /** @class */ (function () {
    function VInput() {
    }
    /**
     * Validate input with custom params
     *
     * @param {HTMLInputElement} field input element
     * @param {IField} params object with validate params
     * @returns {IVResponse}
     */
    VInput.validate = function (field, params) {
        var Helper = new VHelper_1.default();
        if ((params.required || field.required) && !Helper.checkRequired(field))
            return {
                status: false,
                type: 'empty',
                name: 'required'
            };
        if (params.minLength && !Helper.minMaxLength(field.value, params.minLength))
            return {
                status: false,
                type: 'error',
                name: 'minLength'
            };
        if (params.maxLength && !Helper.minMaxLength(field.value, 0, params.maxLength))
            return {
                status: false,
                type: 'error',
                name: 'maxLength'
            };
        if (params.regExp && !Helper.checkByRegExp(field.value, params.regExp))
            return {
                status: false,
                type: 'error',
                name: 'regExp'
            };
        return { status: true };
    };
    /**
     * Validate input and set classes to him, call callbacks by events
     *
     * @param {HTMLInputElement} field input element
     * @param {IField} params validate params
     * @param {IStatusClasses} classes classes thats add to input
     * @param {object} events object with callbacks for events
     * @returns {IVResponse}
     */
    VInput.changeHandler = function (field, params, classes, events) {
        if (events === void 0) { events = {}; }
        var response = this.validate(field, params);
        field.classList.toggle(classes.empty, response.type === 'empty');
        field.classList.toggle(classes.error, response.type === 'error');
        field.classList.toggle(classes.correct, response.status);
        if (response.type && events[response.type]) {
            events[response.type].forEach(function (callback) { return callback(field, response); });
        }
        return response;
    };
    /**
     * Change input value by mask
     *
     * @param {Event} event
     * @param {string} mask
     */
    VInput.mask = function (event, mask) {
        if (event === null)
            return;
        if (event.target === null || !(event.target instanceof HTMLInputElement))
            return;
        if (!mask)
            return;
        var target = event.target;
        var badTypes = ['deleteContentBackward', 'deleteByCut', 'deleteContentForward'];
        if (event instanceof InputEvent && !badTypes.includes(event.inputType) || event instanceof FocusEvent) {
            var startCursorPosition = target.selectionStart;
            var endCursorPosition = target.value.length;
            var value = target.value.replace(/\D/g, '');
            var maskValue = mask.replace(/\D/g, '');
            var maskCount = 0;
            if (maskValue.length) {
                maskCount = maskValue.length;
            }
            while (maskCount < value.length) {
                mask = mask.replace('*', value[maskCount]);
                maskCount++;
            }
            target.value = mask.split('*')[0];
            if (startCursorPosition != endCursorPosition) {
                target.selectionStart = startCursorPosition;
                target.selectionEnd = startCursorPosition;
            }
        }
    };
    /**
     * Filter forbidden symbols
     *
     * @param {HTMLInputElement} field
     * @param {string | RegExp} regExp
     */
    VInput.filterInput = function (field, regExp) {
        if (regExp) {
            var Helper = new VHelper_1.default();
            var realTimeRegExp = null;
            if (regExp instanceof RegExp) {
                realTimeRegExp = regExp;
            }
            else if (Helper.regExpSymbols[regExp]) {
                realTimeRegExp = Helper.regExpSymbols[regExp];
            }
            if (realTimeRegExp !== null) {
                field.value = field.value.replace(realTimeRegExp, '');
            }
        }
    };
    return VInput;
}());
exports["default"] = VInput;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
// import { IVResponse } from './Interfaces';
var VForm_1 = __webpack_require__(/*! ./VForm */ "./src/VForm.ts");
var validator = new VForm_1.default(document.querySelectorAll('form'), {
    fields: [
        {
            selector: '[name="name"]',
            maxLength: 32,
            realTimeRegExp: 'text',
            realTime: true,
            required: true
        },
        {
            selector: '[name="phone"]',
            realTimeRegExp: 'phone',
            realTime: true,
            regExp: 'phone',
            mask: '+7 (***) ***-**-**'
        },
        {
            selector: '[name="checkbox"]',
            required: true
        }
    ],
});
// validator.on('error', function(input: HTMLInputElement, response: IVResponse) {
//   console.log(input, response);
// });
// validator.on('empty', function(input: HTMLInputElement, response: IVResponse) {
//   console.log(input, response);
// });
// validator.on('submit', function (event: Event) {
//   event.preventDefault();
//   console.log(event);
// });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsWUFBWSxhQUFhO0FBQ3pCLGNBQWMsbUJBQU8sQ0FBQywrQkFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC10ZXN0Ly4vc3JjL1ZGb3JtLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQtdGVzdC8uL3NyYy9WSGVscGVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQtdGVzdC8uL3NyYy9WSW5wdXQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC10ZXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3R5cGVzY3JpcHQtdGVzdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVklucHV0XzEgPSByZXF1aXJlKFwiLi9WSW5wdXRcIik7XG52YXIgVkZvcm0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVkZvcm0oZm9ybSwgX2EpIHtcbiAgICAgICAgdmFyIGZpZWxkcyA9IF9hLmZpZWxkcywgX2IgPSBfYS5mb2N1c1ZhbGlkYXRlLCBmb2N1c1ZhbGlkYXRlID0gX2IgPT09IHZvaWQgMCA/IHRydWUgOiBfYiwgY2xhc3NlcyA9IF9hLmNsYXNzZXM7XG4gICAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgICAgIHRoaXMuZmllbGRzID0gZmllbGRzO1xuICAgICAgICB0aGlzLmZvY3VzVmFsaWRhdGUgPSBmb2N1c1ZhbGlkYXRlO1xuICAgICAgICB0aGlzLmNsYXNzZXMgPSBfX2Fzc2lnbih7IGVycm9yOiAnZXJyb3InLCBlbXB0eTogJ2VtcHR5JywgY29ycmVjdDogJ2NvcnJlY3QnIH0sIGNsYXNzZXMpO1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHtcbiAgICAgICAgICAgIGNvcnJlY3Q6IFtdLFxuICAgICAgICAgICAgZW1wdHk6IFtdLFxuICAgICAgICAgICAgZXJyb3I6IFtdLFxuICAgICAgICAgICAgc3VibWl0OiBbXVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdCB0aGUgdmFsaWRhdGUgZm9ybSBwcm9jZXNzXG4gICAgKi9cbiAgICBWRm9ybS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5mb3JtID09PSBudWxsIHx8ICF0aGlzLmZvcm0ubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoISgoX2EgPSB0aGlzLmZpZWxkcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmZvcm0gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZvcm0odGhpcy5mb3JtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBfdGhpcy5pbml0Rm9ybShpdGVtKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluaXQgZm9ybSBldmVudHMgYW5kIGlucHV0c1xuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRm9ybUVsZW1lbnR9IGZvcm1cbiAgICAgKi9cbiAgICBWRm9ybS5wcm90b3R5cGUuaW5pdEZvcm0gPSBmdW5jdGlvbiAoZm9ybSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgdmFyIGZpZWxkRWxlbSA9IGZvcm0ucXVlcnlTZWxlY3RvcihmaWVsZC5zZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoZmllbGRFbGVtID09PSBudWxsIHx8ICEoZmllbGRFbGVtIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgX3RoaXMuc2V0RmllbGRIYW5kbGVycyhmaWVsZEVsZW0sIGZpZWxkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZvcm0ubm9WYWxpZGF0ZSA9IHRydWU7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBfdGhpcy5zdWJtaXRIYW5kbGVyKGZvcm0sIGV2ZW50KTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGQgYWxsIG5lZWRlZCBmb3IgdmFsaWRhdGUgZXZlbnRzIHRvIGZpZWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpZWxkIGlucHV0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0lGaWVsZH0gcGFyYW1zIHZhbGlkYXRlIHBhcmFtc1xuICAgICAqL1xuICAgIFZGb3JtLnByb3RvdHlwZS5zZXRGaWVsZEhhbmRsZXJzID0gZnVuY3Rpb24gKGZpZWxkLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNWYWxpZGF0ZSkge1xuICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gVklucHV0XzEuZGVmYXVsdC5jaGFuZ2VIYW5kbGVyKGZpZWxkLCBwYXJhbXMsIF90aGlzLmNsYXNzZXMsIF90aGlzLmV2ZW50cyk7IH0pO1xuICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFZJbnB1dF8xLmRlZmF1bHQuY2hhbmdlSGFuZGxlcihmaWVsZCwgcGFyYW1zLCBfdGhpcy5jbGFzc2VzLCBfdGhpcy5ldmVudHMpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLnJlYWxUaW1lICYmIHBhcmFtcy5yZWFsVGltZVJlZ0V4cCkge1xuICAgICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7IHJldHVybiBWSW5wdXRfMS5kZWZhdWx0LmZpbHRlcklucHV0KGZpZWxkLCBwYXJhbXMucmVhbFRpbWVSZWdFeHApOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLm1hc2spIHtcbiAgICAgICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSW5wdXRFdmVudClcbiAgICAgICAgICAgICAgICAgICAgVklucHV0XzEuZGVmYXVsdC5tYXNrKGV2ZW50LCBwYXJhbXMubWFzayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRm9jdXNFdmVudClcbiAgICAgICAgICAgICAgICAgICAgVklucHV0XzEuZGVmYXVsdC5tYXNrKGV2ZW50LCBwYXJhbXMubWFzayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgZm9ybSBieSBhbGwgY29ycmVjdCBpbnB1dHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTEZvcm1FbGVtZW50fSBmb3JtXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgVkZvcm0ucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gKGZvcm0pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHN0YXR1cyA9IHRydWU7XG4gICAgICAgIHRoaXMuZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICB2YXIgZmllbGRFbGVtID0gZm9ybS5xdWVyeVNlbGVjdG9yKGZpZWxkLnNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmIChmaWVsZEVsZW0gPT09IG51bGwgfHwgIShmaWVsZEVsZW0gaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgVklucHV0UmVzcG9uc2UgPSBWSW5wdXRfMS5kZWZhdWx0LmNoYW5nZUhhbmRsZXIoZmllbGRFbGVtLCBmaWVsZCwgX3RoaXMuY2xhc3NlcywgX3RoaXMuZXZlbnRzKTtcbiAgICAgICAgICAgIGlmICghVklucHV0UmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RhdHVzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3Igd29yayB3aXRoIHN1Ym1pdCBmb3JtIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxGb3JtRWxlbWVudH0gZm9ybVxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgVkZvcm0ucHJvdG90eXBlLnN1Ym1pdEhhbmRsZXIgPSBmdW5jdGlvbiAoZm9ybSwgZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlKGZvcm0pKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZXZlbnRzLnN1Ym1pdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnN1Ym1pdC5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykgeyByZXR1cm4gY2FsbGJhY2soZXZlbnQpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogTWV0aG9kIGZvciBhZGQgY3VzdG9tIGNhbGxiYWNrcyB0byB2YWxpZGF0ZSBldmVudHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnRzVHlwZX0gZXZlbnRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIFZGb3JtLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFZGb3JtO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZGb3JtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgVkhlbHBlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBWSGVscGVyKCkge1xuICAgICAgICB0aGlzLnJlZ0V4cCA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAvXlxcdysoW1xcLi1dP1xcdyspKkBcXHcrKFtcXC4tXT9cXHcrKSooXFwuXFx3ezIsM30pKyQvLFxuICAgICAgICAgICAgcGhvbmU6IC9eKChcXCs3fDd8OCkrKFswLTkoKS1fIF0pezEwLDIwfSkkLyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZWdFeHBTeW1ib2xzID0ge1xuICAgICAgICAgICAgZW1haWw6IC9bXkEtWmEtetCQLdCv0LAt0Y8wLTlALl8tXSsvZyxcbiAgICAgICAgICAgIHBob25lOiAvW14wLTkrLV8oKSBdKy9nLFxuICAgICAgICAgICAgdGV4dDogL1teXFwsQS1aYS160JAt0K/QsC3RjzAtOS4sQFxcLV8j4oSWJSorPSRcIiEvIF0rL2csXG4gICAgICAgICAgICBudW06IC9bXjAtOV0rL2csXG4gICAgICAgICAgICBsZXR0ZXJzOiAvW15hLXpBLVrQsC3Rj9CQLdGPXSsvZyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgc3RyaW5nIGZvciBtYXgvbWluIGxlbmd0aFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgVkhlbHBlci5wcm90b3R5cGUubWluTWF4TGVuZ3RoID0gZnVuY3Rpb24gKHN0ciwgbWluLCBtYXgpIHtcbiAgICAgICAgaWYgKG1pbiA9PT0gdm9pZCAwKSB7IG1pbiA9IDA7IH1cbiAgICAgICAgaWYgKG1heCA9PT0gdm9pZCAwKSB7IG1heCA9IEluZmluaXR5OyB9XG4gICAgICAgIGlmICghc3RyKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoc3RyLmxlbmd0aCA8IG1pbilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKG1heCAmJiBzdHIubGVuZ3RoID4gbWF4KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG51bWJlciBmb3IgbWluL21heFxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgVkhlbHBlci5wcm90b3R5cGUubWluTWF4ID0gZnVuY3Rpb24gKG51bSwgbWluLCBtYXgpIHtcbiAgICAgICAgaWYgKG1pbiA9PT0gdm9pZCAwKSB7IG1pbiA9IDA7IH1cbiAgICAgICAgaWYgKG1heCA9PT0gdm9pZCAwKSB7IG1heCA9IEluZmluaXR5OyB9XG4gICAgICAgIGlmICghbnVtKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAobnVtIDwgbWluKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAobWF4ICYmIG51bSA+IG1heClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBzdHJpbmcgZm9yIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWdFeHBcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBWSGVscGVyLnByb3RvdHlwZS5jaGVja0J5UmVnRXhwID0gZnVuY3Rpb24gKHN0ciwgcmVnRXhwKSB7XG4gICAgICAgIGlmICghc3RyIHx8ICFyZWdFeHApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciB0aGlzUmVnRXhwID0gbnVsbDtcbiAgICAgICAgaWYgKHJlZ0V4cCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgdGhpc1JlZ0V4cCA9IHJlZ0V4cDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnJlZ0V4cFtyZWdFeHBdKSB7XG4gICAgICAgICAgICB0aGlzUmVnRXhwID0gdGhpcy5yZWdFeHBbcmVnRXhwXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpc1JlZ0V4cCAhPT0gbnVsbCAmJiAhdGhpc1JlZ0V4cC50ZXN0KHN0cikpIHtcbiAgICAgICAgICAgIHRoaXNSZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHN0cmluZyBieSBSZXhFeHAgdG8gY29udGFpbnMgb25seSB2YWxpZCBzeW1ib2xzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ0V4cFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIFZIZWxwZXIucHJvdG90eXBlLmNoZWNrQnlSZWdFeHBTeW1ib2xzID0gZnVuY3Rpb24gKHN0ciwgcmVnRXhwKSB7XG4gICAgICAgIGlmICghc3RyIHx8ICFyZWdFeHApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChyZWdFeHAudGVzdChzdHIpKSB7XG4gICAgICAgICAgICByZWdFeHAubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGlucHV0IGhhdmUgdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gZmllbGQgaW5wdXQgZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIFZIZWxwZXIucHJvdG90eXBlLmNoZWNrUmVxdWlyZWQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBmaWVsZC50eXBlO1xuICAgICAgICB2YXIgY2hlY2tlZFR5cGVzID0gWydyYWRpbycsICdjaGVja2JveCddO1xuICAgICAgICB2YXIgdmFsdWVUeXBlcyA9IFsndGV4dCcsICd0ZXh0YXJlYScsICdlbWFpbCcsICd0ZWwnLCAnc2VhcmNoJywgJ2RhdGUnXTtcbiAgICAgICAgaWYgKGNoZWNrZWRUeXBlcy5pbmNsdWRlcyh0eXBlKSAmJiAhZmllbGQuY2hlY2tlZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHZhbHVlVHlwZXMuaW5jbHVkZXModHlwZSkgJiYgIWZpZWxkLnZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiBWSGVscGVyO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZIZWxwZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBWSGVscGVyXzEgPSByZXF1aXJlKFwiLi9WSGVscGVyXCIpO1xudmFyIFZJbnB1dCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBWSW5wdXQoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGlucHV0IHdpdGggY3VzdG9tIHBhcmFtc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBmaWVsZCBpbnB1dCBlbGVtZW50XG4gICAgICogQHBhcmFtIHtJRmllbGR9IHBhcmFtcyBvYmplY3Qgd2l0aCB2YWxpZGF0ZSBwYXJhbXNcbiAgICAgKiBAcmV0dXJucyB7SVZSZXNwb25zZX1cbiAgICAgKi9cbiAgICBWSW5wdXQudmFsaWRhdGUgPSBmdW5jdGlvbiAoZmllbGQsIHBhcmFtcykge1xuICAgICAgICB2YXIgSGVscGVyID0gbmV3IFZIZWxwZXJfMS5kZWZhdWx0KCk7XG4gICAgICAgIGlmICgocGFyYW1zLnJlcXVpcmVkIHx8IGZpZWxkLnJlcXVpcmVkKSAmJiAhSGVscGVyLmNoZWNrUmVxdWlyZWQoZmllbGQpKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdlbXB0eScsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3JlcXVpcmVkJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgaWYgKHBhcmFtcy5taW5MZW5ndGggJiYgIUhlbHBlci5taW5NYXhMZW5ndGgoZmllbGQudmFsdWUsIHBhcmFtcy5taW5MZW5ndGgpKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgbmFtZTogJ21pbkxlbmd0aCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIGlmIChwYXJhbXMubWF4TGVuZ3RoICYmICFIZWxwZXIubWluTWF4TGVuZ3RoKGZpZWxkLnZhbHVlLCAwLCBwYXJhbXMubWF4TGVuZ3RoKSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdtYXhMZW5ndGgnXG4gICAgICAgICAgICB9O1xuICAgICAgICBpZiAocGFyYW1zLnJlZ0V4cCAmJiAhSGVscGVyLmNoZWNrQnlSZWdFeHAoZmllbGQudmFsdWUsIHBhcmFtcy5yZWdFeHApKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3JlZ0V4cCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiB7IHN0YXR1czogdHJ1ZSB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgaW5wdXQgYW5kIHNldCBjbGFzc2VzIHRvIGhpbSwgY2FsbCBjYWxsYmFja3MgYnkgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpZWxkIGlucHV0IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0lGaWVsZH0gcGFyYW1zIHZhbGlkYXRlIHBhcmFtc1xuICAgICAqIEBwYXJhbSB7SVN0YXR1c0NsYXNzZXN9IGNsYXNzZXMgY2xhc3NlcyB0aGF0cyBhZGQgdG8gaW5wdXRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnRzIG9iamVjdCB3aXRoIGNhbGxiYWNrcyBmb3IgZXZlbnRzXG4gICAgICogQHJldHVybnMge0lWUmVzcG9uc2V9XG4gICAgICovXG4gICAgVklucHV0LmNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbiAoZmllbGQsIHBhcmFtcywgY2xhc3NlcywgZXZlbnRzKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHZvaWQgMCkgeyBldmVudHMgPSB7fTsgfVxuICAgICAgICB2YXIgcmVzcG9uc2UgPSB0aGlzLnZhbGlkYXRlKGZpZWxkLCBwYXJhbXMpO1xuICAgICAgICBmaWVsZC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzZXMuZW1wdHksIHJlc3BvbnNlLnR5cGUgPT09ICdlbXB0eScpO1xuICAgICAgICBmaWVsZC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzZXMuZXJyb3IsIHJlc3BvbnNlLnR5cGUgPT09ICdlcnJvcicpO1xuICAgICAgICBmaWVsZC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzZXMuY29ycmVjdCwgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnR5cGUgJiYgZXZlbnRzW3Jlc3BvbnNlLnR5cGVdKSB7XG4gICAgICAgICAgICBldmVudHNbcmVzcG9uc2UudHlwZV0uZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHsgcmV0dXJuIGNhbGxiYWNrKGZpZWxkLCByZXNwb25zZSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoYW5nZSBpbnB1dCB2YWx1ZSBieSBtYXNrXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtYXNrXG4gICAgICovXG4gICAgVklucHV0Lm1hc2sgPSBmdW5jdGlvbiAoZXZlbnQsIG1hc2spIHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSBudWxsIHx8ICEoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICghbWFzaylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgdmFyIGJhZFR5cGVzID0gWydkZWxldGVDb250ZW50QmFja3dhcmQnLCAnZGVsZXRlQnlDdXQnLCAnZGVsZXRlQ29udGVudEZvcndhcmQnXTtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSW5wdXRFdmVudCAmJiAhYmFkVHlwZXMuaW5jbHVkZXMoZXZlbnQuaW5wdXRUeXBlKSB8fCBldmVudCBpbnN0YW5jZW9mIEZvY3VzRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBzdGFydEN1cnNvclBvc2l0aW9uID0gdGFyZ2V0LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgICAgdmFyIGVuZEN1cnNvclBvc2l0aW9uID0gdGFyZ2V0LnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRhcmdldC52YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgICAgICAgICAgdmFyIG1hc2tWYWx1ZSA9IG1hc2sucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgICAgICAgIHZhciBtYXNrQ291bnQgPSAwO1xuICAgICAgICAgICAgaWYgKG1hc2tWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBtYXNrQ291bnQgPSBtYXNrVmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKG1hc2tDb3VudCA8IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG1hc2sgPSBtYXNrLnJlcGxhY2UoJyonLCB2YWx1ZVttYXNrQ291bnRdKTtcbiAgICAgICAgICAgICAgICBtYXNrQ291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldC52YWx1ZSA9IG1hc2suc3BsaXQoJyonKVswXTtcbiAgICAgICAgICAgIGlmIChzdGFydEN1cnNvclBvc2l0aW9uICE9IGVuZEN1cnNvclBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID0gc3RhcnRDdXJzb3JQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2VsZWN0aW9uRW5kID0gc3RhcnRDdXJzb3JQb3NpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogRmlsdGVyIGZvcmJpZGRlbiBzeW1ib2xzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGZpZWxkXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBSZWdFeHB9IHJlZ0V4cFxuICAgICAqL1xuICAgIFZJbnB1dC5maWx0ZXJJbnB1dCA9IGZ1bmN0aW9uIChmaWVsZCwgcmVnRXhwKSB7XG4gICAgICAgIGlmIChyZWdFeHApIHtcbiAgICAgICAgICAgIHZhciBIZWxwZXIgPSBuZXcgVkhlbHBlcl8xLmRlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciByZWFsVGltZVJlZ0V4cCA9IG51bGw7XG4gICAgICAgICAgICBpZiAocmVnRXhwIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICAgICAgcmVhbFRpbWVSZWdFeHAgPSByZWdFeHA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChIZWxwZXIucmVnRXhwU3ltYm9sc1tyZWdFeHBdKSB7XG4gICAgICAgICAgICAgICAgcmVhbFRpbWVSZWdFeHAgPSBIZWxwZXIucmVnRXhwU3ltYm9sc1tyZWdFeHBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlYWxUaW1lUmVnRXhwICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZmllbGQudmFsdWUgPSBmaWVsZC52YWx1ZS5yZXBsYWNlKHJlYWxUaW1lUmVnRXhwLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBWSW5wdXQ7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gVklucHV0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gaW1wb3J0IHsgSVZSZXNwb25zZSB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG52YXIgVkZvcm1fMSA9IHJlcXVpcmUoXCIuL1ZGb3JtXCIpO1xudmFyIHZhbGlkYXRvciA9IG5ldyBWRm9ybV8xLmRlZmF1bHQoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZm9ybScpLCB7XG4gICAgZmllbGRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJuYW1lXCJdJyxcbiAgICAgICAgICAgIG1heExlbmd0aDogMzIsXG4gICAgICAgICAgICByZWFsVGltZVJlZ0V4cDogJ3RleHQnLFxuICAgICAgICAgICAgcmVhbFRpbWU6IHRydWUsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ1tuYW1lPVwicGhvbmVcIl0nLFxuICAgICAgICAgICAgcmVhbFRpbWVSZWdFeHA6ICdwaG9uZScsXG4gICAgICAgICAgICByZWFsVGltZTogdHJ1ZSxcbiAgICAgICAgICAgIHJlZ0V4cDogJ3Bob25lJyxcbiAgICAgICAgICAgIG1hc2s6ICcrNyAoKioqKSAqKiotKiotKionXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJjaGVja2JveFwiXScsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbn0pO1xuLy8gdmFsaWRhdG9yLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50LCByZXNwb25zZTogSVZSZXNwb25zZSkge1xuLy8gICBjb25zb2xlLmxvZyhpbnB1dCwgcmVzcG9uc2UpO1xuLy8gfSk7XG4vLyB2YWxpZGF0b3Iub24oJ2VtcHR5JywgZnVuY3Rpb24oaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQsIHJlc3BvbnNlOiBJVlJlc3BvbnNlKSB7XG4vLyAgIGNvbnNvbGUubG9nKGlucHV0LCByZXNwb25zZSk7XG4vLyB9KTtcbi8vIHZhbGlkYXRvci5vbignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50OiBFdmVudCkge1xuLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gICBjb25zb2xlLmxvZyhldmVudCk7XG4vLyB9KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==