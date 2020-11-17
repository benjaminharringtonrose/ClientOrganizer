import {
  SEARCH_TEXT_CHANGED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  DELETE_CLIENT,
} from "../actions/types";

const INITIAL_STATE = {
  user: {
    searchText: undefined,
    user: undefined,
    fetchUserLoading: false,
    fetchUserError: false,
    deleteClientLoading: false,
    deleteClientError: false,
  },
};

const UserReducer = (state = INITIAL_STATE, action: any) => {
  console.log(state, action);
  switch (action.type) {
    case SEARCH_TEXT_CHANGED:
      return {
        ...state,
        searchText: action.payload,
      };
    case FETCH_USER_REQUEST:
      return {
        ...state,
        fetchUserLoading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        fetchUserLoading: false,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        fetchUserError: "Something Happened.",
        password: "",
        fetchUserLoading: false,
      };
    case DELETE_CLIENT.REQUESTED:
      return {
        ...state,
        deleteClientLoading: true,
      };
    case DELETE_CLIENT.SUCCEEDED:
      return {
        ...state,
        deleteClientLoading: false,
      };
    case DELETE_CLIENT.FAILED:
      return {
        ...state,
        deleteClientLoading: false,
        deleteClientError: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
