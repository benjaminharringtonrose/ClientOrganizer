import { Action } from "redux";
import { FETCH_NOTIFICATIONS, IError, NOTIFICATION_TYPE, TOAST_NOTIFICATION } from "../types";
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
  payload?: any;
}

export const fetchNotificationsSucceeded = (payload: any): IFetchNotificationsSucceeded => {
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

export interface IPublishToastNotification extends Action<typeof TOAST_NOTIFICATION.PUBLISH> {
  notificationType: NOTIFICATION_TYPE;
  text: string;
}

export const publishToast = (
  notificationType: NOTIFICATION_TYPE,
  text: string
): IPublishToastNotification => ({
  type: TOAST_NOTIFICATION.PUBLISH,
  notificationType,
  text,
});

export interface IDismissToastNotification extends Action<typeof TOAST_NOTIFICATION.DISMISS> {}

export const dismissToast = (): IDismissToastNotification => ({
  type: TOAST_NOTIFICATION.DISMISS,
});
