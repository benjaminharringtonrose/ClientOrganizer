import * as React from "react";
import { View, Text, Dimensions, ViewStyle, StyleSheet } from "react-native";
import { default as RNModal } from "react-native-modal";

import { Color, Spacing } from "../styles";
import { SafeAreaView } from "react-navigation";
import { Divider } from "./Divider";

export interface BottomModalProps {
  title: string;
  testID?: string;
  isVisible: boolean;
  onBackdropPress: () => void;
  style?: ViewStyle;
  headerRight?: () => React.ReactNode;
  safeAreaDisabled?: boolean;
}
export class BottomModal extends React.Component<BottomModalProps> {
  public render() {
    const { title, isVisible, onBackdropPress, style, safeAreaDisabled, headerRight } = this.props;
    const viewHeight = Dimensions.get("screen").height;
    return (
      <RNModal
        isVisible={isVisible}
        hideModalContentWhileAnimating
        useNativeDriver
        backdropOpacity={0.5}
        onBackdropPress={onBackdropPress}
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
      >
        <View
          style={[
            {
              backgroundColor: Color.white,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              overflow: "hidden",
            },
            style,
          ]}
          testID={"Bottom Modal"}
        >
          <SafeAreaView
            forceInset={{ bottom: safeAreaDisabled ? "never" : "always", top: "never" }}
            style={{ maxHeight: viewHeight * 0.8 }}
          >
            <View
              style={{
                paddingHorizontal: Spacing.med,
                backgroundColor: Color.white,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: Spacing.med,
                  paddingHorizontal: Spacing.xlarge,
                }}
              >
                <Text>{title}</Text>
              </View>
              {headerRight ? (
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    justifyContent: "center",
                  }}
                >
                  {headerRight()}
                </View>
              ) : null}
            </View>
            <Divider borderWidth={StyleSheet.hairlineWidth} borderColor={Color.greyMed} />
            {this.props.children}
          </SafeAreaView>
          <Divider borderWidth={StyleSheet.hairlineWidth} borderColor={Color.greyMed} />
        </View>
      </RNModal>
    );
  }
}
