import { FETCH_NOTIFICATIONS, IError } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export interface INotificationsState {
  readonly notifications?: IStringMap<any>;
  readonly fetchNotificationsLoading: boolean;
  readonly fetchNotificationsError?: IError;
}

const DefaultNotificaitonsState: INotificationsState = {
  notifications: undefined,
  fetchNotificationsLoading: false,
  fetchNotificationsError: undefined,
};

const NotificaitonsReducer = (state = DefaultNotificaitonsState, action: any) => {
  console.log(action);
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
    default:
      return state;
  }
};

export default NotificaitonsReducer;
