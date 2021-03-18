import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { ScreenContainer, CardSection, Button, Card } from "../components";
import { Color, Spacing } from "../styles";
import { UserCard } from "../components/UserCard";
import { IStringMap } from "./RegisterScreen";
import { FETCH_ALL_USERS, ADD_FRIEND } from "../store/types";
import SearchBar from "../components/SearchBar";
import { BottomModal } from "../components/BottomModal";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  fetchAllUsersLoading: boolean;
  fetchAllUsersError?: any;
  users?: IStringMap<any>[];
}

interface IDispatchFromState {
  dispatchFetchAllUsers: () => void;
  dispatchAddFriend: ({ friendUID, firstName, lastName, email, avatar }: any) => void;
}

type IFindFriendsProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {
  showModal: boolean;
  selectedUser?: IStringMap<any>;
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
          uid: item?.uid,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          avatar: item.avatar,
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

  const modalHeight = Dimensions.get("screen").height / 4;
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
      <BottomModal
        title={"Add a Friend"}
        isVisible={state.showModal}
        onBackdropPress={() => setState({ ...state, showModal: false })}
      >
        <View style={{ minHeight: modalHeight }}>
          <Card>
            {state.selectedUser && (
              <CardSection>
                <UserCard
                  avatar={state.selectedUser.avatar}
                  name={`${state.selectedUser.firstName} ${state.selectedUser.lastName}`}
                  bio={state.selectedUser.bio}
                  icon={"ellipsis-horizontal"}
                />
              </CardSection>
            )}

            <CardSection>
              <Button
                label={"Add"}
                onPress={() => {
                  props.dispatchAddFriend({
                    friendUID: state.selectedUser?.uid,
                    firstName: state.selectedUser?.firstName,
                    lastName: state.selectedUser?.lastName,
                    email: state.selectedUser?.email,
                    avatar: state.selectedUser?.avatar,
                  });
                  setState({ ...state, showModal: false });
                }}
                style={{ marginBottom: Spacing.med }}
              />
            </CardSection>
          </Card>
        </View>
      </BottomModal>
    </ScreenContainer>
  );
}

const mapStateToProps = (state: any) => {
  return {
    fetchAllUsersLoading: state.user.fetchAllUsersLoading,
    fetchAllUsersError: state.user?.fetchAllUsersError,
    users: state.user?.users,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchAllUsers: () => dispatch({ type: FETCH_ALL_USERS.REQUESTED }),
  dispatchAddFriend: ({ friendUID, firstName, lastName, email, avatar }: any) =>
    dispatch({
      type: ADD_FRIEND.REQUESTED,
      payload: { friendUID, firstName, lastName, email, avatar },
    }),
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
