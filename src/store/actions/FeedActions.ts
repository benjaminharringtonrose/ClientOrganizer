import { Action } from "redux";
import { FETCH_POSTS, IError } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export type IFeedActions = IFetchPostsRequested | IFetchPostsSucceeded | IFetchPostsFailed;

export interface IFetchPostsRequested extends Action<FETCH_POSTS.REQUESTED> {}

export const fetchPostsRequested = (): IFetchPostsRequested => ({
  type: FETCH_POSTS.REQUESTED,
});

export interface IFetchPostsSucceeded extends Action<FETCH_POSTS.SUCCEEDED> {
  payload: any;
}

export const fetchPostsSucceeded = (data: IStringMap<any>) => ({
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
