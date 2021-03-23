import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ScreenContainer, MessagePreviewCard, Header, ButtonText } from "../components";
import { Color, Spacing } from "../styles";
import { IStringMap } from "./RegisterScreen";
import {} from "../store/types";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import { Routes } from "../navigation/routes";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {}

interface IDispatchFromState {}

type IMessageScreenProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {
  selectedMessage?: IStringMap<any>;
}

const MESSAGES = [
  {
    messageId: "1",
    senderAvatar:
      "https://firebasestorage.googleapis.com/v0/b/socialapp-b2813/o/avatars%2F7b2c9077-c9f0-4fab-adeb-5e8106d1eaa1?alt=media&token=3670849f-ba08-4e25-bdb4-35da40a73e8b",
    senderFirstName: "John",
    senderLastName: "Smith",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timestamp: 1616035699702,
  },
  {
    messageId: "2",
    senderAvatar:
      "https://firebasestorage.googleapis.com/v0/b/socialapp-b2813/o/avatars%2F7b2c9077-c9f0-4fab-adeb-5e8106d1eaa1?alt=media&token=3670849f-ba08-4e25-bdb4-35da40a73e8b",
    senderFirstName: "Jimmy",
    senderLastName: "Creech",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timestamp: 1616036070543,
  },
  {
    messageId: "2",
    senderAvatar:
      "https://firebasestorage.googleapis.com/v0/b/socialapp-b2813/o/avatars%2F7b2c9077-c9f0-4fab-adeb-5e8106d1eaa1?alt=media&token=3670849f-ba08-4e25-bdb4-35da40a73e8b",
    senderFirstName: "Sally",
    senderLastName: "May",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timestamp: 1616036070543,
  },
];

function MessageScreen(props: IMessageScreenProps) {
  const [state, setState] = useState<ILocalState>({
    selectedMessage: undefined,
  });

  const renderMessagePreview = ({ item }: any) => {
    const onMessagePress = () => {
      setState({
        ...state,
        selectedMessage: {
          uid: item?.uid,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          avatar: item.avatar,
        },
      });
      props.navigation.navigate(Routes.MESSAGE_DETAILS_SCREEN);
    };
    if (item) {
      return (
        <TouchableOpacity onPress={onMessagePress}>
          <MessagePreviewCard
            avatar={item.senderAvatar}
            name={`${item.senderFirstName} ${item.senderLastName}`}
            message={item.message}
            timestamp={item.timestamp}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  // function refreshControl() {
  //   return (
  //     <RefreshControl
  //       refreshing={props.fetchAllUsersLoading}
  //       onRefresh={() => props.dispatchFetchAllUsers()}
  //       tintColor={Color.white}
  //     />
  //   );
  // }

  return (
    <ScreenContainer>
      <Header
        headerLeft={
          <ButtonText
            text={"Edit"}
            onPress={() => {}}
            textStyle={{ fontSize: 18, fontWeight: "500", color: Color.white }}
          />
        }
        headerRight={
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.MESSAGE_MODALS)}>
            <Entypo name={"new-message"} size={20} color={Color.white} />
          </TouchableOpacity>
        }
      />
      <View style={{ paddingLeft: Spacing.large, paddingTop: Spacing.med }}>
        <Text style={{ color: Color.white, fontSize: 40 }}>{"Messages"}</Text>
      </View>
      <View style={{ margin: Spacing.med }}>
        <SearchBar value={""} onChangeText={() => {}} />
      </View>
      <FlatList
        data={MESSAGES}
        renderItem={renderMessagePreview}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        // refreshControl={refreshControl()}
      />
    </ScreenContainer>
  );
}

const mapStateToProps = (state: any) => {
  return {
    // fetchAllUsersLoading: state.user.fetchAllUsersLoading,
    // fetchAllUsersError: state.user?.fetchAllUsersError,
    // users: state.user?.users,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  // dispatchFetchAllUsers: () => dispatch({ type: FETCH_ALL_USERS.REQUESTED }),
  // dispatchAddFriend: ({ friendUID, firstName, lastName, email, avatar }: any) =>
  //   dispatch({
  //     type: ADD_FRIEND.REQUESTED,
  //     payload: { friendUID, firstName, lastName, email, avatar },
  //   }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);

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
