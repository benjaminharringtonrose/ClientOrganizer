import * as React from "react";
import { View, Text, Dimensions, ViewStyle, StyleSheet } from "react-native";
import { default as RNModal } from "react-native-modal";

import { Color, Spacing } from "../styles";
import { SafeAreaView } from "react-navigation";
import { Divider } from "./Divider";

export interface BottomModalProps {
  title?: string;
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
    const deviceHeight = Dimensions.get("screen").height;
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
              backgroundColor: "transparent",
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
            style={{ maxHeight: deviceHeight * 0.8 }}
          >
            <View
              style={{
                paddingHorizontal: Spacing.med,
                backgroundColor: Color.darkThemeGreyDark,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {!!title && (
                <View style={styles.titleContainer}>
                  <Text style={{ color: Color.white, fontSize: 24 }}>{title}</Text>
                </View>
              )}

              {headerRight ? (
                <View style={styles.headerRightContainer}>{headerRight()}</View>
              ) : null}
            </View>
            {this.props.children}
          </SafeAreaView>
        </View>
      </RNModal>
    );
  }
}

const styles = StyleSheet.create({
  headerRightContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing.med,
    paddingHorizontal: Spacing.xlarge,
  },
});
