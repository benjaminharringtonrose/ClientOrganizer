import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

interface IPostCardProps {
  avatar?: string;
  name?: string;
  timestamp?: number;
  text?: string;
  image?: string;
}

export function PostCard(props: IPostCardProps) {
  return (
    <View style={styles.postContainer}>
      <Image source={{ uri: props.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.timestamp}>{moment(props.timestamp).fromNow()}</Text>
          </View>

          <Ionicons name="ellipsis-horizontal" size={24} color="#73788B" />
        </View>
        <Text style={styles.post}>{props.text}</Text>
        <Image source={{ uri: props.image }} style={styles.postImage} resizeMode="cover" />
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="heart-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
          <Ionicons name="chatbox-ellipses-outline" size={24} color="#73788B" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
