import { ADD_FRIEND, DELETE_FRIEND, IError, SEND_FRIEND_REQUEST } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";
import { IFriendsActions } from "../actions";

export interface IFriendsState {
  readonly friendRequests?: IStringMap<any>;
  readonly friends?: IStringMap<any>;
  readonly addFriendLoading: boolean;
  readonly addFriendError?: IError;
  readonly deleteFriendLoading: boolean;
  readonly deleteFriendError?: IError;
}

export const DefaultFriendsState: IFriendsState = {
  friendRequests: undefined,
  friends: undefined,
  addFriendLoading: false,
  addFriendError: undefined,
  deleteFriendLoading: false,
  deleteFriendError: undefined,
};

export const FriendsReducer = (
  state = DefaultFriendsState,
  action: IFriendsActions
): IFriendsState => {
  switch (action.type) {
    // ADD FRIEND
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
    // DELETE FRIEND
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
        deleteFriendError: action.payload,
      };
    default:
      return state;
  }
};
