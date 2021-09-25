import { IField, IStatusClasses, IVResponse } from "./Interfaces";
import VHelper from "./VHelper";

export default class VInput {
  /**
   * Validate input with custom params
   *
   * @param {HTMLInputElement} field input element
   * @param {IField} params object with validate params
   * @returns {IVResponse}
   */

  static validate(field: HTMLInputElement, params: IField): IVResponse {
    const Helper = new VHelper();

    if ((params.required || field.required) && !Helper.checkRequired(field)) return {
      status: false,
      type: 'empty',
      name: 'required'
    }

    if (params.minLength && !Helper.minMaxLength(field.value, params.minLength)) return {
      status: false,
      type: 'error',
      name: 'minLength'
    }

    if (params.maxLength && !Helper.minMaxLength(field.value, 0, params.maxLength)) return {
      status: false,
      type: 'error',
      name: 'maxLength'
    }

    if (params.regExp && !Helper.checkByRegExp(field.value, params.regExp)) return {
      status: false,
      type: 'error',
      name: 'regExp'
    }

    return { status: true };
  }

  /**
   * Validate input and set classes to him, call callbacks by events
   *
   * @param {HTMLInputElement} field input element
   * @param {IField} params validate params
   * @param {IStatusClasses} classes classes thats add to input
   * @param {object} events object with callbacks for events
   * @returns {IVResponse}
   */

  static changeHandler(field: HTMLInputElement, params: IField, classes: IStatusClasses, events: { [key: string]: Function[] } = {}): IVResponse {
    const response = this.validate(field, params);

    field.classList.toggle(classes.empty, response.type === 'empty');
    field.classList.toggle(classes.error, response.type === 'error');
    field.classList.toggle(classes.correct, response.status);

    if (response.type && events[response.type]) {
      events[response.type].forEach(callback => callback(field, response));
    }

    return response;
  }

  /**
   * Change input value by mask
   *
   * @param {Event} event
   * @param {string} mask
   */

  static mask(event: InputEvent | FocusEvent | null, mask: string | undefined): void {
    if (event === null) return;
    if (event.target === null || !(event.target instanceof HTMLInputElement)) return;
    if (!mask) return;

    const target: HTMLInputElement = event.target;
    const badTypes: string[] = ['deleteContentBackward', 'deleteByCut', 'deleteContentForward'];

		if (event instanceof InputEvent && !badTypes.includes(event.inputType) || event instanceof FocusEvent) {
			const startCursorPosition = target.selectionStart;
			const endCursorPosition = target.value.length;
			const value = target.value.replace(/\D/g, '');
			const maskValue = mask.replace(/\D/g, '');
			let maskCount = 0;

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
	}

  /**
   * Filter forbidden symbols
   *
   * @param {HTMLInputElement} field
   * @param {string | RegExp} regExp
   */

  static filterInput(field: HTMLInputElement, regExp: string | RegExp | undefined): void {
    if (regExp) {
      const Helper = new VHelper();
      let realTimeRegExp: RegExp | null = null;

      if (regExp instanceof RegExp) {
        realTimeRegExp = regExp;
      } else if (Helper.regExpSymbols[regExp]) {
        realTimeRegExp = Helper.regExpSymbols[regExp];
      }

      if (realTimeRegExp !== null) {
        field.value = field.value.replace(realTimeRegExp, '');
      }
    }
  }
}
