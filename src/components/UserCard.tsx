import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { Spacing, Color } from "../styles";
import { CommentModal } from "./CommentModal";

interface IPostCardProps {
  avatar?: string;
  name?: string;
  bio?: number;
  icon?: "ellipsis-horizontal";
  onPress?: () => void;
}

interface ILocalState {
  commentModalVisible: boolean;
}

export function UserCard(props: IPostCardProps) {
  const [state, setState] = useState<ILocalState>({
    commentModalVisible: false,
  });

  return (
    <View style={styles.rootContainer}>
      <View style={{ flexDirection: "row" }}>
        {props.avatar ? (
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
        ) : (
          <View style={{ paddingHorizontal: Spacing.small }}>
            <Ionicons name={"person-circle"} color={Color.white} size={30} />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.timestamp}>{props.bio}</Text>
        </View>
        <TouchableOpacity style={{ marginRight: Spacing.small }} onPress={props.onPress}>
          <Ionicons name={props.icon} size={24} color={Color.white} />
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
