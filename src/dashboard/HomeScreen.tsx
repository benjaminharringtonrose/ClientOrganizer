import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Modal,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
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
import { FETCH_USER_REQUEST, DELETE_CLIENT } from "../store/actions/types";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { mapClients } from "./util";
import Button from "../common/components/Button";
import CardSection from "../common/components/CardSection";

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
  clients: any;
  modalVisible: boolean;
  editMode: boolean;
  clientId?: string;
}

type HomeScreenProps = PropsFromState & DispatchFromState & PassedProps;
class HomeScreen extends Component<HomeScreenProps, LocalState> {
  public state = {
    clients: [],
    database: undefined,
    modalVisible: false,
    editMode: false,
    clientId: undefined,
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
        this.setState({ clients: [...mappedClients] });
      }
    }
  }

  private onChangeSearchText = (text: string) => {
    this.props.searchTextChanged(text);
  };

  private toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  private onAddNewClientPress = () => {
    this.props.navigation.navigate(Routes.ADD_NEW_CLIENT_SCREEN);
  };

  private onDeletePress = () => {
    this.props.dispatchDeleteClientRequested();
    const uid = firebase.auth().currentUser?.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set(
        {
          clients: {
            [this.state.clientId!]: firebase.firestore.FieldValue.delete(),
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
      modalVisible: !this.state.modalVisible,
      editMode: !this.state.editMode,
    });
  };

  private renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subHeaderText}>{"Client Manager"}</Text>
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
        <TouchableOpacity style={{}} onPress={this.toggleEditMode}>
          <Icon
            style={{}}
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
      <ScrollView style={styles.rootContainer}>
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
            {loading ? (
              <View
                style={{
                  flex: 1,

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
        </>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <Card>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {"Are you sure you want to delete this client?"}
                </Text>
                <CardSection>
                  <Button label={"Delete"} onPress={this.onDeletePress} />
                </CardSection>
                <CardSection>
                  <Button
                    label={"Cancel"}
                    onPress={() => {
                      this.setState({
                        modalVisible: !this.state.modalVisible,
                        editMode: !this.state.editMode,
                      });
                    }}
                  />
                </CardSection>
              </View>
            </Card>
          </View>
        </Modal>
      </ScrollView>
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
  //modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 100,
    backgroundColor: Color.darkThemeGrey,
    borderRadius: 3,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
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
    color: "white",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
