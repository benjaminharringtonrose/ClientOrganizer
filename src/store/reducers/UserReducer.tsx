import {
  SEARCH_TEXT_CHANGED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
  user: {
    searchText: undefined,
    user: undefined,
    fetchUserLoading: false,
    fetchUserError: false,
  },
};

const StateReducer = (state = INITIAL_STATE, action: any) => {
  // console.log(state, action);
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
    default:
      return state;
  }
};

export default StateReducer;
