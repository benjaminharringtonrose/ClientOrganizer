import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, Dimensions } from "react-native";
import { connect } from "react-redux";
import { ScreenContainer, Card, CardSection, Button } from "../components";
import { Color, Spacing } from "../styles";
import { UserCard } from "../components/UserCard";
import { mapFriends, getFriendsAsync } from "./util";
import { IStringMap } from "./RegisterScreen";
import { BottomModal } from "../components/BottomModal";
import { DELETE_FRIEND } from "../store/types";
import uuid from "uuid-random";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  friendsList?: string[];
}

interface IDispatchFromState {
  dispatchDeleteFriend: (id: any) => void;
}

type IFindFriendsProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {
  mappedFriends?: IStringMap<any>[];
  showModal: boolean;
  selectedFriend?: IStringMap<any>;
}

function FriendsListScreen(props: IFindFriendsProps) {
  const [state, setState] = useState<ILocalState>({
    mappedFriends: [],
    showModal: false,
    selectedFriend: undefined,
  });

  useEffect(() => {
    getFriendsAsync(props.friendsList).then((friends) => {
      console.log("friends", friends);
      setState({ ...state, mappedFriends: mapFriends(friends) });
    });
  }, []);

  useEffect(() => {
    getFriendsAsync(props.friendsList).then((friends) => {
      console.log("friends", friends);
      setState({ ...state, mappedFriends: mapFriends(friends) });
    });
  }, [props.friendsList]);

  const renderUser = ({ item }: any) => {
    if (item) {
      return (
        <UserCard
          key={item.uid}
          avatar={item.avatar}
          name={`${item.firstName} ${item.lastName}`}
          icon={"ellipsis-horizontal"}
          onPress={() =>
            setState({
              ...state,
              showModal: true,
              selectedFriend: {
                id: item.uid,
                firstName: item.firstName,
                lastName: item.lastName,
                avatar: item.avatar,
              },
            })
          }
        />
      );
    }
    return null;
  };
  const modalHeight = Dimensions.get("screen").height / 4;
  console.log("mappedFriends", state.mappedFriends);
  return (
    <ScreenContainer>
      <View style={{ paddingLeft: Spacing.large, paddingVertical: Spacing.med }}>
        <Text style={{ color: Color.white, fontSize: 40 }}>{"Friends List"}</Text>
      </View>
      {state.mappedFriends?.length === 0 ? (
        <View style={styles.emptyMessagesContainer}>
          <Text style={{ color: Color.greyMed, fontSize: 16 }}>{"You have no friends"}</Text>
        </View>
      ) : null}
      <FlatList
        data={state.mappedFriends}
        renderItem={({ item }) => {
          return (
            <UserCard
              key={item.id}
              avatar={item.avatar}
              name={`${item.firstName} ${item.lastName}`}
              icon={"ellipsis-horizontal"}
              onPress={() =>
                setState({
                  ...state,
                  showModal: true,
                  selectedFriend: {
                    id: item.uid,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    avatar: item.avatar,
                  },
                })
              }
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <BottomModal
        title={"Details"}
        isVisible={state.showModal}
        onBackdropPress={() => setState({ ...state, showModal: false })}
      >
        <View style={{ backgroundColor: Color.black, minHeight: modalHeight }}>
          <Card>
            {state.selectedFriend && (
              <CardSection>
                <UserCard
                  avatar={state.selectedFriend.avatar}
                  name={`${state.selectedFriend.firstName} ${state.selectedFriend.lastName}`}
                  bio={state.selectedFriend.bio}
                  icon={"ellipsis-horizontal"}
                />
              </CardSection>
            )}

            <CardSection>
              <Button
                label={"Remove"}
                onPress={() => {
                  props.dispatchDeleteFriend({
                    id: state.selectedFriend?.id,
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
    friendsList: state.user?.user?.friendsList,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchDeleteFriend: (id: any) => dispatch({ type: DELETE_FRIEND.REQUESTED, payload: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsListScreen);

const styles = StyleSheet.create({
  emptyMessagesContainer: {
    paddingVertical: Spacing.small,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.darkThemeGreyMed,
    marginHorizontal: Spacing.med,
  },
});
