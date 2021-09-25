// import { IVResponse } from './Interfaces';
import VForm from './VForm';

const validator = new VForm(document.querySelectorAll('form'), {
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
