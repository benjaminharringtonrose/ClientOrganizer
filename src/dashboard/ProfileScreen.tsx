import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Button from "../common/components/Button";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import { LOGOUT_USER_REQUEST, FETCH_USER_REQUEST } from "../store/actions/types";
import firebase from "firebase";
import { Color } from "../common/styles/Colors";
import { AntDesign } from "@expo/vector-icons";
import { getUserById, getDocRef } from "./util";
import Spinner from "../common/components/Spinner";
import { Spacing } from "../common/styles/Spacing";
import Avatar from "../common/components/Avatar";
import CellLabelLeftRight from "../common/components/CellLabelLeftRight";
require("firebase/firestore");

interface PropsFromState {
  loading: boolean;
  error: any;
}
interface LocalState {
  user?: firebase.firestore.DocumentData;
  unsubscribe: () => void | null;
}
interface DispatchFromState {
  dispatchLogoutRequest: (object: any) => any;
  dispatchFetchUser: (user: any) => any;
}

type ProfileScreenProps = PropsFromState & DispatchFromState;

class ProfileScreen extends React.Component<ProfileScreenProps, LocalState> {
  constructor(props: ProfileScreenProps) {
    super(props);
    const userId = firebase.auth().currentUser?.uid;
    this.state = {
      user: {
        avatar: undefined,
        firstName: undefined,
        lastName: undefined,
        category: undefined,
        subcategory: undefined,
        subsubcategory: undefined,
        age: undefined,
      },
      unsubscribe: firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .onSnapshot((doc) => {
          this.setState({ user: doc.data() });
        }),
    };
  }

  public componentDidMount() {
    if (this.state.unsubscribe) {
      this.state.unsubscribe();
    }

    const docRef = getDocRef();
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

  public componentWillUnmount() {
    this.state.unsubscribe();
  }

  private onLogoutPress = () => {
    this.props.dispatchLogoutRequest(LOGOUT_USER_REQUEST);
  };

  public render() {
    const { loading } = this.props;
    const { user } = this.state;
    console.log(user);
    if (!user) {
      return <View style={{ backgroundColor: Color.darkThemeGreyDark }} />;
    }
    return (
      <View style={styles.container}>
        <Card>
          {!user?.avatar || loading ? (
            <Spinner size={800} color={Color.white} />
          ) : (
            <View style={styles.avatarContainer}>
              <Avatar uri={user?.avatar} size={800} color={Color.white} />
            </View>
          )}
          <Text style={styles.subHeaderText}>{"User Information"}</Text>
          <CellLabelLeftRight
            labelLeft={"Name"}
            labelRight={`${user?.firstName} ${user?.lastName}`}
          />
          <Text style={styles.subHeaderText}>{"Preferences"}</Text>
          <CellLabelLeftRight labelLeft={"Interests"} labelRight={user.subcategory} />
          <CellLabelLeftRight labelLeft={"Type"} labelRight={user.subsubcategory} />
          <CellLabelLeftRight labelLeft={"Age Range"} labelRight={user.age} />
          <CardSection>
            <Button label={"Sign Out"} onPress={this.onLogoutPress} />
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ users }: any) => {
  const { loading, error } = users;
  return { loading, error };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchLogoutRequest: () => dispatch({ type: LOGOUT_USER_REQUEST }),
  dispatchFetchUser: (user: any) => dispatch({ type: FETCH_USER_REQUEST, payload: user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
  },
  avatarContainer: {
    paddingTop: Spacing.xxlarge,
    paddingBottom: Spacing.med,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  subHeaderText: {
    fontSize: 20,
    color: Color.white,
    paddingVertical: Spacing.xsmall,
    paddingLeft: Spacing.micro,
  },
});
