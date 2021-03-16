import { FETCH_POSTS, ADD_POST, ADD_FRIEND, DELETE_FRIEND } from "../types";

const INITIAL_STATE = {
  friends: undefined,
  addFriendLoading: false,
  addFriendError: undefined,
  deleteFriendLoading: false,
  deleteFriendError: undefined,
};

const FriendReducer = (state = INITIAL_STATE, action: any) => {
  console.log(action);
  switch (action.type) {
    case ADD_FRIEND.REQUESTED:
      return {
        ...state,
        addFriendLoading: true,
      };
    case ADD_FRIEND.SUCCEEDED:
      return {
        ...state,
        addFriendLoading: false,
      };
    case ADD_FRIEND.FAILED:
      return {
        ...state,
        deleteFriendLoading: false,
        deleteFriendError: action.payload.message,
      };
    case DELETE_FRIEND.REQUESTED:
      return {
        ...state,
        deleteFriendLoading: true,
      };
    case DELETE_FRIEND.SUCCEEDED:
      return {
        ...state,
        deleteFriendLoading: false,
      };
    case DELETE_FRIEND.FAILED:
      return {
        ...state,
        deleteFriendLoading: false,
        deleteFriendError: action.payload.message,
      };
    default:
      return state;
  }
};

export default FriendReducer;
