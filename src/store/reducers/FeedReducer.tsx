import { FETCH_POSTS } from "../actions/types";

const INITIAL_STATE = {
  posts: undefined,
  fetchPostsLoading: false,
  fetchPostsError: false,
};

const FeedReducer = (state = INITIAL_STATE, action: any) => {
  console.log(action);
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
