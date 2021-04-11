import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  SectionList,
} from "react-native";
import { connect } from "react-redux";
import { ScreenContainer, Header, FriendRequestCard } from "../components";
import { Color, Spacing } from "../styles";
import { IStringMap } from "./RegisterScreen";
import { IError, FETCH_USER, ADD_FRIEND, FETCH_NOTIFICATIONS } from "../store/types";
import { mapNotifications } from "./util";
import { NotificationCard } from "../components/NotificationCard";
import firebase from "firebase";
import { NOTIFICATION } from "../api/PushNotifications";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  uid?: string;
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
    firebase
      .firestore()
      .collection("notifications")
      .doc(props.uid)
      .onSnapshot((doc) => {
        setState({ ...state, mappedNotifications: mapNotifications(doc.data()) });
      });
  }, []);

  const renderNotification = ({ item }: any) => {
    const onAcceptFriendRequest = () => {
      props.dispatchAddFriend({
        friendId: item.theirUid,
        friendFirstName: item.firstName,
        friendLastName: item.lastName,
        friendAvatar: item.avatar,
        uid: props?.uid,
        firstName: props.user?.firstName,
        lastName: props.user?.lastName,
        avatar: props.user?.avatar,
      });
      props.dispatchFetchUser(props?.uid!);
    };
    const onDeclineFriendRequest = () => {};

    if (item) {
      if (item.notificationType === NOTIFICATION.FRIEND_REQUEST) {
        return (
          <TouchableOpacity>
            <FriendRequestCard
              key={item.uid}
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
      } else if (item.notificationType === NOTIFICATION.GENERAL) {
        return (
          <NotificationCard
            notificationType={item.notificationType}
            avatar={item.avatar}
            name={`${item.firstName} ${item.lastName}`}
            message={item.message}
            timestamp={item.timestamp}
          />
        );
      }
      return null;
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

  const notificationData = [
    {
      title: "Friend Requests",
      data: state?.mappedNotifications || [],
    },
  ];

  return (
    <ScreenContainer>
      <SectionList
        sections={notificationData}
        keyExtractor={(item, index) => item + index}
        renderItem={renderNotification}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeaderTitle}>{title}</Text>
        )}
        refreshControl={refreshControl()}
      />
    </ScreenContainer>
  );
}

const mapStateToProps = (state: any) => {
  return {
    fetchUserLoading: state.user?.user?.fetchAllUsersLoading,
    fetchUserError: state.user?.user?.fetchAllUsersError,
    user: state.user?.user,
    uid: state.user?.user?.uid,
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
  sectionHeaderTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: Color.greyMed,
    marginLeft: Spacing.large,
  },
});
