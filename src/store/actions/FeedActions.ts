import { Action } from "redux";
import { FETCH_POSTS, IError, ADD_POST } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export type IFeedActions =
  | IFetchPostsRequested
  | IFetchPostsSucceeded
  | IFetchPostsFailed
  | IAddPostRequested
  | IAddPostSucceeded
  | IAddPostFailed;

export interface IFetchPostsRequested extends Action<FETCH_POSTS.REQUESTED> {}

export const fetchPostsRequested = (): IFetchPostsRequested => ({
  type: FETCH_POSTS.REQUESTED,
});

export interface IFetchPostsSucceeded extends Action<FETCH_POSTS.SUCCEEDED> {
  payload: any;
}

export const fetchPostsSucceeded = (data: IStringMap<any>): IFetchPostsSucceeded => ({
  type: FETCH_POSTS.SUCCEEDED,
  payload: data,
});

export interface IFetchPostsFailed extends Action<FETCH_POSTS.FAILED> {
  payload: IError;
}

export const fetchPostsFailed = (error: IError): IFetchPostsFailed => ({
  type: FETCH_POSTS.FAILED,
  payload: error,
});

export interface IAddPostRequested extends Action<ADD_POST.REQUESTED> {}

export const addPostRequested = (): IAddPostRequested => ({
  type: ADD_POST.REQUESTED,
});

export interface IAddPostSucceeded extends Action<ADD_POST.SUCCEEDED> {}

export const addPostSucceeded = (): IAddPostSucceeded => ({
  type: ADD_POST.SUCCEEDED,
});

export interface IAddPostFailed extends Action<ADD_POST.FAILED> {
  payload: IError;
}

export const addPostFailed = (error: any): IAddPostFailed => ({
  type: ADD_POST.FAILED,
  payload: error,
});
