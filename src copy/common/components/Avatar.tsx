import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  View,
} from "react-native";
import { Spacing } from "../styles/Spacing";
import { Color } from "../styles/Colors";
import CardSection from "./CardSection";
import Spinner from "./Spinner";

interface AvatarProps {
  uri?: string;
  size: number;
  color: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default class Avatar extends Component<AvatarProps> {
  public render() {
    const { size, color, loading, uri, style } = this.props;
    return (
      <View style={[style, styles.avatarContainer]}>
        {!loading ? (
          <Image source={{ uri }} style={styles.avatar} />
        ) : (
          <Spinner size={size} color={color} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: Color.white,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    borderRadius: 68,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
});
