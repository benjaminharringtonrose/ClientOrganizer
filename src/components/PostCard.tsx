import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { Spacing } from "../styles";

interface IPostCardProps {
  avatar?: string;
  name?: string;
  timestamp?: number;
  text?: string;
  image?: string;
}

export function PostCard(props: IPostCardProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        borderRadius: 5,
        paddingVertical: 8,
        marginVertical: 8,
      }}
    >
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
        <View style={{ marginRight: Spacing.small }}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#73788B" />
        </View>
      </View>
      {!!props.image && (
        <Image source={{ uri: props.image }} style={styles.postImage} resizeMode="cover" />
      )}
      {!!props.text && <Text style={styles.post}>{props.text}</Text>}
      <View style={{ flexDirection: "row", marginLeft: Spacing.small }}>
        <Ionicons name="heart-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
        <Ionicons name="chatbox-ellipses-outline" size={24} color="#73788B" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
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
    marginTop: Spacing.xsmall,
    marginBottom: Spacing.small,
  },
  post: {
    fontSize: 14,
    color: "#838899",
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
