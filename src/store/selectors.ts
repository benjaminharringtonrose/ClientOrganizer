import { createSelector } from "reselect";
import { IStoreState } from "./store";

const userSelector = (state: IStoreState) => state;

const notificationsSelector = (state: IStoreState) => state.notifications.notifications;

const orderedNotificationsSelector = createSelector(userSelector, (item) => item);
