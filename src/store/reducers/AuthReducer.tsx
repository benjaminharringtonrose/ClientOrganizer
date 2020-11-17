import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_REQUESTED,
  LOGIN_USER_SUCCEEDED,
  LOGIN_USER_FAILED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  REGISTER_USER_REQUESTED,
  REGISTER_USER_SUCCEEDED,
  REGISTER_USER_FAILED,
  LOGOUT_USER_REQUESTED,
  LOGOUT_USER_SUCCEEDED,
  LOGOUT_USER_FAILED,
  AVATAR_CHANGED,
} from "../actions/types";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  avatar: undefined,
  email: "",
  password: "",
  uid: "",
  error: "",
  loading: false,
  clients: {},
};

// AUTH REDUCER

const AuthReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    // LOGIN
    case LOGIN_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCEEDED:
      return {
        ...state,
        email: undefined,
        password: undefined,
        user: action.payload,
        loading: false,
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        error: action.payload.message,
        password: "",
        loading: false,
      };
    // LOGOUT
    case LOGOUT_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_USER_SUCCEEDED:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: false,
      };
    case LOGOUT_USER_FAILED:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    // REGISTER
    case REGISTER_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        clients: {},
        loading: false,
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        error: action.payload.message,
        password: "",
        loading: false,
      };
    // REGISTER FORM
    case FIRST_NAME_CHANGED:
      return {
        ...state,
        firstName: action.payload,
      };
    case LAST_NAME_CHANGED:
      return {
        ...state,
        lastName: action.payload,
      };
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload,
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload,
      };
    case AVATAR_CHANGED:
      return {
        ...state,
        avatar: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
