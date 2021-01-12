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
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { isEqual } from "lodash";
import firebase from "firebase";
import { FETCH_USER, DELETE_CLIENT } from "../store/actions/types";
import Routes from "../navigation/routes";

import SearchBar from "../common/components/SearchBar";
import Card from "../common/components/Card";
import CellIconActionable from "../common/components/CellIconActionable";
import CardSection from "../common/components/CardSection";
import AlertModal from "../common/components/AlertModal";

import { mapClients } from "./util";
import { Color, Spacing } from "../common/styles";

export interface IClient {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  preferredAreas: string;
  notes: string;
}

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  clients: any;
  fetchUserLoading: boolean;
  fetchUserError: string;
  deleteClientLoading: boolean;
  deleteClientError: string;
}

interface DispatchFromState {
  searchTextChanged: (text: string) => void;
  dispatchFetchUser: (uid: string) => void;
  dispatchDeleteClient: (clientId: string) => void;
}

interface LocalState {
  clients: IClient[];
  filteredClients: IClient[];
  modalVisible: boolean;
  editMode: boolean;
  clientId?: string;
  searchText: string;
}

type HomeScreenProps = PropsFromState & DispatchFromState & PassedProps;

class HomeScreen extends Component<HomeScreenProps, LocalState> {
  public state = {
    clients: [],
    filteredClients: [],
    database: undefined,
    modalVisible: false,
    editMode: false,
    clientId: undefined,
    searchText: "",
  };

  public componentDidMount() {
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      this.props.dispatchFetchUser(uid);
    }
  }

  public componentDidUpdate(oldProps: any) {
    if (oldProps.fetchUserLoading && !this.props.fetchUserLoading && !this.props.fetchUserError) {
      if (oldProps.clients !== this.props.clients) {
        const mappedClients = mapClients(this.props.clients);
        if (mappedClients) {
          this.setState({ clients: [...mappedClients] });
        }
      }
    }
  }

  private onAddNewClientPress = () => {
    this.setState({ editMode: false });
    this.props.navigation.navigate(Routes.ADD_NEW_CLIENT_SCREEN);
  };

  private onDeletePress = () => {
    this.props.dispatchDeleteClient(this.state.clientId!);
    this.setState({
      modalVisible: !this.state.modalVisible,
      editMode: !this.state.editMode,
    });
  };

  private renderHeader = () => {
    const { editMode } = this.state;
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
            color={Color.darkThemeGreen}
            size={26}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ editMode: !editMode })}>
          <Icon name={"trash"} type={"feather"} color={Color.remove} size={22} />
        </TouchableOpacity>
      </View>
    );
  };

  private renderClientCell = ({ item }: any) => {
    const iconName = this.state.editMode ? "minuscircle" : "right";
    const color = this.state.editMode ? Color.remove : Color.white;
    return (
      <CellIconActionable
        onPress={() => {
          if (this.state.editMode) {
            this.setState({ modalVisible: true, clientId: item.id });
          } else {
            this.props.navigation.navigate(Routes.CLIENT_DETAIL_SCREEN, {
              client: item,
            });
          }
        }}
        label={`${item.lastName}, ${item.firstName}`}
        iconRightName={iconName}
        iconRightColor={color}
        iconRightSize={16}
      />
    );
  };

  private searchClients = (searchText: string) => {
    this.setState({ searchText });
    const filteredClients = this.state.clients.filter(
      (client: any) => client.lastName.includes(searchText) || client.firstName.includes(searchText)
    );
    this.setState({ filteredClients });
  };

  public render() {
    const loading = this.props.fetchUserLoading || this.props.deleteClientLoading;
    const showAllClients = !this.state.filteredClients.length && this.state.searchText === "";
    return (
      <View style={styles.rootContainer}>
        <StatusBar barStyle={"light-content"} />
        {this.renderHeader()}
        <Card style={{ flex: 1 }}>
          <CardSection style={{ marginBottom: Spacing.med }}>
            <SearchBar
              onChangeText={this.searchClients}
              value={this.state.searchText || ""}
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
              data={showAllClients ? this.state.clients : this.state.filteredClients}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }) => this.renderClientCell({ item })}
              indicatorStyle={"white"}
            />
          )}
        </Card>
        <AlertModal
          label={"Are you sure you want to delete this client?"}
          onDeletePress={this.onDeletePress}
          onCancelPress={() => {
            this.setState({
              modalVisible: !this.state.modalVisible,
              editMode: !this.state.editMode,
            });
          }}
          isVisible={this.state.modalVisible}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    clients: state.user.user.clients,
    fetchUserLoading: state.user.fetchUserLoading,
    fetchUserError: state.user.fetchUserError,
    deleteClientLoading: state.user.deleteClientLoading,
    deleteClientError: state.user.deleteClientError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: any) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchDeleteClient: (clientId: any) =>
    dispatch({ type: DELETE_CLIENT.REQUESTED, payload: clientId }),
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
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.micro,
  },
  headerText: {
    fontSize: 30,
    color: Color.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
