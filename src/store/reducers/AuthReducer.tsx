import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, AVATAR_CHANGED } from "../actions/types";

const INITIAL_STATE = {
  avatar: "",
  uid: "",
  error: undefined,
  loading: false,
  clients: {},
};

// AUTH REDUCER

const AuthReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    // LOGIN
    case LOGIN_USER.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER.SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: undefined,
      };
    case LOGIN_USER.FAILED:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    // LOGOUT
    case LOGOUT_USER.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_USER.SUCCEEDED:
      return {
        ...state,
        ...INITIAL_STATE,
        loading: false,
      };
    case LOGOUT_USER.FAILED:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    // REGISTER
    case REGISTER_USER.REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER.SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        clients: {},
        loading: false,
        error: undefined,
      };
    case REGISTER_USER.FAILED:
      return {
        ...state,
        error: action.payload.message,
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
