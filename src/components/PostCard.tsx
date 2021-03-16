import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { Spacing, Color } from "../styles";
import { CommentModal } from "./CommentModal";

interface IPostCardProps {
  avatar?: string;
  name?: string;
  timestamp?: number;
  text?: string;
  image?: string;
}

interface ILocalState {
  commentModalVisible: boolean;
}

export function PostCard(props: IPostCardProps) {
  const [state, setState] = useState<ILocalState>({
    commentModalVisible: false,
  });

  const onMorePress = () => {};

  const onLikePress = () => {};

  const onCommentPress = () => {
    setState({ ...state, commentModalVisible: true });
  };

  return (
    <View style={styles.rootContainer}>
      <View style={{ flexDirection: "row" }}>
        {!!props.avatar && (
          <Image
            source={{ uri: props.avatar }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              marginRight: 16,
              marginLeft: Spacing.small,
            }}
          />
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.timestamp}>{moment(props.timestamp).fromNow()}</Text>
        </View>
        <TouchableOpacity style={{ marginRight: Spacing.small }} onPress={onMorePress}>
          <Ionicons name="ellipsis-horizontal" size={24} color={Color.white} />
        </TouchableOpacity>
      </View>
      {!!props.image && (
        <Image source={{ uri: props.image }} style={styles.postImage} resizeMode="cover" />
      )}
      {!!props.text && <Text style={styles.post}>{props.text}</Text>}
      <View style={{ flexDirection: "row", marginLeft: Spacing.small }}>
        <TouchableOpacity onPress={onLikePress}>
          <Ionicons
            name="heart-outline"
            size={24}
            color={Color.white}
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCommentPress}>
          <Ionicons name="chatbox-ellipses-outline" size={24} color={Color.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    borderRadius: 7,
    borderColor: Color.darkThemeGreyMed,
    borderWidth: 0.5,
    paddingVertical: Spacing.small,
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
    color: Color.white,
  },
  timestamp: {
    fontSize: 11,
    color: Color.white,
    marginTop: Spacing.xsmall,
    marginBottom: Spacing.small,
  },
  post: {
    fontSize: 14,
    color: Color.white,
    marginBottom: Spacing.small,
    marginLeft: Spacing.small,
  },
  postImage: {
    flex: 1,
    width: undefined,
    height: 150,
    marginBottom: Spacing.small,
  },
});
