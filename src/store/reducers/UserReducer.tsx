import { SEARCH_TEXT_CHANGED } from "../actions/types";

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
    default:
      return state;
  }
};

export default UserReducer;
