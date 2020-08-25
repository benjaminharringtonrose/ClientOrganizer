import React, { Component } from "react";
import { StyleSheet, StatusBar, View, Text } from "react-native";
import { connect } from "react-redux";
import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";
import InputSearch from "../common/components/InputSearch";
import { searchTextChanged } from "../store/actions/UserActions";
import Card from "../common/components/Card";
import { FlatList } from "react-native-gesture-handler";
import CellIconActionable from "../common/components/CellIconActionable";
import firebase from "firebase";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  seachText: string;
}

interface DispatchFromState {
  searchTextChanged: (text: string) => void;
}

interface LocalState {
  user: any;
}

type HomeScreenProps = PropsFromState & DispatchFromState & PassedProps;

class HomeScreen extends Component<HomeScreenProps, LocalState> {
  public state = {
    user: {
      clients: {},
    },
  };

  public componentDidMount() {
    const docRef = firebase
      .firestore()
      .collection("users")
      .doc(`${firebase.auth().currentUser?.uid}`);

    docRef
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          this.setState({ user: doc.data() });
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error: string) {
        console.log("Error getting document:", error);
      });
  }

  private onChangeSearchText = (text: string) => {
    this.props.searchTextChanged(text);
  };

  render() {
    const user: any = [this.state.user];
    const clients: any = [this.state.user.clients];
    console.log(user);
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
            <FlatList
              style={{
                flex: 1,
                backgroundColor: Color.darkThemeGreyDark,
                paddingTop: Spacing.xlarge,
              }}
              data={user.clients}
              renderItem={({ client }: any) => (
                <Text style={{ color: Color.white }}>{client[name]}</Text>
              )}
            />
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
            onPress={() => {}}
            style={{}}
          />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ user }: any) => {
  const { searchText } = user;
  return { searchText };
};

const mapDispatchToProps = (dispatch: any) => ({
  searchTextChanged: (text: string) => dispatch(searchTextChanged(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  subHeaderText: {
    fontSize: 20,
    color: Color.white,
    paddingLeft: Spacing.micro,
    marginTop: Spacing.xlarge,
  },
});
