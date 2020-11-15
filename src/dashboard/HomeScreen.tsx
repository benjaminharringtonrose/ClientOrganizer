import React, { Component } from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import { connect } from "react-redux";
import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";
import InputSearch from "../common/components/InputSearch";
import { searchTextChanged } from "../store/actions/UserActions";
import Card from "../common/components/Card";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CellIconActionable from "../common/components/CellIconActionable";
import firebase from "firebase";
import { Routes } from "../../navigation";
import CellLabelLeftRight from "../common/components/CellLabelLeftRight";
import { FETCH_USER_REQUEST } from "../store/actions/types";
import uuid from "uuid-random";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  seachText: string;
  user: string;
}

interface DispatchFromState {
  searchTextChanged: (text: string) => void;
  dispatchFetchUser: (user: any) => any;
}

interface LocalState {
  user: any;
  database: any;
  modalVisible: boolean;
}

type HomeScreenProps = PropsFromState & DispatchFromState & PassedProps;
class HomeScreen extends Component<HomeScreenProps, LocalState> {
  public state = {
    user: {
      clients: {},
    },
    database: undefined,
    modalVisible: false,
  };

  public componentDidMount() {
    this.props.dispatchFetchUser(firebase.auth().currentUser?.uid);
  }

  private onChangeSearchText = (text: string) => {
    this.props.searchTextChanged(text);
  };

  private onAddNewClientPress = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
    this.props.navigation.navigate(Routes.ADD_NEW_CLIENT_SCREEN);
  };

  // private onBackDropPress = () => {
  //   this.setState({ modalVisible: !this.state.modalVisible });
  // };

  private renderList = (clients: any) => {
    return clients.map((client: { address: any }) => {
      return <CellLabelLeftRight labelLeft={"howdy"} />;
    });
  };

  render() {
    const user: any = [this.state.user];
    const clients: any = [this.state.user.clients];
    console.log("USER ------", this.props.user);
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
          {clients.length > 0 ? (
            //   <FlatList
            //     style={{
            //       flex: 1,
            //       backgroundColor: Color.darkThemeGreyDark,
            //       paddingTop: Spacing.xlarge,
            //     }}
            //     data={clients}
            //     renderItem={(client: any) => (
            //       <Text style={{ color: Color.white }}>{client.name}</Text>
            //     )}
            //   />
            // ) : (
            //   <View
            //     style={{
            //       paddingVertical: Spacing.large,
            //       alignItems: "center",
            //       justifyContent: "center",
            //     }}
            //   >
            //     <Text style={{ color: Color.darkThemeGrey }}>
            //       {"No clients have been added yet."}
            //     </Text>
            //   </View>

            <ScrollView>{this.renderList(clients)}</ScrollView>
          ) : (
            <View
              style={{
                paddingVertical: Spacing.large,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: Color.darkThemeGrey }}>
                {"No clients have been added yet."}
              </Text>
            </View>
          )}
          <CellIconActionable
            iconLeftName={"plus"}
            iconLeftSize={24}
            labelRight={"add a new client"}
            onPress={this.onAddNewClientPress}
          />
        </Card>
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={this.onModalPress}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal> */}
      </View>
    );
  }
}

const mapStateToProps = ({ auth }: any) => {
  const { user } = auth;
  return { user };
};

const mapDispatchToProps = (dispatch: any) => ({
  searchTextChanged: (text: string) => dispatch(searchTextChanged(text)),
  dispatchFetchUser: (user: any) => dispatch({ type: FETCH_USER_REQUEST, payload: user }),
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
