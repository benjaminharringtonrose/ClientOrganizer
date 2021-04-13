import { Action } from "redux";
import {
  FETCH_ALL_FRIENDS,
  ADD_FRIEND,
  DELETE_FRIEND,
  IError,
  SEND_FRIEND_REQUEST,
} from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export type IFriendsActions =
  | IAddFriendRequested
  | IAddFriendSucceeded
  | IAddFriendFailed
  | IFetchAllFriendsSucceeded
  | IFetchAllFriendsFailed
  | IDeleteFriendRequested
  | IDeleteFriendSucceeded
  | IDeleteFriendFailed
  | ISendFriendRequest;

// ADD FRIEND

export interface IAddFriendRequested extends Action<ADD_FRIEND.REQUESTED> {
  payload?: string;
}

export const addFriendRequested = (payload?: string): IAddFriendRequested => ({
  type: ADD_FRIEND.REQUESTED,
  payload,
});

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

// FETCH ALL FRIENDS

export interface IFetchAllFriendsRequested extends Action<FETCH_ALL_FRIENDS.REQUESTED> {}

export const fetchAllFriendsRequested = (payload?: string): IFetchAllFriendsRequested => ({
  type: FETCH_ALL_FRIENDS.REQUESTED,
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

// DELETE FRIEND

export interface IDeleteFriendRequested extends Action<DELETE_FRIEND.REQUESTED> {
  payload?: string;
}

export const deleteFriendRequested = (id?: string): IDeleteFriendRequested => ({
  type: DELETE_FRIEND.REQUESTED,
  payload: id,
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

export interface ISendFriendRequest extends Action<typeof SEND_FRIEND_REQUEST> {
  payload: IStringMap<any>;
}

export const sendFriendRequest = (payload: IStringMap<any>): ISendFriendRequest => ({
  type: SEND_FRIEND_REQUEST,
  payload,
});
