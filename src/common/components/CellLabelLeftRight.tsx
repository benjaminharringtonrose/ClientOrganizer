import React, { Component } from "react";
import { Text, StyleProp, ViewStyle, View } from "react-native";
import { Color, Spacing } from "../styles";
import CardSection from "./CardSection";
import Spinner from "./Spinner";

interface CellLabelLeftRightProps {
  labelLeft?: string;
  labelRight?: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default class CellLabelLeftRight extends Component<CellLabelLeftRightProps> {
  public render() {
    const { labelLeft, labelRight, loading, style } = this.props;
    return (
      <View style={style}>
        {loading ? (
          <Spinner size={800} color={Color.white} />
        ) : (
          <CardSection style={{ paddingVertical: Spacing.small }}>
            <Text
              style={{
                flex: 1,
                color: Color.white,
                paddingLeft: Spacing.small,
                fontSize: 18,
              }}
            >
              {labelLeft}
            </Text>
            <Text style={{ color: Color.white, paddingRight: Spacing.small, fontSize: 18 }}>
              {labelRight}
            </Text>
          </CardSection>
        )}
      </View>
    );
  }
}
