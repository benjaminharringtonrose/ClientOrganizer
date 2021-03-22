import { Action } from "redux";
import { FETCH_NOTIFICATIONS, IError } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export type INotificationsActions =
  | IFetchNotificationsRequested
  | IFetchNotificationsSucceeded
  | IFetchNotificationsFailed;

export interface IFetchNotificationsRequested extends Action<FETCH_NOTIFICATIONS.REQUESTED> {
  payload?: string;
}

export const fetchNotificationsRequested = (payload?: string): IFetchNotificationsRequested => ({
  type: FETCH_NOTIFICATIONS.REQUESTED,
  payload,
});

export interface IFetchNotificationsSucceeded extends Action<FETCH_NOTIFICATIONS.SUCCEEDED> {
  payload: IStringMap<any>;
}

export const fetchNotificationsSucceeded = (
  payload: IStringMap<any>
): IFetchNotificationsSucceeded => {
  return {
    type: FETCH_NOTIFICATIONS.SUCCEEDED,
    payload,
  };
};

export interface IFetchNotificationsFailed extends Action<FETCH_NOTIFICATIONS.FAILED> {
  payload: IError;
}

export const fetchNotificationsFailed = (error: IError): IFetchNotificationsFailed => ({
  type: FETCH_NOTIFICATIONS.FAILED,
  payload: error,
});
