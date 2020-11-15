import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
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
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        email: undefined,
        password: undefined,
        user: action.payload,
        loading: false,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: "Authentication Failed.",
        password: "",
        loading: false,
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: false,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        error: "Logout Failed.",
        loading: false,
      };

    // REGISTER FORM CASES
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
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        clients: {},
        loading: false,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: "Authentication Failed.",
        password: "",
        loading: false,
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
