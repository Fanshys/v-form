export default class VHelper {
  readonly regExp: { [key: string]: RegExp; };
  readonly regExpSymbols: { [key: string]: RegExp; };

  constructor() {
    this.regExp = {
      email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      phone: /^((\+7|7|8)+([0-9()-_ ]){10,20})$/,
    }

    this.regExpSymbols = {
      email: /[^A-Za-zА-Яа-я0-9@._-]+/g,
			phone: /[^0-9+-_() ]+/g,
      text: /[^\,A-Za-zА-Яа-я0-9.,@\-_#№%*+=$"!/ ]+/g,
			num: /[^0-9]+/g,
			letters: /[^a-zA-Zа-яА-я]+/g,
    }
  }

  /**
   * Validate string for max/min length
   *
   * @param {string} str
   * @param {number} min
   * @param {number} max
   * @returns {boolean}
   */

  minMaxLength(str: string, min: number = 0, max: number = Infinity): boolean {
    if (!str) return false;
    if (str.length < min) return false;
    if (max && str.length > max) return false;

    return true;
  }

  /**
   * Validate number for min/max
   *
   * @param {number} num
   * @param {number} min
   * @param {number} max
   * @returns {boolean}
   */

  minMax(num: number, min: number = 0, max: number = Infinity): boolean {
    if (!num) return false;
    if (num < min) return false;
    if (max && num > max) return false;

    return true;
  }

  /**
   * Validate string for regular expression
   *
   * @param {string} str
   * @param {RegExp} regExp
   * @returns {boolean}
   */

  checkByRegExp(str: string, regExp: RegExp | string): boolean {
    if (!str || !regExp) return false;

    let thisRegExp: RegExp | null = null;

    if (regExp instanceof RegExp) {
      thisRegExp = regExp;
    } else if (this.regExp[regExp]) {
      thisRegExp = this.regExp[regExp];
    }

    if (thisRegExp !== null && !thisRegExp.test(str)) {
      thisRegExp.lastIndex = 0;
      return false;
    }

    return true;
  }

  /**
   * Validate string by RexExp to contains only valid symbols
   *
   * @param {string} str
   * @param {RegExp} regExp
   * @returns {boolean}
   */

  checkByRegExpSymbols(str: string, regExp: RegExp): boolean {
    if (!str || !regExp) return false;
    if (regExp.test(str)) {
      regExp.lastIndex = 0;
      return false;
    }

    return true;
  }

  /**
   * Check if input have value
   *
   * @param {HTMLInputElement} field input element
   * @returns {boolean}
   */

  checkRequired(field: HTMLInputElement): boolean {
    const type = field.type;
    const checkedTypes = ['radio', 'checkbox'];
    const valueTypes = ['text', 'textarea', 'email', 'tel', 'search', 'date'];

    if (checkedTypes.includes(type) && !field.checked) return false;
    if (valueTypes.includes(type) && !field.value) return false;

    return true;
  }
}
