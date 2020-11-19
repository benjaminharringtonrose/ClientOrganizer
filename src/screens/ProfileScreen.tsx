import React from "react";
import { Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Button from "../common/components/Button";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import { LOGOUT_USER_REQUESTED, FETCH_USER_REQUESTED } from "../store/actions/types";
import firebase from "firebase";
import { Color } from "../common/styles/Colors";
import Spinner from "../common/components/Spinner";
import { Ionicons } from "@expo/vector-icons";
import { Spacing } from "../common/styles/Spacing";
import CellLabelLeftRight from "../common/components/CellLabelLeftRight";
import { Routes } from "../../navigation";
require("firebase/firestore");
import UserPermissions from "../util/permissions";
import * as ImagePicker from "expo-image-picker";
import { avatarChanged } from "../store/actions";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  loading: boolean;
  error: boolean;
  fetchUserLoading: boolean;
  fetchUserError: any;
  avatar: string;
}
interface LocalState {
  user?: firebase.firestore.DocumentData;
}
interface DispatchFromState {
  dispatchLogoutRequest: (object: any) => any;
  dispatchFetchUser: (user: any) => any;
  dispatchChangeAvatar: (text: string) => any;
}

type ProfileScreenProps = PropsFromState & DispatchFromState & PassedProps;

class ProfileScreen extends React.Component<ProfileScreenProps, LocalState> {
  public state = {
    user: {
      avatar: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    },
  };

  public componentDidUpdate(oldProps: any) {
    if (oldProps.loading && !this.props.loading && !this.props.error) {
      this.props.navigation.navigate(Routes.LOGIN_SCREEN);
    }
  }

  onPickAvatar = async () => {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.props.dispatchChangeAvatar(result.uri);
    }
  };

  private onLogoutPress = () => {
    this.props.dispatchLogoutRequest(LOGOUT_USER_REQUESTED);
  };

  private renderSignOutButton = () => {
    if (this.props.loading) {
      return <Spinner size="small" />;
    } else {
      return <Button label={"Sign Out"} onPress={this.onLogoutPress} />;
    }
  };

  public render() {
    const { user } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Card>
          <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.onPickAvatar}>
            <Ionicons name="ios-add" size={40} color="#FFF" style={styles.addIcon} />
            <Image source={{ uri: this.props.avatar || undefined }} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.subHeaderText}>{"User Information"}</Text>
          <CellLabelLeftRight
            labelLeft={"Name"}
            labelRight={`${user?.firstName} ${user?.lastName}`}
          />
          <CellLabelLeftRight labelLeft={"Email"} labelRight={user?.email} />
          <Text style={styles.subHeaderText}>{"Preferences"}</Text>
          <CellLabelLeftRight labelLeft={"preference 1"} labelRight={"preference 1"} />
          <CellLabelLeftRight labelLeft={"preference 2"} labelRight={"preference 2"} />
          <CellLabelLeftRight labelLeft={"preference 3"} labelRight={"preference 3"} />
          <CardSection style={{ marginTop: Spacing.med }}>{this.renderSignOutButton()}</CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    avatar: state.auth,
    loading: state.auth.loading,
    error: state.auth.error,
    fetchUserLoading: state.user.user.fetchUserLoading,
    fetchUserError: state.user.user.fetchUserfetchUserError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchLogoutRequest: () => dispatch({ type: LOGOUT_USER_REQUESTED }),
  dispatchFetchUser: (user: any) => dispatch({ type: FETCH_USER_REQUESTED, payload: user }),
  dispatchChangeAvatar: (result: string) => dispatch(avatarChanged(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: Spacing.xxlarge,
  },
  // avatarContainer: {
  //   paddingTop: Spacing.xxlarge,
  //   paddingBottom: Spacing.med,
  //   backgroundColor: Color.darkThemeGreyMed,
  // },
  avatarPlaceholder: {
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: Color.darkThemeGreyMed,
    borderRadius: 60,
    marginVertical: Spacing.small,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  addIcon: {
    alignSelf: "center",
    marginTop: 40,
    marginLeft: 2,
    color: Color.greyLight,
  },
  subHeaderText: {
    fontSize: 20,
    color: Color.white,
    paddingVertical: Spacing.xsmall,
    paddingLeft: Spacing.micro,
  },
});
