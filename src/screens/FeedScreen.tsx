import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { connect } from "react-redux";
require("firebase/firestore");
import { FETCH_POSTS, FETCH_USER } from "../store/actions/types";
import { usePosts } from "../hooks/usePosts";
import firebase from "firebase";

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
        <View style={styles.postContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.timestamp}>{moment(item.timestamp).fromNow()}</Text>
              </View>

              <Ionicons name="ellipsis-horizontal" size={24} color="#73788B" />
            </View>
            <Text style={styles.post}>{item.text}</Text>
            <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="cover" />
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="heart-outline"
                size={24}
                color="#73788B"
                style={{ marginRight: 16 }}
              />
              <Ionicons name="chatbox-ellipses-outline" size={24} color="#73788B" />
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  function refreshControl() {
    return (
      <RefreshControl
        refreshing={props.fetchPostsLoading}
        onRefresh={() => props.dispatchFetchPosts()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>
      <FlatList
        style={styles.feed}
        data={props.posts}
        renderItem={renderPost}
        keyExtractor={(item) => String(item.timestamp)}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl()}
      />
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  postContainer: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
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
