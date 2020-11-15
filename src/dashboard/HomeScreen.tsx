import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
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
import CellLabelLeftRight from "../common/components/CellLabelLeftRight";
import { FETCH_USER_REQUEST } from "../store/actions/types";
import { clientNotesChanged } from "../store/actions";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  seachText: string;
  clients: any;
}

interface DispatchFromState {
  searchTextChanged: (text: string) => void;
  dispatchFetchUser: (uid: any) => any;
}

interface LocalState {
  clients: any;
  database: any;
  modalVisible: boolean;
}

export function mapClients(clients: any) {
  let acc: any = [];
  for (const [key, value] of Object.entries(clients)) {
    acc = acc.concat({ ...(value as Object), id: key });
  }
  return acc;
}

type HomeScreenProps = PropsFromState & DispatchFromState & PassedProps;
class HomeScreen extends Component<HomeScreenProps, LocalState> {
  public state = {
    clients: [],
    database: undefined,
    modalVisible: false,
  };

  public componentDidMount() {
    console.log("UUID -------", firebase.auth().currentUser?.uid);
    this.props.dispatchFetchUser({ uid: firebase.auth().currentUser?.uid });

    if (this.props.clients) {
      const mappedClients = mapClients(this.props.clients);
      this.setState({ clients: [...this.state.clients, ...mappedClients] });
    }
  }

  private onChangeSearchText = (text: string) => {
    this.props.searchTextChanged(text);
  };

  private onAddNewClientPress = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
    this.props.navigation.navigate(Routes.ADD_NEW_CLIENT_SCREEN);
  };

  private onBackDropPress = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  private renderItem = ({ item }: any) => {
    console.log("item.item", item);
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(Routes.CLIENT_DETAIL_SCREEN)}
      >
        <Text style={{ color: "#fff" }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX", this.props.clients);
    console.log("-----THIS.STATE.CLIENTS-------", this.state.clients);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Color.darkThemeGreyDark,
          paddingHorizontal: Spacing.med,
          paddingTop: Spacing.xxlarge,
        }}
      >
        <StatusBar barStyle={"light-content"} />
        <Text style={styles.subHeaderText}>{"Client Manager"}</Text>
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
          <CellIconActionable
            iconLeftName={"plus"}
            iconLeftSize={24}
            labelRight={"add a new client"}
            onPress={this.onAddNewClientPress}
          />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { clients } = state.user.user;
  return {
    clients,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  searchTextChanged: (text: string) => dispatch(searchTextChanged(text)),
  dispatchFetchUser: ({ uid }: any) =>
    dispatch({ type: FETCH_USER_REQUEST, payload: { uid } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  subHeaderText: {
    fontSize: 20,
    color: Color.white,
    paddingLeft: Spacing.micro,
    marginTop: Spacing.xlarge,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: Color.darkThemeBlueGrey,
    borderRadius: 20,
    paddingTop: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "100%",
    height: "50%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 3,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
