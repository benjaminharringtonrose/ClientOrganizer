import { Action } from "redux";
import { FETCH_USER, FETCH_ALL_USERS, IError, SET_USER_ID, UPLOAD_AVATAR } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export type IUserActions =
  | IFetchUserRequested
  | IFetchUserSucceeded
  | IFetchUserFailed
  | IFetchAllUsersRequested
  | IFetchAllUsersSucceeded
  | IFetchAllUsersFailed
  | IUploadAvatarRequested
  | IUploadAvatarSucceeded
  | IUploadAvatarFailed
  | ISetUserId;

// FETCH USER

export interface IFetchUserRequested extends Action<FETCH_USER.REQUESTED> {
  payload?: string;
}

export const fetchUserRequested = (payload?: string): IFetchUserRequested => ({
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

// FETCH ALL USERS

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

// SET UID

export interface ISetUserId extends Action<typeof SET_USER_ID> {
  payload?: string;
}

export const setUserId = (payload?: string): ISetUserId => ({
  type: SET_USER_ID,
  payload,
});

// UPLOAD AVATAR

export interface IUploadAvatarRequested extends Action<UPLOAD_AVATAR.REQUESTED> {}

export const uploadAvatarRequested = (): IUploadAvatarRequested => ({
  type: UPLOAD_AVATAR.REQUESTED,
});

export interface IUploadAvatarSucceeded extends Action<UPLOAD_AVATAR.SUCCEEDED> {
  payload: string;
}

export const uploadAvatarSucceeded = (avatarUri: string): IUploadAvatarSucceeded => ({
  type: UPLOAD_AVATAR.SUCCEEDED,
  payload: avatarUri,
});

export interface IUploadAvatarFailed extends Action<UPLOAD_AVATAR.FAILED> {
  payload: IError;
}

export const uploadAvatarFailed = (error: any): IUploadAvatarFailed => ({
  type: UPLOAD_AVATAR.FAILED,
  payload: error,
});
