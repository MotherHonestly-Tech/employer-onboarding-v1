export const SET_FORM_DATA = 'SET_FORM_DATA';

type Validator = (value: string) => boolean;

export const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_FORM_DATA:
      const valid = state[action.id].validators.reduce(
        (acc: boolean, validator: { validator: Validator }) => {
          return acc && validator.validator(action.value);
        },
        true
      );

      const updatedFormData = {
        ...state[action.id],
        value: action.value,
        valid
      };

      const updatedState = {
        ...state,
        [action.id]: updatedFormData
      };

      let formIsValid = true;
      for (const key in updatedState) {
        if (typeof updatedState[key] === 'object')
          formIsValid = formIsValid && updatedState[key].valid;
      }

      return {
        ...updatedState,
        formIsValid
      };
    default:
      return state;
  }
};
