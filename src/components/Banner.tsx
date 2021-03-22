import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";
import * as Animatable from "react-native-animatable";

export interface IBannerProps extends ViewProps {
  onDismiss?: () => void;
  text: string;
}

class BannerComponent extends React.PureComponent<IBannerProps> {
  public render() {
    const { text, ...props } = this.props;
    return (
      <View {...props} style={{ backgroundColor: "green" }}>
        <Text>{text}</Text>
      </View>
    );
  }
}

export const Banner = Animatable.createAnimatableComponent(BannerComponent);
