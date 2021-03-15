import { FETCH_POSTS, ADD_POST } from "../actions/types";

const INITIAL_STATE = {
  posts: undefined,
  fetchPostsLoading: false,
  fetchPostsError: undefined,
  addPostLoading: false,
  addPostError: undefined,
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
