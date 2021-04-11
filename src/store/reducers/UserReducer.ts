import {
  FETCH_USER,
  ADD_POST,
  UPLOAD_AVATAR,
  FETCH_ALL_USERS,
  IError,
  SET_USER_ID,
} from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export interface IUserState {
  readonly uid?: string;
  readonly user?: IStringMap<any>;
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
  fetchUserLoading: false,
  fetchUserError: undefined,
  fetchAllUsersLoading: false,
  fetchAllUsersError: undefined,
  addPostLoading: false,
  addPostError: undefined,
  uploadAvatarLoading: false,
  uploadAvatarError: undefined,
};

const UserReducer = (state = DefaultUserState, action: any) => {
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
        fetchUserError: action.payload.message,
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
        fetchAllUsersError: action.payload.message,
        fetchAllUsersLoading: false,
      };
    case ADD_POST.REQUESTED:
      return {
        ...state,
        addPostLoading: true,
      };
    case ADD_POST.SUCCEEDED:
      return {
        ...state,
        addPostLoading: false,
      };
    case ADD_POST.FAILED:
      return {
        ...state,
        addPostError: action.payload.message,
        addPostLoading: false,
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
        uploadAvatarError: action.payload.message,
        uploadAvatarLoading: false,
      };
    case SET_USER_ID.SET:
      return {
        ...state,
        uid: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
