import { FETCH_USER, ADD_POST, UPLOAD_AVATAR } from "../types";

const INITIAL_STATE = {
  searchText: undefined,
  user: undefined,
  fetchUserLoading: false,
  fetchUserError: undefined,
  addPostLoading: false,
  addPostError: undefined,
  uploadAvatarLoading: false,
  uploadAvatarError: undefined,
};

const UserReducer = (state = INITIAL_STATE, action: any) => {
  console.log(action);
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
        password: "",
        fetchUserLoading: false,
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
      };
    case UPLOAD_AVATAR.FAILED:
      return {
        ...state,
        uploadAvatarError: action.payload.message,
        uploadAvatarLoading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
