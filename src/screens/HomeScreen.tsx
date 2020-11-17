import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import AlertModal from "../common/components/AlertModal";
import { Icon } from "react-native-elements";
import InputSearch from "../common/components/InputSearch";
import CellIconActionable from "../common/components/CellIconActionable";

import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";

import { connect } from "react-redux";
import { searchTextChanged } from "../store/actions/UserActions";
import firebase from "firebase";
import { Routes } from "../../navigation";
import { FETCH_USER_REQUEST, DELETE_CLIENT } from "../store/actions/types";
import { mapClients, deleteField } from "../dashboard/util";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  seachText: string;
  clients: any;
  fetchUserLoading: boolean;
  fetchUserError: string;
  deleteClientLoading: boolean;
  deleteClientError: string;
}

interface DispatchFromState {
  searchTextChanged: (text: string) => void;
  dispatchFetchUser: (uid: any) => any;
  dispatchDeleteClientRequested: () => any;
  dispatchDeleteClientSucceeded: () => any;
}

interface LocalState {
  uid?: string;
  clients: any;
  modalVisible: boolean;
  editMode: boolean;
  clientId?: string;
}

type HomeScreenProps = PropsFromState & DispatchFromState & PassedProps;

class HomeScreen extends Component<HomeScreenProps, LocalState> {
  public state = {
    uid: undefined,
    clients: [],
    database: undefined,
    modalVisible: false,
    editMode: false,
    clientId: undefined,
  };

  public componentDidMount() {
    const uid = firebase.auth().currentUser?.uid;
    this.props.dispatchFetchUser({ uid });
  }

  public componentDidUpdate(oldProps: any) {
    if (
      oldProps.fetchUserLoading &&
      !this.props.fetchUserLoading &&
      !this.props.fetchUserError
    ) {
      if (oldProps.clients !== this.props.clients) {
        const mappedClients = mapClients(this.props.clients);
        this.setState({ clients: [...mappedClients] });
      }
    }
  }

  private toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  private onAddNewClientPress = () => {
    this.props.navigation.navigate(Routes.ADD_NEW_CLIENT_SCREEN);
  };

  private onDeletePress = () => {
    const { editMode, modalVisible, clientId } = this.state;
    const uid = firebase.auth().currentUser?.uid;

    this.props.dispatchDeleteClientRequested();
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(
        {
          clients: {
            [clientId!]: deleteField(),
          },
        },
        { merge: true }
      )
      .then(() => {
        this.props.dispatchDeleteClientSucceeded();
        this.props.dispatchFetchUser({ uid });
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    this.setState({
      modalVisible: !modalVisible,
      editMode: !editMode,
    });
  };

  private onCancelPress = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      editMode: !this.state.editMode,
    });
  };
  private renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>{"Client Manager"}</Text>
        </View>
        <TouchableOpacity onPress={this.onAddNewClientPress}>
          <Icon
            style={{ marginRight: Spacing.large }}
            name={"plus"}
            type={"antdesign"}
            color={Color.white}
            size={18}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleEditMode}>
          <Icon
            name={"trash"}
            type={"feather"}
            color={this.state.editMode ? "red" : Color.white}
            size={18}
          />
        </TouchableOpacity>
      </View>
    );
  };

  private renderItem = ({ item }: any) => {
    const iconName = this.state.editMode ? "minuscircle" : "right";
    const color = this.state.editMode ? "red" : Color.white;
    return (
      <CellIconActionable
        onPress={() => {
          if (this.state.editMode) {
            this.setState({ modalVisible: true, clientId: item.id });
          } else {
            this.props.navigation.navigate(Routes.CLIENT_DETAIL_SCREEN, { client: item });
          }
        }}
        label={`${item.firstName} ${item.lastName}`}
        iconRightName={iconName}
        iconRightColor={color}
      />
    );
  };

  public render() {
    console.log(this.props.deleteClientLoading);
    const loading = this.props.fetchUserLoading || this.props.deleteClientLoading;
    return (
      <View style={styles.rootContainer}>
        <StatusBar barStyle={"light-content"} />
        {this.renderHeader()}
        <Card style={{ flex: 1 }}>
          <CardSection style={{ marginBottom: Spacing.med }}>
            <InputSearch
              onChangeText={() => {}}
              value={this.props.seachText}
              placeholder={"search clients..."}
              keyboardType={"web-search"}
            />
          </CardSection>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              data={this.state.clients}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }) => this.renderItem({ item })}
            />
          )}
        </Card>
        <AlertModal
          label={"Are you sure you want to delete this client?"}
          onDeletePress={this.onDeletePress}
          onCancelPress={this.onCancelPress}
          isVisible={this.state.modalVisible}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log("state", state);
  return {
    clients: state.user.user.clients,
    fetchUserLoading: state.user.fetchUserLoading,
    fetchUserError: state.user.fetchUserError,
    deleteClientLoading: state.user.deleteClientLoading,
    deleteClientError: state.user.deleteClientError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  searchTextChanged: (text: string) => dispatch(searchTextChanged(text)),
  dispatchFetchUser: ({ uid }: any) =>
    dispatch({ type: FETCH_USER_REQUEST, payload: { uid } }),
  dispatchDeleteClientRequested: () => dispatch({ type: DELETE_CLIENT.REQUESTED }),
  dispatchDeleteClientSucceeded: () => dispatch({ type: DELETE_CLIENT.SUCCEEDED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 3,
    backgroundColor: Color.darkThemeGreyDark,
    paddingHorizontal: Spacing.med,
    paddingTop: Spacing.xxlarge,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.micro,
  },
  headerText: {
    fontSize: 26,
    color: Color.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});