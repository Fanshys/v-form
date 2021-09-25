interface IField {
  selector: string;
  maxLength?: number;
  minLength?: number;
  regExp?: string | RegExp;
  realTimeRegExp?: string | RegExp;
  realTime?: boolean;
  mask?: string;
  required?: boolean;
}

interface IParams {
  classes?: { [key: string]: string; };
  fields: IField[];
  focusValidate?: boolean;
}

interface IVResponse {
  status: boolean;
  type?: string;
  name?: string;
  message?: string;
}

interface IStatusClasses {
  correct: string;
  error: string;
  empty: string;
}

export { IField, IParams, IVResponse, IStatusClasses }
