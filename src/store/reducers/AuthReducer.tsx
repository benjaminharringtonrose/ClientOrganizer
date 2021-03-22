import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "../types";
import { IError } from "../types";

export interface IAuthState {
  readonly avatar?: string;
  readonly uid: string;
  readonly authError?: IError;
  readonly authLoading: boolean;
}

export const DefaultAuthState: IAuthState = {
  avatar: undefined,
  uid: "",
  authError: undefined,
  authLoading: false,
};

// AUTH REDUCER

const AuthReducer = (state = DefaultAuthState, action: any) => {
  // console.log(action);
  switch (action.type) {
    // LOGIN
    case LOGIN_USER.REQUESTED:
      return {
        ...state,
        authLoading: true,
      };
    case LOGIN_USER.SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        authLoading: false,
        authError: undefined,
      };
    case LOGIN_USER.FAILED:
      return {
        ...state,
        authError: action.payload.message,
        authLoading: false,
      };
    // LOGOUT
    case LOGOUT_USER.REQUESTED:
      return {
        ...state,
        authLoading: true,
      };
    case LOGOUT_USER.SUCCEEDED:
      return {
        ...state,
        ...DefaultAuthState,
        authLoading: false,
      };
    case LOGOUT_USER.FAILED:
      return {
        ...state,
        authError: action.payload.message,
        authLoading: false,
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
        loading: false,
        authError: undefined,
      };
    case REGISTER_USER.FAILED:
      return {
        ...state,
        authError: action.payload.message,
        loading: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
