import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";
import InputSearch from "../common/components/InputSearch";
import { searchTextChanged } from "../store/actions/UserActions";
import Card from "../common/components/Card";
import CellIconActionable from "../common/components/CellIconActionable";
import firebase from "firebase";
import { Routes } from "../../navigation";
import { FETCH_USER_REQUEST } from "../store/actions/types";
import CardSection from "../common/components/CardSection";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { mapClients } from "./util";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  seachText: string;
  clients: any;
  fetchUserLoading: boolean;
  fetchUserError: boolean;
}

interface DispatchFromState {
  searchTextChanged: (text: string) => void;
  dispatchFetchUser: (uid: any) => any;
}

interface LocalState {
  clients: any;
  modalVisible: boolean;
}

type HomeScreenProps = PropsFromState & DispatchFromState & PassedProps;
class HomeScreen extends Component<HomeScreenProps, LocalState> {
  public state = {
    clients: [],
    database: undefined,
    modalVisible: false,
  };

  public componentDidMount() {
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      this.props.dispatchFetchUser({ uid });
    }
  }

  public componentDidUpdate(oldProps: any) {
    if (
      oldProps.fetchUserLoading &&
      !this.props.fetchUserLoading &&
      !this.props.fetchUserError
    ) {
      if (oldProps.clients !== this.props.clients) {
        const mappedClients = mapClients(this.props.clients);
        this.setState({ clients: [...this.state.clients, ...mappedClients] });
      }
    }
  }

  private onChangeSearchText = (text: string) => {
    this.props.searchTextChanged(text);
  };

  private onEdit = () => {};

  private onAddNewClientPress = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
    this.props.navigation.navigate(Routes.ADD_NEW_CLIENT_SCREEN);
  };

  private renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subHeaderText}>{"Client Manager"}</Text>
        </View>
        <TouchableOpacity style={{ marginRight: Spacing.large }} onPress={this.onEdit}>
          <Icon style={{}} name={"edit"} type={"feather"} color={Color.white} size={18} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onAddNewClientPress}>
          <Icon
            style={{}}
            name={"plus"}
            type={"antdesign"}
            color={Color.white}
            size={18}
          />
        </TouchableOpacity>
      </View>
    );
  };

  private renderItem = ({ item }: any) => {
    return (
      <CellIconActionable
        onPress={() =>
          this.props.navigation.navigate(Routes.CLIENT_DETAIL_SCREEN, { client: item })
        }
        label={`${item.firstName} ${item.lastName}`}
        iconRightName={"right"}
      />
    );
  };

  render() {
    console.log(this.props.fetchUserLoading);
    if (this.props.fetchUserLoading) {
      return (
        <View style={{ backgroundColor: Color.darkThemeGreyDark }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView style={styles.rootContainer}>
        {this.props.fetchUserLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <StatusBar barStyle={"light-content"} />
            {this.renderHeader()}
            <Card style={{ flex: 1 }}>
              <InputSearch
                onChangeText={this.onChangeSearchText}
                value={this.props.seachText}
                placeholder={"search clients..."}
                keyboardType={"web-search"}
              />
              <FlatList
                data={this.state.clients}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item }) => this.renderItem({ item })}
              />
            </Card>
          </>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    clients: state.user.user.clients,
    fetchUserLoading: state.user.fetchUserLoading,
    fetchUserError: state.user.fetchUserError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  searchTextChanged: (text: string) => dispatch(searchTextChanged(text)),
  dispatchFetchUser: ({ uid }: any) =>
    dispatch({ type: FETCH_USER_REQUEST, payload: { uid } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
    paddingHorizontal: Spacing.med,
    paddingTop: Spacing.xxlarge,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.micro,
  },
  subHeaderText: {
    fontSize: 20,
    color: Color.white,
  },
});
