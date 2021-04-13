import { FETCH_NOTIFICATIONS, IError, TOAST_NOTIFICATION, NOTIFICATION_TYPE } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";
import { INotificationsActions } from "../actions";

export interface INotificationsState {
  readonly notifications?: any;
  readonly fetchNotificationsLoading: boolean;
  readonly fetchNotificationsError?: IError;
  readonly notificationType?: NOTIFICATION_TYPE;
  readonly text?: string;
  readonly notificationVisible: boolean;
}

const DefaultNotificationsState: INotificationsState = {
  notifications: undefined,
  fetchNotificationsLoading: false,
  fetchNotificationsError: undefined,
  notificationVisible: false,
  text: undefined,
  notificationType: undefined,
};

const NotificationsReducer = (
  state = DefaultNotificationsState,
  action: INotificationsActions
): INotificationsState => {
  switch (action.type) {
    // FETCH NOTIFICATIONS
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
        fetchNotificationsError: action.payload,
        fetchNotificationsLoading: false,
      };
    // TOAST
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

export default NotificationsReducer;
