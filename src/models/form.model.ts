export type Form = {
  [key: string]: FormControl | boolean;
};

type FormControl = {
  value: string;
  valid: boolean;
  required: boolean;
  validating: boolean;
  validators: Validator[];
};

export type Validator = {
  validator: (value: string) => boolean;
};
