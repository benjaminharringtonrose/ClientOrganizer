import { FETCH_USER, UPLOAD_PHOTO, ADD_POST } from "../actions/types";

const INITIAL_STATE = {
  searchText: undefined,
  user: undefined,
  fetchUserLoading: false,
  fetchUserError: undefined,
  uploadPhotoLoading: false,
  uploadPhotoError: undefined,
  addPostLoading: false,
  addPostError: undefined,
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
    case UPLOAD_PHOTO.REQUESTED:
      return {
        ...state,
        uploadPhotoLoading: true,
      };
    case UPLOAD_PHOTO.SUCCEEDED:
      return {
        ...state,
        uploadPhotoLoading: false,
      };
    case UPLOAD_PHOTO.FAILED:
      return {
        ...state,
        uploadPhotoError: action.payload.message,
        uploadPhotoLoading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
