import {
  CLIENT_NAME_CHANGED,
  CLIENT_ADDRESS_CHANGED,
  CLIENT_PHONE_NUMBER_CHANGED,
  CLIENT_EMAIL_CHANGED,
  CLIENT_BUDGET_CHANGED,
  CLIENT_PREFERRED_AREAS_CHANGED,
  CLIENT_NOTES_CHANGED,
} from "../actions/types";

const INITIAL_STATE = {
  name: undefined,
  address: undefined,
  phoneNumber: undefined,
  email: undefined,
  budget: undefined,
  preferredAreas: undefined,
  notes: undefined,
};

const ClientReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CLIENT_NAME_CHANGED:
      return {
        ...state,
        name: action.payload,
      };
    case CLIENT_ADDRESS_CHANGED:
      return {
        ...state,
        address: action.payload,
      };
    case CLIENT_PHONE_NUMBER_CHANGED:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case CLIENT_EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload,
      };
    case CLIENT_BUDGET_CHANGED:
      return {
        ...state,
        budget: action.payload,
      };
    case CLIENT_PREFERRED_AREAS_CHANGED:
      return {
        ...state,
        preferredAreas: action.payload,
      };
    case CLIENT_NOTES_CHANGED:
      return {
        ...state,
        notes: action.payload,
      };

    default:
      return state;
  }
};

export default ClientReducer;
