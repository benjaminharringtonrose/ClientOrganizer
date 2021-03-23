import { Action } from "redux";
import { IError, FETCH_MESSAGES } from "../types";

export type INotificationsActions =
  | IFetchMessagesRequested
  | IFetchMessagesSucceeded
  | IFetchMessagesFailed;

export interface IFetchMessagesRequested extends Action<FETCH_MESSAGES.REQUESTED> {
  payload?: string;
}

export const fetchMessagesRequested = (payload?: string): IFetchMessagesRequested => ({
  type: FETCH_MESSAGES.REQUESTED,
  payload,
});

export interface IFetchMessagesSucceeded extends Action<FETCH_MESSAGES.SUCCEEDED> {
  payload?: any;
}

export const fetchMessagesSucceeded = (payload: any): IFetchMessagesSucceeded => {
  return {
    type: FETCH_MESSAGES.SUCCEEDED,
    payload,
  };
};

export interface IFetchMessagesFailed extends Action<FETCH_MESSAGES.FAILED> {
  payload: IError;
}

export const fetchMessagesFailed = (error: IError): IFetchMessagesFailed => ({
  type: FETCH_MESSAGES.FAILED,
  payload: error,
});
