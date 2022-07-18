export type Form = {
  value: string;
  valid: boolean;
  required: boolean;
  validating: boolean;
  validators: Validator[];
};

type Validator = {
  validator: (value: string) => boolean;
};
