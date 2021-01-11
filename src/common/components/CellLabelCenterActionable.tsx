import React, { Component } from "react";
import { Text, TouchableOpacity, StyleProp, ViewStyle, View } from "react-native";
import { Color, Spacing } from "../styles";
import CardSection from "./CardSection";
import Spinner from "./Spinner";

interface CellLabelCenterActionableProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default class CellLabelCenterActionable extends Component<CellLabelCenterActionableProps> {
  public render() {
    const { label, onPress, loading, disabled, style } = this.props;
    return (
      <View style={style}>
        {loading ? (
          <Spinner size={800} color={Color.white} />
        ) : (
          <CardSection style={{ backgroundColor: !disabled ? Color.primary : Color.secondary }}>
            <TouchableOpacity
              onPress={onPress}
              disabled={disabled || false}
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <Text
                style={{
                  flex: 1,
                  color: Color.greyLight,
                  textAlign: "center",
                  alignSelf: "center",
                  fontSize: 20,
                  paddingVertical: Spacing.small,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          </CardSection>
        )}
      </View>
    );
  }
}
