import { Action } from "redux";
import { IError, FETCH_MESSAGES, SEND_MESSAGE } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export type IMessagesActions =
  | IFetchMessagesRequested
  | IFetchMessagesSucceeded
  | IFetchMessagesFailed
  | ISendMessageRequested;

export interface IFetchMessagesRequested extends Action<FETCH_MESSAGES.REQUESTED> {}

export const fetchMessagesRequested = (): IFetchMessagesRequested => ({
  type: FETCH_MESSAGES.REQUESTED,
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

export interface ISendMessageRequested extends Action<SEND_MESSAGE.REQUESTED> {
  payload?: IStringMap<any>;
}

export const sendMessageRequested = (payload?: IStringMap<any>): ISendMessageRequested => ({
  type: SEND_MESSAGE.REQUESTED,
  payload,
});

export interface ISendMessageSucceeded extends Action<SEND_MESSAGE.SUCCEEDED> {
  payload?: any;
}

export const sendMessageSucceeded = (): ISendMessageSucceeded => {
  return {
    type: SEND_MESSAGE.SUCCEEDED,
  };
};

export interface ISendMessageFailed extends Action<SEND_MESSAGE.FAILED> {
  payload: IError;
}

export const sendMessageFailed = (error: IError): ISendMessageFailed => ({
  type: SEND_MESSAGE.FAILED,
  payload: error,
});
