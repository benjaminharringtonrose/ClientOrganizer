import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, StatusBar } from "react-native";
import { connect } from "react-redux";
require("firebase/firestore");
import { FETCH_POSTS, FETCH_USER } from "../store/actions/types";
import firebase from "firebase";
import { PostCard } from "../components/PostCard";
import { Color, Spacing } from "../styles";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  posts: any;
  fetchPostsLoading: boolean;
  fetchPostsError?: string;
}

interface IDispatchFromState {
  dispatchFetchUser: (uid: string) => any;
  dispatchFetchPosts: () => void;
}

interface ILocalState {}

type IFeedScreenProps = IPropsFromState & IDispatchFromState & IPassedProps;

function FeedScreen(props: IFeedScreenProps) {
  useEffect(() => {
    props.dispatchFetchPosts();
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      props.dispatchFetchUser(uid);
    }
  }, []);

  const renderPost = ({ item }: any) => {
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
  };

  function refreshControl() {
    return (
      <RefreshControl
        refreshing={props.fetchPostsLoading}
        onRefresh={() => props.dispatchFetchPosts()}
        tintColor={Color.white}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>
      <FlatList
        data={props.posts}
        renderItem={renderPost}
        keyExtractor={(item) => String(item.timestamp)}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl()}
        // style={{ marginHorizontal: Spacing.micro }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyMed,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: Color.darkThemeGreyDark,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Color.darkThemeGreyMed,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: Color.white,
  },
});

const mapStateToProps = (state: any) => {
  console.log("STATE", state.feed);
  return {
    posts: state.feed.posts,
    fetchPostsLoading: state.feed.fetchPostsLoading || false,
    fetchPostsError: state.feed.fetchPostsError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: any) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchFetchPosts: () => dispatch({ type: FETCH_POSTS.REQUESTED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
