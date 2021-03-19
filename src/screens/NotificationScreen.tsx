import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ScreenContainer, MessagePreviewCard, Header, FriendRequestCard } from "../components";
import { Color, Spacing } from "../styles";
import { IStringMap } from "./RegisterScreen";
import { IError, FETCH_USER, ADD_FRIEND } from "../store/types";
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
}

interface IDispatchFromState {
  dispatchFetchUser: (uid: string) => void;
  dispatchAddFriend: ({
    theirUid,
    theirFirstName,
    theirLastName,
    theirAvatar,
    firstName,
    lastName,
    avatar,
  }: any) => void;
}

type IMessageScreenProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {
  mappedNotifications?: any[];
  selectedNotification?: IStringMap<any>;
}

function NotificationScreen(props: IMessageScreenProps) {
  const [state, setState] = useState<ILocalState>({
    mappedNotifications: undefined,
    selectedNotification: undefined,
  });

  useEffect(() => {
    setState({ ...state, mappedNotifications: mapNotifications(props?.user?.notifications) });
  }, []);

  useEffect(() => {
    setState({ ...state, mappedNotifications: mapNotifications(props?.user?.notifications) });
  }, [props.user]);

  const renderNotification = ({ item }: any) => {
    const onNotificationPress = () => {
      setState({
        ...state,
        selectedNotification: {
          uid: item?.theirUid,
          firstName: item.firstName,
          lastName: item.lastName,
          avatar: item.avatar,
        },
      });
      props.navigation.navigate(Routes.MESSAGE_DETAILS_SCREEN);
    };

    const onAcceptFriendRequest = () => {
      props.dispatchAddFriend({
        theirUid: item?.theirUid,
        theirFirstName: item.firstName,
        theirLastName: item.lastName,
        theirAvatar: item.avatar,
        firstName: props.user?.firstName,
        lastName: props.user?.lastName,
        avatar: props.user?.avatar,
      });
      const uid = firebase.auth().currentUser?.uid;
      const theirUid = item?.theirUid;
      console.log("theirUid", theirUid);
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .set(
          {
            notifications: {
              [theirUid!]: firebase.firestore.FieldValue.delete(),
            },
          },
          { merge: true }
        );
      props.dispatchFetchUser(uid!);
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
        onRefresh={() => props.dispatchFetchUser(props.user?.uid)}
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
  return {
    fetchUserLoading: state.user?.user?.fetchAllUsersLoading,
    fetchUserError: state.user?.user?.fetchAllUsersError,
    user: state.user?.user,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: string) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchAddFriend: ({
    theirUid,
    theirFirstName,
    theirLastName,
    theirAvatar,
    firstName,
    lastName,
    avatar,
  }: any) =>
    dispatch({
      type: ADD_FRIEND.REQUESTED,
      payload: {
        theirUid,
        theirFirstName,
        theirLastName,
        theirAvatar,
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
