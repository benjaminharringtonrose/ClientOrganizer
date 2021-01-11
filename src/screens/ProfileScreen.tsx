import React from "react";
import { Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import UserPermissions from "../util/permissions";
import * as ImagePicker from "expo-image-picker";
import { avatarChanged } from "../store/actions";
import { LOGOUT_USER } from "../store/actions/types";
import firebase from "firebase";
import Spinner from "../common/components/Spinner";
import Button from "../common/components/Button";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import CellLabelLeftRight from "../common/components/CellLabelLeftRight";
import { Ionicons } from "@expo/vector-icons";
import { Color, Spacing } from "../common/styles";
import Routes from "../navigation/routes";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  loading: boolean;
  error: boolean;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
}
interface LocalState {
  user?: firebase.firestore.DocumentData;
}
interface DispatchFromState {
  dispatchLogoutRequest: (object: any) => any;
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

  private onPickAvatar = async () => {
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
    this.props.dispatchLogoutRequest(LOGOUT_USER.REQUESTED);
  };

  private renderSignOutButton = () => {
    if (this.props.loading) {
      return <Spinner size="small" />;
    } else {
      return <Button label={"Sign Out"} onPress={this.onLogoutPress} />;
    }
  };

  public render() {
    return (
      <ScrollView style={styles.container}>
        <Card>
          <TouchableOpacity style={styles.avatarPlaceholder} onPress={() => {}}>
            <Image source={{ uri: this.props.avatar }} style={styles.avatar} />
            <Ionicons name="ios-add" size={40} color="#FFF" style={styles.addIcon} />
          </TouchableOpacity>
          <Text style={styles.subHeaderText}>{"User Information"}</Text>
          <CellLabelLeftRight
            labelLeft={"Name"}
            labelRight={`${this.props.firstName} ${this.props.lastName}`}
          />
          <CellLabelLeftRight labelLeft={"Email"} labelRight={this.props.email} />
          <CardSection style={{ marginTop: Spacing.med }}>{this.renderSignOutButton()}</CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log("PROFILE SCREEN STATE", state);
  return {
    avatar: state.user.user.avatar,
    firstName: state.user.user.firstName,
    lastName: state.user.user.lastName,
    email: state.user.user.email,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchLogoutRequest: () => dispatch({ type: LOGOUT_USER.REQUESTED }),
  dispatchChangeAvatar: (result: string) => dispatch(avatarChanged(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: Spacing.xxlarge,
  },
  avatarPlaceholder: {
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: Color.darkThemeGreyMed,
    borderRadius: 60,
    marginVertical: Spacing.small,
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addIcon: {
    alignSelf: "center",
    marginTop: 38,
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
