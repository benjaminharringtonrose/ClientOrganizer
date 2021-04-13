import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "../types";
import { IError } from "../types";
import { IAuthActions } from "../actions";

export interface IAuthState {
  readonly user?: any;
  readonly avatar?: string;
  readonly uid: string;
  readonly loginError?: IError;
  readonly loginLoading: boolean;
  readonly logoutError?: IError;
  readonly logoutLoading: boolean;
  readonly registerLoading: boolean;
  readonly registerError?: IError;
}

export const DefaultAuthState: IAuthState = {
  user: undefined,
  avatar: undefined,
  uid: "",
  loginError: undefined,
  loginLoading: false,
  logoutError: undefined,
  logoutLoading: false,
  registerLoading: false,
  registerError: undefined,
};

export const AuthReducer = (state = DefaultAuthState, action: IAuthActions): IAuthState => {
  switch (action.type) {
    // LOGIN
    case LOGIN_USER.REQUESTED:
      return {
        ...state,
        loginLoading: true,
      };
    case LOGIN_USER.SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        loginLoading: false,
        loginError: undefined,
      };
    case LOGIN_USER.FAILED:
      return {
        ...state,
        loginError: action.payload,
        loginLoading: false,
      };
    // LOGOUT
    case LOGOUT_USER.REQUESTED:
      return {
        ...state,
        logoutLoading: true,
      };
    case LOGOUT_USER.SUCCEEDED:
      return {
        ...state,
        ...DefaultAuthState,
        logoutLoading: false,
      };
    case LOGOUT_USER.FAILED:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.payload,
      };
    // REGISTER
    case REGISTER_USER.REQUESTED:
      return {
        ...state,
        registerLoading: true,
      };
    case REGISTER_USER.SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        registerLoading: false,
        registerError: undefined,
      };
    case REGISTER_USER.FAILED:
      return {
        ...state,
        registerLoading: false,
        registerError: action.payload,
      };
    default:
      return state;
  }
};
