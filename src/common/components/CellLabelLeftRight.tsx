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
          <CardSection>
            <Text style={{ flex: 1, color: Color.white, paddingLeft: Spacing.small }}>
              {labelLeft}
            </Text>
            <Text style={{ color: Color.white, paddingRight: Spacing.small }}>
              {labelRight}
            </Text>
          </CardSection>
        )}
      </View>
    );
  }
}
