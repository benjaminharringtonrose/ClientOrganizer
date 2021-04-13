import { FETCH_POSTS, IError, ADD_POST } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";
import { IFeedActions } from "../actions";

export interface IFeedState {
  readonly posts?: IStringMap<any>;
  readonly fetchPostsLoading: boolean;
  readonly fetchPostsError?: IError;
  readonly addPostLoading: boolean;
  readonly addPostError?: IError;
}

export const DefaultFeedState: IFeedState = {
  posts: undefined,
  fetchPostsLoading: false,
  fetchPostsError: undefined,
  addPostLoading: false,
  addPostError: undefined,
};

const FeedReducer = (state = DefaultFeedState, action: IFeedActions) => {
  switch (action.type) {
    // FETCH POSTS
    case FETCH_POSTS.REQUESTED:
      return {
        ...state,
        fetchPostsLoading: true,
      };
    case FETCH_POSTS.SUCCEEDED:
      return {
        ...state,
        posts: action.payload,
        fetchPostsLoading: false,
      };
    case FETCH_POSTS.FAILED:
      return {
        ...state,
        fetchPostsError: action.payload.message,
        fetchPostsLoading: false,
      };
    // ADD POSTS
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
    default:
      return state;
  }
};

export default FeedReducer;
