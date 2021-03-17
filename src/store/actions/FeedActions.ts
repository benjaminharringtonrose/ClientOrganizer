import { FETCH_POSTS } from "../types";

// FETCH POSTS - ACTIONS
export function fetchPostsRequested() {
  return {
    type: FETCH_POSTS.REQUESTED,
  };
}

export function fetchPostsSucceeded(data: any) {
  return {
    type: FETCH_POSTS.SUCCEEDED,
    payload: data,
  };
}
export function fetchPostsFailed(error: any) {
  return {
    type: FETCH_POSTS.FAILED,
    payload: error,
  };
}
