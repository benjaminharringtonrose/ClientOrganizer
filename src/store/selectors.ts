import { createSelector } from "reselect";
import { IStoreState } from "./store";
import { NOTIFICATION } from "../api/PushNotifications";

const messagesSelector = (state: IStoreState) => state.messages.messages;

const notificationsSelector = (state: IStoreState) => state.notifications.notifications;

export const messageThreadSelector = createSelector(notificationsSelector, (item) => {
  item?.notificationType === NOTIFICATION.FRIEND_REQUEST;
});
