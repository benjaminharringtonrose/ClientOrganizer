import { Action } from "redux";
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, IError } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export type IAuthActions =
  | ILoginUserSucceeded
  | ILoginUserFailed
  | ILogoutUserSucceeded
  | ILogoutUserFailed
  | IRegisterUserSucceeded
  | IRegisterUserFailed;

export interface ILoginUserSucceeded extends Action<LOGIN_USER.SUCCEEDED> {
  payload: IStringMap<any>;
}

export function loginUserSucceeded(payload: IStringMap<any>): ILoginUserSucceeded {
  return {
    type: LOGIN_USER.SUCCEEDED,
    payload,
  };
}

export interface ILoginUserFailed extends Action<LOGIN_USER.FAILED> {
  payload: IError;
}

export function loginUserFailed(payload: IError) {
  return {
    type: LOGIN_USER.FAILED,
    payload,
  };
}

export interface ILogoutUserSucceeded extends Action<LOGOUT_USER.SUCCEEDED> {}

export function logoutUserSucceeded() {
  return {
    type: LOGOUT_USER.SUCCEEDED,
  };
}

export interface ILogoutUserFailed extends Action<LOGOUT_USER.FAILED> {
  payload: IError;
}

export function logoutUserFailed(error: IError) {
  return {
    type: LOGOUT_USER.FAILED,
    payload: error,
  };
}

export interface IRegisterUserSucceeded extends Action<REGISTER_USER.SUCCEEDED> {
  payload: IStringMap<any>;
}

export function registerUserSucceeded(data: IStringMap<any>) {
  return {
    type: REGISTER_USER.SUCCEEDED,
    payload: data,
  };
}

export interface IRegisterUserFailed extends Action<REGISTER_USER.FAILED> {
  payload: IError;
}

export function registerUserFailed(error: IError) {
  return {
    type: REGISTER_USER.FAILED,
    payload: error,
  };
}
