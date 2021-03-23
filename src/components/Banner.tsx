import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";
import * as Animatable from "react-native-animatable";
import { Color, Spacing } from "../styles";

export interface IBannerProps extends ViewProps {
  onDismiss?: () => void;
  text: string;
}

class BannerComponent extends React.PureComponent<IBannerProps> {
  public render() {
    const { text, ...props } = this.props;
    return (
      <View
        {...props}
        style={{
          backgroundColor: Color.confirm,
          paddingTop: Spacing.xlarge,
          paddingBottom: Spacing.large,
        }}
      >
        <Text style={{ color: Color.white, textAlign: "center" }}>{text}</Text>
      </View>
    );
  }
}

export const Banner = Animatable.createAnimatableComponent(BannerComponent);
