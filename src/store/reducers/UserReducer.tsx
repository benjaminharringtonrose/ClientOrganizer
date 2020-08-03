import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
  user: {
    firstName: "",
    lastName: "",
    avatar: undefined,
  },
};

const UserReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        password: "",
        loading: false,
      };
    default:
      return state;
  }
};

export default UserReducer;
