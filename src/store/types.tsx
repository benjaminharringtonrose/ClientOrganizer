import { NOTIFICATION } from "../api/PushNotifications";
import { IStringMap } from "../screens/RegisterScreen";

export interface IError {
  message: string;
  code?: number;
  stack?: any;
  description?: string;
  type?: string;
  remediation?: string;
  request?: any;
  response?: any;
}

export interface IPost {
  avatar: string;
  firstName: string;
  lastName: string;
  timestamp: number;
  text: string;
  image?: string;
}

export interface IFriendRequest {
  notificationType: NOTIFICATION.FRIEND_REQUEST;
  theirUid: string;
  theirPushToken: IStringMap<any>;
  firstName: string;
  lastName: string;
  avatar: string;
}

export type RouteProp<ParamList extends any, RouteName extends keyof ParamList> = any;

export enum LOGIN_USER {
  REQUESTED = "LOGIN_USER_REQUESTED",
  SUCCEEDED = "LOGIN_USER_SUCCEEDED",
  FAILED = "LOGIN_USER_FAILED",
}

export enum LOGOUT_USER {
  REQUESTED = "LOGOUT_USER_REQUESTED",
  SUCCEEDED = "LOGOUT_USER_SUCCEEDED",
  FAILED = "LOGOUT_USER_FAILED",
}

export enum REGISTER_USER {
  REQUESTED = "REGISTER_USER_REQUESTED",
  SUCCEEDED = "REGISTER_USER_SUCCEEDED",
  FAILED = "REGISTER_USER_FAILED",
}

export enum FETCH_USER {
  REQUESTED = "FETCH_USER_REQUESTED",
  SUCCEEDED = "FETCH_USER_SUCCEEDED",
  FAILED = "FETCH_USER_FAILED",
}

export enum FETCH_ALL_USERS {
  REQUESTED = "FETCH_ALL_USERS_REQUESTED",
  SUCCEEDED = "FETCH_ALL_USERS_SUCCEEDED",
  FAILED = "FETCH_ALL_USERS_FAILED",
}

export enum DELETE_CLIENT {
  REQUESTED = "DELETE_CLIENT_REQUESTED",
  SUCCEEDED = "DELETE_CLIENT_SUCCEEDED",
  FAILED = "DELETE_CLIENT_FAILED",
}

export enum UPDATE_CLIENT {
  REQUESTED = "UPDATE_CLIENT_REQUESTED",
  SUCCEEDED = "UPDATE_CLIENT_SUCCEEDED",
  FAILED = "UPDATE_CLIENT_FAILED",
}

export enum ADD_CLIENT {
  REQUESTED = "ADD_CLIENT_REQUESTED",
  SUCCEEDED = "ADD_CLIENT_SUCCEEDED",
  FAILED = "ADD_CLIENT_FAILED",
}

export enum FETCH_POSTS {
  REQUESTED = "FETCH_POSTS_REQUESTED",
  SUCCEEDED = "FETCH_POSTS_SUCCEEDED",
  FAILED = "FETCH_POSTS_FAILED",
}

export enum ADD_POST {
  REQUESTED = "ADD_POST_REQUESTED",
  SUCCEEDED = "ADD_POST_SUCCEEDED",
  FAILED = "ADD_POST_FAILED",
}

export enum UPLOAD_AVATAR {
  REQUESTED = "UPLOAD_AVATAR_REQUESTED",
  SUCCEEDED = "UPLOAD_AVATAR_SUCCEEDED",
  FAILED = "UPLOAD_AVATAR_FAILED",
}

export enum ADD_FRIEND {
  REQUESTED = "ADD_FRIEND_REQUESTED",
  SUCCEEDED = "ADD_FRIEND_SUCCEEDED",
  FAILED = "ADD_FRIEND_FAILED",
}

export enum DELETE_FRIEND {
  REQUESTED = "DELETE_FRIEND_REQUESTED",
  SUCCEEDED = "DELETE_FRIEND_SUCCEEDED",
  FAILED = "DELETE_FRIEND_FAILED",
}

export enum FETCH_ALL_FRIENDS {
  REQUESTED = "FETCH_ALL_FRIENDS_REQUESTED",
  SUCCEEDED = "FETCH_ALL_FRIENDS_SUCCEEDED",
  FAILED = "FETCH_ALL_FRIENDS_FAILED",
}

export const SET_USER_ID = "SET_USER_ID";

export enum FETCH_MESSAGES {
  REQUESTED = "FETCH_MESSAGES_REQUESTED",
  SUCCEEDED = "FETCH_MESSAGES_SUCCEEDED",
  FAILED = "FETCH_MESSAGES_FAILED",
}

export enum FETCH_THREADS {
  REQUESTED = "FETCH_THREADS_REQUESTED",
  SUCCEEDED = "FETCH_THREADS_SUCCEEDED",
  FAILED = "FETCH_THREADS_FAILED",
}

export enum SEND_MESSAGE {
  REQUESTED = "SEND_MESSAGE_REQUEST",
  SUCCEEDED = "SEND_MESSAGE_SUCCEEDED",
  FAILED = "SEND_MESSAGE_FAILED",
}

export enum SEND_FRIEND_REQUEST {
  SENT = "SEND_FRIEND_REQUEST_SENT",
}

export enum NOTIFICATION_TYPE {
  SUCCESS = "NOTIFICATION_TYPE_SUCCESS",
  ERROR = "NOTIFICATION_TYPE_ERROR",
}

export enum TOAST_NOTIFICATION {
  PUBLISH = "TOAST_NOTIFICATION_PUBLISH",
  DISMISS = "TOAST_NOTIFICATION_DISMISS",
}

export enum FETCH_NOTIFICATIONS {
  REQUESTED = "FETCH_NOTIFICATIONS_REQUESTED",
  SUCCEEDED = "FETCH_NOTIFICATIONS_SUCCEEDED",
  FAILED = "FETCH_NOTIFICATIONSS_FAILED",
}
