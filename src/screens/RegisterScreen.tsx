import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import Spinner from "../common/components/Spinner";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { REGISTER_USER_REQUESTED } from "../store/actions/types";
import {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  passwordChanged,
  avatarChanged,
} from "../store/actions";
import { Color, Spacing } from "../common/styles";
import Header from "../common/components/Header";
import { Routes } from "../navigation/routes";
import UserPermissions from "../util/permissions";
import * as ImagePicker from "expo-image-picker";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  firstName: string;
  lastName: string;
  avatar?: string;
  user: any;
  email: string;
  password: string;
  authLoading: boolean;
  authError: boolean;
}
interface DispatchFromState {
  emailChanged: (text: string) => any;
  passwordChanged: (text: string) => any;
  firstNameChanged: (text: string) => any;
  lastNameChanged: (text: string) => any;
  dispatchChangeAvatar: (text: string) => any;
  dispatchRegisterRequest: (object: any) => any;
}

type RegisterScreenProps = PropsFromState & DispatchFromState & PassedProps;

class RegisterScreen extends Component<RegisterScreenProps> {
  componentDidUpdate(oldProps: any) {
    if (oldProps.authLoading && !this.props.authLoading && !this.props.authError) {
      this.props.navigation.navigate(Routes.DASHBOARD_TABS);
    }
  }

  private onRegisterPress = () => {
    const { email, password, firstName, lastName, avatar } = this.props;

    this.props.dispatchRegisterRequest({
      email,
      password,
      firstName,
      lastName,
      avatar,
    });
  };

  onPickAvatar = async () => {
    try {
      UserPermissions.getCameraPermission();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        console.log("true");
        this.props.dispatchChangeAvatar(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  private renderButton = () => {
    if (this.props.authLoading) {
      return <Spinner size="large" style={{ marginTop: Spacing.med }} />;
    }
    return <Button label={"Signup"} onPress={this.onRegisterPress} style={styles.button} />;
  };

  renderError() {
    if (this.props.authError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{this.props.authError}</Text>
        </View>
      );
    }
  }

  render() {
    const { firstName, lastName, email, password, avatar } = this.props;

    return (
      <SafeAreaView style={styles.rootContainer}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Header title={"Welcome!"} description={"Sign up to get started."} />
          </View>
          <Card>
            <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.onPickAvatar}>
              {!!avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
              <Ionicons name="ios-add" size={40} color="#FFF" style={styles.addIcon} />
            </TouchableOpacity>
            <CardSection>
              <Input
                label="First Name"
                placeholder="John"
                placeholderTextColor={Color.greyMedDark}
                secureTextEntry={false}
                autoCapitalize={"words"}
                onChangeText={(newText: string) => this.props.firstNameChanged(newText)}
                value={firstName}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Last Name"
                placeholder="Smith"
                placeholderTextColor={Color.greyMedDark}
                secureTextEntry={false}
                autoCapitalize={"words"}
                onChangeText={(newText: string) => this.props.lastNameChanged(newText)}
                value={lastName}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Email"
                placeholder="email@gmail.com"
                placeholderTextColor={Color.greyMedDark}
                secureTextEntry={false}
                onChangeText={(newText: string) => this.props.emailChanged(newText)}
                value={email}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label="Password"
                placeholder="password"
                placeholderTextColor={Color.greyMedDark}
                onChangeText={(newText: string) => this.props.passwordChanged(newText)}
                value={password}
              />
            </CardSection>
            {this.renderError()}
            {this.renderButton()}
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ auth }: any) => {
  const { firstName, lastName, email, password, avatar, error, loading, user } = auth;
  return {
    firstName,
    lastName,
    avatar,
    email,
    password,
    authError: error,
    authLoading: loading,
    user,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  firstNameChanged: (firstName: string) => dispatch(firstNameChanged(firstName)),
  lastNameChanged: (lastName: string) => dispatch(lastNameChanged(lastName)),
  emailChanged: (email: string) => dispatch(emailChanged(email)),
  passwordChanged: (password: string) => dispatch(passwordChanged(password)),
  dispatchChangeAvatar: (result: string) => dispatch(avatarChanged(result)),
  dispatchRegisterRequest: ({ email, password, firstName, lastName, avatar }: any) => {
    dispatch({
      type: REGISTER_USER_REQUESTED,
      payload: {
        email,
        password,
        firstName,
        lastName,
        avatar,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
  },
  headerContainer: {
    paddingTop: Spacing.xxlarge,
  },
  button: {
    marginVertical: Spacing.med,
    paddingVertical: Spacing.small,
  },
  errorContainer: {
    backgroundColor: Color.darkThemeGreyDark,
  },
  errorText: {
    fontSize: 12,
    alignSelf: "center",
    color: "red",
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
});
