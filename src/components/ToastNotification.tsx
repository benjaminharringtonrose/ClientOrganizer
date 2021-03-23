import React from "react";
import { connect } from "react-redux";
import { SafeAreaView, View, Text } from "react-native";

import { dismissToast } from "../store/actions";
import { NOTIFICATION_TYPE } from "../store/types";

import { IStoreState } from "../store/store";
import { Banner } from "./Banner";

import * as Animatable from "react-native-animatable";
import { Color, Spacing } from "../styles";

interface PropsFromState {
  notificationType?: NOTIFICATION_TYPE;
  notificationVisible: boolean;
  text?: string;
}

interface DispatchFromProps {
  dismissNotification?: () => void;
}

type NotificationProps = PropsFromState & DispatchFromProps;

class ToastNotification extends React.Component<NotificationProps> {
  public render() {
    const { notificationVisible, notificationType, text } = this.props;

    if (notificationVisible && notificationType && text) {
      return (
        <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
          {notificationType === NOTIFICATION_TYPE.SUCCESS ? (
            <Animatable.View animation={"bounceIn"} easing={"ease-in-out"} duration={500}>
              <View
                style={{
                  backgroundColor: Color.confirm,
                  paddingTop: Spacing.xlarge,
                  paddingBottom: Spacing.large,
                }}
              >
                <Text style={{ color: Color.white, textAlign: "center", fontSize: 20 }}>
                  {text}
                </Text>
              </View>
            </Animatable.View>
          ) : (
            <Animatable.View animation={"bounceIn"} easing={"ease-in-out"} duration={500}>
              <View
                style={{
                  backgroundColor: Color.error,
                  paddingTop: Spacing.xlarge,
                  paddingBottom: Spacing.med,
                }}
              >
                <Text style={{ color: Color.white, textAlign: "center" }}>{text}</Text>
              </View>
            </Animatable.View>
          )}
        </View>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: IStoreState) => ({
  notificationVisible: state.notifications?.notificationVisible,
  notificationType: state.notifications?.notificationType,
  text: state.notifications.text,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchDismissNotification: () => dispatch(dismissToast()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotification);
