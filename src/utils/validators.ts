export const email = (value: string) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );
};

export const password = (value: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    value
  );
};

export const matchingFields = (value: string) => (matchingValue: string) => {
    return value === matchingValue;
};

export const required = (value: string) => {
  return value !== undefined && value.trim().length === 0;
};

export const min = (min: number) => (value: string) => {
  return +value < min;
};

export const max = (max: number) => (value: string) => {
  return +value > max;
};

export const minLength = (minLength: number) => (value: string) => {
  return value.length < minLength;
};

export const maxLength = (maxLength: number) => (value: string) => {
  return value.length > maxLength;
};
