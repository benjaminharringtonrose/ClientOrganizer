import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import { Header, ScreenContainer, CardSection } from "../components";
import { Color, Spacing } from "../styles";
import { UserCard } from "../components/UserCard";
import firebase from "firebase";
import { IStringMap } from "./RegisterScreen";
import { FETCH_ALL_USERS, ADD_FRIEND } from "../store/types";
import SearchBar from "../components/SearchBar";
import AlertModal from "../components/AlertModal";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  fetchAllUsersLoading: boolean;
  fetchAllUsersError: any;
  users: IStringMap<any>[];
}

interface IDispatchFromState {
  dispatchFetchAllUsers: () => void;
  dispatchAddFriend: ({ firstName, lastName, email }: any) => void;
}

type IFindFriendsProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {
  showModal: boolean;
  selectedUser: any;
}

function FindFriendsScreen(props: IFindFriendsProps) {
  const [state, setState] = useState<ILocalState>({
    showModal: false,
    selectedUser: undefined,
  });

  const renderUser = ({ item }: any) => {
    const onUserPress = () => {
      setState({
        ...state,
        showModal: true,
        selectedUser: {
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
        },
      });
    };
    if (item) {
      return (
        <TouchableOpacity onPress={onUserPress}>
          <UserCard
            avatar={item.avatar}
            name={`${item.firstName} ${item.lastName}`}
            bio={item.bio}
            icon={"ellipsis-horizontal"}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  function refreshControl() {
    return (
      <RefreshControl
        refreshing={props.fetchAllUsersLoading}
        onRefresh={() => props.dispatchFetchAllUsers()}
        tintColor={Color.white}
      />
    );
  }
  return (
    <ScreenContainer>
      <View style={{ paddingLeft: Spacing.large, paddingTop: Spacing.med }}>
        <Text style={{ color: Color.white, fontSize: 40 }}>{"Find Friends"}</Text>
      </View>
      <View style={{ margin: Spacing.med }}>
        <SearchBar value={""} onChangeText={() => {}} />
      </View>
      <FlatList
        data={props.users}
        renderItem={renderUser}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl()}
      />
      <AlertModal
        isVisible={state.showModal}
        label={`Add ${state.selectedUser?.firstName}?`}
        actions={[
          {
            buttonLabel: "Add",
            onPress: () => {
              props.dispatchAddFriend({
                firstName: state.selectedUser?.firstName,
                lastName: state.selectedUser?.lastName,
                email: state.selectedUser?.email,
              });
              setState({ ...state, showModal: false });
            },
          },
          {
            buttonLabel: "Cancel",
            onPress: () => setState({ ...state, showModal: false }),
          },
        ]}
      />
    </ScreenContainer>
  );
}

const mapStateToProps = (state: any) => {
  return {
    fetchAllUsersLoading: state.user.fetchAllUsersLoading,
    fetchAllUsersError: state.user.fetchAllUsersError,
    users: state.user.users,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchAllUsers: () => dispatch({ type: FETCH_ALL_USERS.REQUESTED }),
  dispatchAddFriend: ({ firstName, lastName, email }: any) =>
    dispatch({ type: ADD_FRIEND.REQUESTED, payload: { firstName, lastName, email } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FindFriendsScreen);

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
