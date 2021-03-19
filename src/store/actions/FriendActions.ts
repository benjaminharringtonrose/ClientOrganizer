import { Action } from "redux";
import {
  FETCH_ALL_FRIENDS,
  ADD_FRIEND,
  DELETE_FRIEND,
  IError,
  SEND_FRIEND_REQUEST,
} from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export type IFriendActions =
  | IAddFriendSucceeded
  | IAddFriendFailed
  | IFetchAllFriendsSucceeded
  | IFetchAllFriendsFailed
  | IDeleteFriendSucceeded
  | IDeleteFriendFailed;

export interface IAddFriendSucceeded extends Action<ADD_FRIEND.SUCCEEDED> {}

export const addFriendSucceeded = (): IAddFriendSucceeded => ({
  type: ADD_FRIEND.SUCCEEDED,
});

export interface IAddFriendFailed extends Action<ADD_FRIEND.FAILED> {
  payload: IStringMap<any>;
}

export const addFriendFailed = (error: IError): IAddFriendFailed => ({
  type: ADD_FRIEND.FAILED,
  payload: error,
});

export interface IFetchAllFriendsSucceeded extends Action<FETCH_ALL_FRIENDS.SUCCEEDED> {}

export const fetchAllFriendsSucceeded = (): IFetchAllFriendsSucceeded => ({
  type: FETCH_ALL_FRIENDS.SUCCEEDED,
});

export interface IFetchAllFriendsFailed extends Action<FETCH_ALL_FRIENDS.FAILED> {
  payload: IError;
}

export const fetchAllFriendsFailed = (error: IError): IFetchAllFriendsFailed => ({
  type: FETCH_ALL_FRIENDS.FAILED,
  payload: error,
});

export interface IDeleteFriendSucceeded extends Action<DELETE_FRIEND.SUCCEEDED> {}

export const deleteFriendSucceeded = (): IDeleteFriendSucceeded => ({
  type: DELETE_FRIEND.SUCCEEDED,
});

export interface IDeleteFriendFailed extends Action<DELETE_FRIEND.FAILED> {
  payload: IError;
}

export const deleteFriendFailed = (error: IError): IDeleteFriendFailed => ({
  type: DELETE_FRIEND.FAILED,
  payload: error,
});

export interface ISendFriendRequest extends Action<SEND_FRIEND_REQUEST.SENT> {
  payload: IStringMap<any>;
}

export const sendFriendRequest = (payload: IStringMap<any>): ISendFriendRequest => ({
  type: SEND_FRIEND_REQUEST.SENT,
  payload,
});
