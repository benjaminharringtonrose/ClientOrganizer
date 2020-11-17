import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import Spinner from "../common/components/Spinner";
import { connect } from "react-redux";
import { REGISTER_USER_REQUESTED } from "../store/actions/types";
import {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  passwordChanged,
  avatarChanged,
} from "../store/actions";
import { Color } from "../common/styles/Colors";
import { Spacing } from "../common/styles/Spacing";
import Header from "../common/components/Header";
import { Routes } from "../../navigation";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  firstName: string;
  lastName: string;
  avatar: string;
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
  avatarChanged: (text: string) => any;
  dispatchRegisterRequest: (object: any) => any;
}

type RegisterScreenProps = PropsFromState & DispatchFromState & PassedProps;

class RegisterScreen extends Component<RegisterScreenProps> {
  componentDidUpdate(oldProps: any) {
    if (oldProps.authLoading && !this.props.authLoading && !this.props.authError) {
      this.props.navigation.navigate(Routes.DASHBOARD_TABS);
    }
  }

  public componentDidMount() {}
  private onEmailChange = (email: string) => {
    this.props.emailChanged(email);
  };

  private onFirstNameChange = (firstName: string) => {
    this.props.firstNameChanged(firstName);
  };

  private onLastNameChange = (lastName: string) => {
    this.props.lastNameChanged(lastName);
  };

  private onPasswordChange = (password: string) => {
    this.props.passwordChanged(password);
  };

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

  private renderButton = () => {
    if (this.props.authLoading) {
      return <Spinner size="large" style={{ marginTop: Spacing.med }} />;
    }
    return (
      <Button label={"Signup"} onPress={this.onRegisterPress} style={styles.button} />
    );
  };

  renderError() {
    if (this.props.authError) {
      return (
        <View style={{ backgroundColor: Color.darkThemeGreyDark }}>
          <Text style={styles.errorTextStyle}>{this.props.authError}</Text>
        </View>
      );
    }
  }

  render() {
    const { firstName, lastName, email, password } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: Color.darkThemeGreyDark }}>
        <Header
          style={styles.greeting}
          title={"Welcome!"}
          description={"Sign up to get started."}
        />
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: Color.darkThemeGreyDark,
            paddingTop: Spacing.small,
          }}
        >
          <Card>
            <CardSection>
              <Input
                label="First Name"
                placeholder="John"
                placeholderTextColor={Color.greyMedDark}
                secureTextEntry={false}
                onChangeText={this.onFirstNameChange}
                value={firstName}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Last Name"
                placeholder="Smith"
                placeholderTextColor={Color.greyMedDark}
                secureTextEntry={false}
                onChangeText={this.onLastNameChange}
                value={lastName}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Email"
                placeholder="email@gmail.com"
                placeholderTextColor={Color.greyMedDark}
                secureTextEntry={false}
                onChangeText={this.onEmailChange}
                value={email}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label="Password"
                placeholder="password"
                placeholderTextColor={Color.greyMedDark}
                onChangeText={this.onPasswordChange}
                value={password}
              />
            </CardSection>
            {this.renderError()}
            {this.renderButton()}
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }: any) => {
  const { firstName, lastName, avatar, email, password, error, loading, user } = auth;
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
  avatarChanged: (result: string) => dispatch(avatarChanged(result)),
  dispatchRegisterRequest: ({
    email,
    password,
    firstName,
    lastName,
    avatar,
    user,
  }: any) => {
    dispatch({
      type: REGISTER_USER_REQUESTED,
      payload: {
        email,
        password,
        firstName,
        lastName,
        avatar,
        user,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red",
  },
  greeting: {
    flex: 0.3,
    textAlign: "center",
  },
  avatarPlaceholder: {
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: Color.darkThemeGreyMed,
    borderRadius: 60,
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
  button: {
    marginVertical: Spacing.med,
    paddingVertical: Spacing.small,
  },
  loginTouchableContainer: {
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: Spacing.xxlarge,
  },
});
