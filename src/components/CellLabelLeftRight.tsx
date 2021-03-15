import React, { Component } from "react";
import { Text, StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { Color, Spacing } from "../styles";
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
      <View style={[styles.rootContainer, style]}>
        {loading ? (
          <Spinner size={800} color={Color.white} />
        ) : (
          <>
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
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 45,
    backgroundColor: Color.darkThemeGreyMed,
    borderRadius: 5,
    paddingVertical: Spacing.xsmall,
  },
});
