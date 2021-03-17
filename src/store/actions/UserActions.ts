import { Action } from "redux";
import { FETCH_USER, FETCH_ALL_USERS, IError } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export type IUserActions =
  | IFetchUserRequested
  | IFetchUserSucceeded
  | IFetchUserFailed
  | IFetchAllUsersRequested
  | IFetchAllUsersSucceeded
  | IFetchAllUsersFailed;

export interface IFetchUserRequested extends Action<FETCH_USER.REQUESTED> {
  payload: string;
}

export const fetchUserRequested = (payload: string): IFetchUserRequested => ({
  type: FETCH_USER.REQUESTED,
  payload,
});

export interface IFetchUserSucceeded extends Action<FETCH_USER.SUCCEEDED> {
  payload: IStringMap<any>;
}

export const fetchUserSucceeded = (payload: IStringMap<any>): IFetchUserSucceeded => {
  return {
    type: FETCH_USER.SUCCEEDED,
    payload,
  };
};

export interface IFetchUserFailed extends Action<FETCH_USER.FAILED> {
  payload: IError;
}

export const fetchUserFailed = (error: IError): IFetchUserFailed => ({
  type: FETCH_USER.FAILED,
  payload: error,
});

export interface IFetchAllUsersRequested extends Action<FETCH_ALL_USERS.REQUESTED> {}

export const fetchAllUsersRequested = (): IFetchAllUsersRequested => ({
  type: FETCH_ALL_USERS.REQUESTED,
});

export interface IFetchAllUsersSucceeded extends Action<FETCH_ALL_USERS.SUCCEEDED> {
  payload: IStringMap<any>;
}

export const fetchAllUsersSucceeded = (payload: IStringMap<any>): IFetchAllUsersSucceeded => ({
  type: FETCH_ALL_USERS.SUCCEEDED,
  payload,
});

export interface IFetchAllUsersFailed extends Action<FETCH_ALL_USERS.FAILED> {
  payload: IError;
}

export const fetchAllUsersFailed = (error: IError): IFetchAllUsersFailed => ({
  type: FETCH_ALL_USERS.FAILED,
  payload: error,
});
