import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { Header, ScreenContainer } from "../components";
import { Color } from "../styles";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {}

interface IDispatchFromState {}

type IFindFriendsProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {}

function FindFriendsScreen(props: IFindFriendsProps) {
  const [state, setState] = useState<ILocalState>({});

  const renderUser = ({ item }: any) => {
    if (item) {
      return (
        <View>
          <Text>{"hey"}</Text>
        </View>
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
      <Header title={"Find Friends"} />
      <FlatList
        data={[]}
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

export default connect(mapStateToProps, {})(FindFriendsScreen);

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
