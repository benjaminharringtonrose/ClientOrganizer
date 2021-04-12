import React, { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { FETCH_POSTS, FETCH_USER, FETCH_ALL_USERS, IError } from "../store/types";
import { Header, ScreenContainer, PostCard } from "../components";
import { Color, TextStyles, ViewStyles } from "../styles";
import { IStoreState } from "../store/store";
import { getAndSetDevicePushToken } from "../store/sagas";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  posts?: any;
  fetchPostsLoading: boolean;
  fetchPostsError?: IError;
}

interface IDispatchFromState {
  dispatchFetchUser: (uid: string) => void;
  dispatchFetchAllUsers: () => void;
  dispatchFetchPosts: () => void;
}

type IFeedScreenProps = IPropsFromState & IDispatchFromState & IPassedProps;

function FeedScreen(props: IFeedScreenProps) {
  useEffect(() => {
    props.navigation.setOptions({
      title: "Feed",
    });
    props.dispatchFetchPosts();
    props.dispatchFetchAllUsers();
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      props.dispatchFetchUser(uid);
    }

    getAndSetDevicePushToken();
  }, []);

  function refreshControl() {
    return (
      <RefreshControl
        refreshing={props.fetchPostsLoading}
        onRefresh={() => {
          props.dispatchFetchPosts();
          const uid = firebase.auth().currentUser?.uid;
          if (uid) {
            props.dispatchFetchUser(uid);
          }
        }}
        tintColor={Color.white}
      />
    );
  }

  return (
    <ScreenContainer>
      <FlatList
        data={props.posts}
        renderItem={({ item }) => {
          if (item) {
            return (
              <PostCard
                avatar={item.avatar}
                name={`${item.firstName} ${item.lastName}`}
                timestamp={item.timestamp}
                text={item.text}
                image={item.image}
              />
            );
          }
          return null;
        }}
        keyExtractor={(item) => String(item.timestamp)}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl()}
      />
    </ScreenContainer>
  );
}

const mapStateToProps = (state: IStoreState) => {
  return {
    posts: state.feed.posts,
    fetchPostsLoading: state.feed.fetchPostsLoading || false,
    fetchPostsError: state.feed.fetchPostsError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: string) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchFetchAllUsers: () => dispatch({ type: FETCH_ALL_USERS.REQUESTED }),
  dispatchFetchPosts: () => dispatch({ type: FETCH_POSTS.REQUESTED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
