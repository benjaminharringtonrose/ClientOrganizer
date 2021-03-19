import React from "react";
import { FriendRequestCard } from "./FriendRequestCard";
import { NOTIFICATION_TYPE } from "../api/PushNotifications";
import { IStringMap } from "../screens/RegisterScreen";

interface INotificationCardProps {
  notificationType?: NOTIFICATION_TYPE;
  avatar?: string;
  name?: string;
  message?: number;
  timestamp?: number;
  buttons?: IStringMap<any>[];
}

export function NotificationCard(props: INotificationCardProps) {
  switch (props.notificationType) {
    case NOTIFICATION_TYPE.FRIEND_REQUEST:
      return (
        <FriendRequestCard
          notificationType={props.notificationType}
          avatar={props.avatar}
          name={props.name}
          message={props.message}
          timestamp={props.timestamp}
          buttons={props.buttons}
        />
      );
    default:
      return null;
  }
}
