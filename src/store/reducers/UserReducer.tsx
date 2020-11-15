import {
  SEARCH_TEXT_CHANGED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
  user: {
    searchText: undefined,
  },
};

const UserReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SEARCH_TEXT_CHANGED:
      return {
        ...state,
        searchText: action.payload,
      };
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        error: "Something Happened.",
        password: "",
        loading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
