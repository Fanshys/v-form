import VInput from './VInput';
import { IField, IParams, IStatusClasses } from './Interfaces'

type FormType = NodeListOf<HTMLFormElement> | HTMLFormElement | null;
type EventsType = "correct" | "empty" | "error" | "submit";

export default class VForm {
  readonly fields: IField[];
  readonly form: FormType;
  readonly classes: IStatusClasses;
  readonly focusValidate: boolean;
  events: { [key: string]: Function[] };

  constructor(form: FormType, {fields, focusValidate = true, classes}: IParams) {
    this.form = form;
    this.fields = fields;
    this.focusValidate = focusValidate;
    this.classes = {
      error: 'error',
			empty: 'empty',
			correct: 'correct',
      ...classes
    };
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

  init(): void {
    if (this.form === null || !this.form.length) return;
    if (!this.fields?.length) return;

    if (this.form instanceof HTMLFormElement) {
      this.initForm(this.form);
    } else {
      this.form.forEach(item => this.initForm(item));
    }
  }

  /**
   * Init form events and inputs
   *
   * @param {HTMLFormElement} form
   */

  initForm(form: HTMLFormElement): void {
    this.fields.forEach(field => {
      const fieldElem: HTMLInputElement | null = form.querySelector(field.selector);

      if (fieldElem === null || !(fieldElem instanceof HTMLInputElement)) return;

      this.setFieldHandlers(fieldElem, field);
    });

    form.noValidate = true;
    form.addEventListener('submit', (event) => this.submitHandler(form, event));
  }

  /**
   * Add all needed for validate events to field
   *
   * @param {HTMLInputElement} field input element
   * @param {IField} params validate params
   */

  setFieldHandlers(field: HTMLInputElement, params: IField): void {
    if (this.focusValidate) {
      field.addEventListener('change', () => VInput.changeHandler(field, params, this.classes, this.events));
      field.addEventListener('blur', () => VInput.changeHandler(field, params, this.classes, this.events));
    }

    if (params.realTime && params.realTimeRegExp) {
      field.addEventListener('input', () => VInput.filterInput(field, params.realTimeRegExp));
    }

    if (params.mask) {
      field.addEventListener('input', (event) => {
        if (event instanceof InputEvent) VInput.mask(event, params.mask);
      });

      field.addEventListener('focus', (event) => {
        if (event instanceof FocusEvent) VInput.mask(event, params.mask);
      });
    }
  }

  /**
   * Validate form by all correct inputs
   *
   * @param {HTMLFormElement} form
   * @returns {boolean}
   */

  validate(form: HTMLFormElement): boolean {
    let status = true;

    this.fields.forEach(field => {
      const fieldElem: HTMLInputElement | null = form.querySelector(field.selector);

      if (fieldElem === null || !(fieldElem instanceof HTMLInputElement)) return;

      const VInputResponse = VInput.changeHandler(fieldElem, field, this.classes, this.events);

      if (!VInputResponse.status) {
        status = false;
      }
    });

    return status;
  }

  /**
   * Handler for work with submit form event
   *
   * @param {HTMLFormElement} form
   * @param {Event} event
   */

  submitHandler(form:HTMLFormElement, event: Event): void {
    if (!this.validate(form)) {
      event.preventDefault();
    } else if(this.events.submit.length) {
      this.events.submit.forEach(callback => callback(event));
    }
  }

  /**
   * Method for add custom callbacks to validate events
   *
   * @param {EventsType} event
   * @param {Function} callback
   */

  on(event: EventsType, callback: Function) {
    this.events[event].push(callback);
  }
}
