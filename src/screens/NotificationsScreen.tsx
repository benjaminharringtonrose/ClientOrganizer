import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, RefreshControl, SectionList } from "react-native";
import { connect } from "react-redux";
import { ScreenContainer } from "../components";
import { FriendRequestCard } from "../components/FriendRequestCard";
import { Color, Spacing } from "../styles";
import { IStringMap } from "./RegisterScreen";
import { IError, FETCH_USER, ADD_FRIEND, FETCH_NOTIFICATIONS } from "../store/types";
import { mapNotifications } from "./util";
import { NotificationCard } from "../components/NotificationCard";
import firebase from "firebase";
import { NOTIFICATION } from "../api/PushNotifications";
import { usePrevious } from "../hooks/usePrevious";
import { IStoreState } from "../store/store";
import { setBadge } from "../store/actions";
import { isEqual } from "lodash";
import { useNotifications } from "../hooks/useNotifications";

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
  badgeVisible: boolean;
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
  dispatchSetBadge: (shouldSetBadge: boolean) => void;
}

type IMessageScreenProps = IPassedProps & IPropsFromState & IDispatchFromState;

function NotificationScreen(props: IMessageScreenProps) {
  const notifications = useNotifications(() => props.dispatchSetBadge(true));

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
          props.dispatchSetBadge(false);
        }}
        tintColor={Color.white}
      />
    );
  }

  const notificationData = [
    {
      title: "Friend Requests",
      data: notifications || [],
    },
  ];

  return (
    <ScreenContainer>
      {!!notifications?.length ? (
        <SectionList
          sections={notificationData}
          keyExtractor={(item, index) => item + index}
          renderItem={renderNotification}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeaderTitle}>{title}</Text>
          )}
          refreshControl={refreshControl()}
        />
      ) : (
        <View style={styles.emptyMessagesContainer}>
          <Text style={{ color: Color.greyMed, fontSize: 16 }}>{"You have no notifications"}</Text>
        </View>
      )}
    </ScreenContainer>
  );
}

const mapStateToProps = (state: IStoreState) => {
  return {
    fetchUserLoading: state.user?.user?.fetchAllUsersLoading,
    fetchUserError: state.user?.user?.fetchAllUsersError,
    user: state.user?.user,
    uid: state.user?.user?.uid,
    fetchNotificationsLoading: state.notifications?.fetchNotificationsLoading,
    fetchNotificationsError: state.notifications?.fetchNotificationsError,
    notifications: state.notifications?.notifications,
    badgeVisible: state.notifications.badgeVisible,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: string) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchFetchNotifications: () => dispatch({ type: FETCH_NOTIFICATIONS.REQUESTED }),
  dispatchSetBadge: (shouldSetBadge: boolean) => dispatch(setBadge(shouldSetBadge)),
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
  emptyMessagesContainer: {
    marginTop: Spacing.large,
    paddingVertical: Spacing.small,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.darkThemeGreyMed,
    marginHorizontal: Spacing.med,
  },
});
