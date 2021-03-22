import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ScreenContainer, MessagePreviewCard, Header, FriendRequestCard } from "../components";
import { Color, Spacing } from "../styles";
import { IStringMap } from "./RegisterScreen";
import { IError, FETCH_USER, ADD_FRIEND, FETCH_NOTIFICATIONS } from "../store/types";
import SearchBar from "../components/SearchBar";
import { Routes } from "../navigation/routes";
import { mapNotifications } from "./util";
import { NotificationCard } from "../components/NotificationCard";
import firebase from "firebase";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  user?: IStringMap<any>;
  fetchUserLoading: boolean;
  fetchUserError?: IError;

  notifications?: IStringMap<any>[];
  fetchNotificationsLoading: boolean;
  fetchNotificationsError?: IError;
}

interface IDispatchFromState {
  dispatchFetchUser: (uid: string) => void;
  dispatchFetchNotifications: () => void;
  dispatchAddFriend: ({
    friendId,
    friendFirstName,
    friendLastName,
    friendAvatar,
    uid,
    firstName,
    lastName,
    avatar,
  }: any) => void;
}

type IMessageScreenProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {
  mappedNotifications?: any[];
}

function NotificationScreen(props: IMessageScreenProps) {
  const [state, setState] = useState<ILocalState>({
    mappedNotifications: undefined,
  });

  useEffect(() => {
    setState({ ...state, mappedNotifications: mapNotifications(props?.notifications) });
  }, []);

  useEffect(() => {
    setState({ ...state, mappedNotifications: mapNotifications(props?.notifications) });
  }, [props.notifications]);

  const renderNotification = ({ item }: any) => {
    const onNotificationPress = () => {};

    const onAcceptFriendRequest = () => {
      const uid = firebase.auth().currentUser?.uid;

      props.dispatchAddFriend({
        friendId: item.theirUid,
        friendFirstName: item.firstName,
        friendLastName: item.lastName,
        friendAvatar: item.avatar,
        uid: props.user?.uid,
        firstName: props.user?.firstName,
        lastName: props.user?.lastName,
        avatar: props.user?.avatar,
      });

      const theirUid = item?.theirUid;

      console.log(`friendRequest`, firebase.firestore().collection("notifications").doc(uid).get());

      firebase
        .firestore()
        .collection("notifications")
        .doc(uid)
        .set(
          {
            [theirUid!]: firebase.firestore.FieldValue.delete(),
          },
          { merge: true }
        )
        .catch((error) => console.warn(error));
      props.dispatchFetchUser(uid!);
      props.dispatchFetchNotifications();
    };
    const onDeclineFriendRequest = () => {};

    if (item) {
      return (
        <TouchableOpacity onPress={onNotificationPress}>
          <FriendRequestCard
            notificationType={item.notificationType}
            avatar={item.avatar}
            name={`${item.firstName} ${item.lastName}`}
            message={item.message}
            timestamp={item.timestamp}
            buttons={[
              {
                label: "Accept",
                onPress: onAcceptFriendRequest,
              },
              {
                label: "Decline",
                onPress: onDeclineFriendRequest,
              },
            ]}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  function refreshControl() {
    return (
      <RefreshControl
        refreshing={props.fetchUserLoading}
        onRefresh={() => {
          props.dispatchFetchNotifications();
        }}
        tintColor={Color.white}
      />
    );
  }
  return (
    <ScreenContainer>
      <Header />
      <View style={{ paddingLeft: Spacing.large, paddingVertical: Spacing.med }}>
        <Text style={{ color: Color.white, fontSize: 40 }}>{"Notifications"}</Text>
      </View>
      <FlatList
        data={state.mappedNotifications}
        renderItem={renderNotification}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl()}
      />
    </ScreenContainer>
  );
}

const mapStateToProps = (state: any) => {
  // console.log("state?.notifications?.notifications", state?.notifications?.notifications);
  return {
    fetchUserLoading: state.user?.user?.fetchAllUsersLoading,
    fetchUserError: state.user?.user?.fetchAllUsersError,
    user: state.user?.user,

    fetchNotificationsLoading: state.notifications?.fetchAllUsersLoading,
    fetchNotificationsError: state.notifications?.fetchAllUsersError,
    notifications: state.notifications?.notifications,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: string) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchFetchNotifications: () => dispatch({ type: FETCH_NOTIFICATIONS.REQUESTED }),
  dispatchAddFriend: ({
    friendId,
    friendFirstName,
    friendLastName,
    friendAvatar,
    uid,
    firstName,
    lastName,
    avatar,
  }: any) =>
    dispatch({
      type: ADD_FRIEND.REQUESTED,
      payload: {
        friendId,
        friendFirstName,
        friendLastName,
        friendAvatar,
        uid,
        firstName,
        lastName,
        avatar,
      },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: Color.darkThemeGreyDark,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Color.darkThemeGreyMed,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: Color.white,
  },
});
