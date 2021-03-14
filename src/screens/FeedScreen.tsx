import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { connect } from "react-redux";
require("firebase/firestore");
import { FETCH_POSTS } from "../store/actions/types";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  posts: any;
  fetchPostsLoading: boolean;
  fetchPostsError?: string;
}

interface IDispatchFromState {
  dispatchFetchPosts: () => void;
}

interface ILocalState {
  refreshing: boolean;
}

type IFeedScreenProps = IPropsFromState & IDispatchFromState & IPassedProps;

function FeedScreen(props: IFeedScreenProps) {
  const [state, setState] = useState<ILocalState>({
    refreshing: false,
  });

  useEffect(() => {
    props.dispatchFetchPosts();
  }, []);

  const renderPost = (post: any) => {
    if (post) {
      return (
        <View style={styles.postContainer}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={styles.name}>{post.name}</Text>
                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
              </View>

              <Ionicons name="ellipsis-horizontal" size={24} color="#73788B" />
            </View>
            <Text style={styles.post}>{post.text}</Text>
            <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
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
  };

  function refreshControl() {
    return (
      <RefreshControl refreshing={props.fetchPostsLoading} onRefresh={() => refreshListView()} />
    );
  }
  function refreshListView() {
    //Start Rendering Spinner
    setState({ ...state, refreshing: true });
    props.dispatchFetchPosts();

    setState({ ...state, refreshing: false }); //Stop Rendering Spinner
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>
      <FlatList
        style={styles.feed}
        data={props.posts}
        renderItem={({ item }: any) => renderPost(item)}
        keyExtractor={(item) => String(item.timestamp)}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl()}
      ></FlatList>
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
  // console.log("STATE", state);
  return {
    posts: state.feed.posts,
    fetchPostsLoading: state.feed.fetchUserLoading,
    fetchPostsError: state.feed.fetchUserError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchPosts: () => dispatch({ type: FETCH_POSTS.REQUESTED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
