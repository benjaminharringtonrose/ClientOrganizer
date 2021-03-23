import * as React from "react";
import { default as RNModal, ModalProps } from "react-native-modal";

export class Modal extends React.Component<ModalProps> {
  /**
   * For some reason TS is not picking up `react-native-modal`'s defaultProps. `ModalProps` show the majority of props
   * being required; however, the `defaultProps` should satisfy this scenario when we only pass in "Partial" `ModalProps`.
   */
  public static defaultProps = {
    animationIn: "slideInUp",
    animationInTiming: 300,
    animationOut: "slideOutDown",
    animationOutTiming: 300,
    avoidKeyboard: false,
    backdropColor: "black",
    backdropOpacity: 0.7,
    backdropTransitionInTiming: 300,
    backdropTransitionOutTiming: 300,
    coverScreen: true,
    customBackdrop: null,
    deviceHeight: null,
    deviceWidth: null,
    hasBackdrop: true,
    hideModalContentWhileAnimating: false,
    isVisible: false,
    onModalShow: () => null,
    onModalWillShow: () => null,
    onModalHide: () => null,
    onModalWillHide: () => null,
    onBackdropPress: () => null,
    onBackButtonPress: () => null,
    propagateSwipe: false,
    scrollHorizontal: false,
    scrollOffset: 0,
    scrollOffsetMax: 0,
    scrollTo: null,
    supportedOrientations: ["portrait", "landscape"],
    swipeThreshold: 100,
    useNativeDriver: false,
  };
  public render() {
    return <RNModal {...this.props} useNativeDriver hideModalContentWhileAnimating backdropOpacity={0.5} />;
  }
}
