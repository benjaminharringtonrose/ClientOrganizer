import {
  FETCH_USER,
  ADD_POST,
  UPLOAD_AVATAR,
  FETCH_ALL_USERS,
  IError,
  SET_USER_ID,
} from "../types";
import { IStringMap } from "../../screens/RegisterScreen";
import { IUserActions } from "../actions";

export interface IUserState {
  readonly uid?: string;
  readonly user?: IStringMap<any>;
  readonly users?: any;
  readonly fetchUserLoading: boolean;
  readonly fetchUserError?: IError;
  readonly fetchAllUsersLoading: boolean;
  readonly fetchAllUsersError?: IError;
  readonly addPostLoading: boolean;
  readonly addPostError?: IError;
  readonly uploadAvatarLoading: boolean;
  readonly uploadAvatarError?: IError;
}

const DefaultUserState: IUserState = {
  uid: undefined,
  user: undefined,
  users: undefined,
  fetchUserLoading: false,
  fetchUserError: undefined,
  fetchAllUsersLoading: false,
  fetchAllUsersError: undefined,
  addPostLoading: false,
  addPostError: undefined,
  uploadAvatarLoading: false,
  uploadAvatarError: undefined,
};

export const UserReducer = (state = DefaultUserState, action: IUserActions): IUserState => {
  switch (action.type) {
    case FETCH_USER.REQUESTED:
      return {
        ...state,
        fetchUserLoading: true,
      };
    case FETCH_USER.SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        fetchUserLoading: false,
      };
    case FETCH_USER.FAILED:
      return {
        ...state,
        fetchUserError: action.payload,
        fetchUserLoading: false,
      };
    case FETCH_ALL_USERS.REQUESTED:
      return {
        ...state,
        fetchAllUsersLoading: true,
      };
    case FETCH_ALL_USERS.SUCCEEDED:
      return {
        ...state,
        users: action.payload,
        fetchAllUsersLoading: false,
      };
    case FETCH_ALL_USERS.FAILED:
      return {
        ...state,
        fetchAllUsersError: action.payload,
        fetchAllUsersLoading: false,
      };
    case UPLOAD_AVATAR.REQUESTED:
      return {
        ...state,
        uploadAvatarLoading: true,
      };
    case UPLOAD_AVATAR.SUCCEEDED:
      return {
        ...state,
        uploadAvatarLoading: false,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };
    case UPLOAD_AVATAR.FAILED:
      return {
        ...state,
        uploadAvatarError: action.payload,
        uploadAvatarLoading: false,
      };
    case SET_USER_ID:
      return {
        ...state,
        uid: action.payload,
      };
    default:
      return state;
  }
};
