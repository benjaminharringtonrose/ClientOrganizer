import { useState, useEffect } from "react";
import { mapPosts } from "../screens/util";

export function usePosts(props: {
  posts: any[];
  fetchPostsLoading?: boolean;
  fetchPostsError?: string;
}) {
  const [state, setState] = useState({
    posts: [],
  });
  useEffect(() => {
    if (!props.fetchPostsLoading && !props.fetchPostsError) {
      if (props.posts) {
        const mappedPosts = mapPosts(props.posts);
        setState({
          ...state,
          ...state.posts,
          posts: mappedPosts,
        });
      }
    }
  }, [props.posts, props.fetchPostsLoading, props.fetchPostsError]);
  return state.posts;
}
