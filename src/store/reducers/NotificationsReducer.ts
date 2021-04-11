import { FETCH_NOTIFICATIONS, IError, TOAST_NOTIFICATION, NOTIFICATION_TYPE } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export interface INotificationsState {
  readonly notifications?: any;
  readonly fetchNotificationsLoading: boolean;
  readonly fetchNotificationsError?: IError;
  readonly notificationType?: NOTIFICATION_TYPE;
  readonly text?: string;
  readonly notificationVisible: boolean;
}

const DefaultNotificaitonsState: INotificationsState = {
  notifications: undefined,
  fetchNotificationsLoading: false,
  fetchNotificationsError: undefined,
  notificationVisible: false,
  text: undefined,
  notificationType: undefined,
};

const NotificaitonsReducer = (state = DefaultNotificaitonsState, action: any) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS.REQUESTED:
      return {
        ...state,
        fetchNotificationsLoading: true,
      };
    case FETCH_NOTIFICATIONS.SUCCEEDED:
      return {
        ...state,
        notifications: action.payload,
        fetchNotificationsLoading: false,
      };
    case FETCH_NOTIFICATIONS.FAILED:
      return {
        ...state,
        fetchNotificationsError: action.payload.message,
        fetchNotificationsLoading: false,
      };
    case TOAST_NOTIFICATION.PUBLISH:
      return {
        ...state,
        notificationVisible: true,
        text: action.text,
        notificationType: action.notificationType,
      };
    case TOAST_NOTIFICATION.DISMISS:
      return {
        ...state,
        notificationVisible: false,
        text: undefined,
        notificationType: undefined,
      };
    default:
      return state;
  }
};

export default NotificaitonsReducer;
