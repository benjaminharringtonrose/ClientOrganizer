import { FETCH_POSTS, IError } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export interface IFeedState {
  readonly posts?: IStringMap<any>;
  readonly fetchPostsLoading: boolean;
  readonly fetchPostsError?: IError;
}

export const DefaultFeedState: IFeedState = {
  posts: undefined,
  fetchPostsLoading: false,
  fetchPostsError: undefined,
};

const FeedReducer = (state = DefaultFeedState, action: any) => {
  // console.log(action);
  switch (action.type) {
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
    default:
      return state;
  }
};

export default FeedReducer;
