import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { Header, ScreenContainer } from "../components";
import { Color, Spacing } from "../styles";
import { UserCard } from "../components/UserCard";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {}

interface IDispatchFromState {}

type IFindFriendsProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {}

function FriendsListScreen(props: IFindFriendsProps) {
  const [state, setState] = useState<ILocalState>({});

  const renderUser = ({ item }: any) => {
    if (item) {
      return (
        <UserCard
          avatar={item.avatar}
          name={`${item.firstName} ${item.lastName}`}
          bio={item.bio}
          icon={"ellipsis-horizontal"}
        />
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
      <View style={{ paddingLeft: Spacing.large, paddingVertical: Spacing.med }}>
        <Text style={{ color: Color.white, fontSize: 40 }}>{"Friends List"}</Text>
      </View>
      <FlatList
        data={[
          {
            avatar: undefined,
            firstName: "John",
            lastName: "Smith",
            bio: "I'm John and I drink tea.",
            uid: "1",
          },
          {
            avatar: undefined,
            firstName: "Bill",
            lastName: "Nye",
            bio: "Nerdin out",
            uid: "2",
          },
          {
            avatar: undefined,
            firstName: "Carl",
            lastName: "Rogers",
            bio: "It's a wonderful life.",
            uid: "3",
          },
        ]}
        renderItem={renderUser}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        // refreshControl={refreshControl()}
      />
    </ScreenContainer>
  );
}

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {})(FriendsListScreen);

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
