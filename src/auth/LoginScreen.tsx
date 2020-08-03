import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import Spinner from "../common/components/Spinner";
import { emailChanged, passwordChanged } from "../store/actions/AuthActions";
import { LOGIN_USER_REQUEST } from "../store/actions/types";
import Header from "../common/components/Header";
import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";

interface PropsFromState {
  email: string;
  password: string;
  loading: boolean;
  error: boolean;
}
interface DispatchFromState {
  emailChanged: (text: string) => void;
  passwordChanged: (text: string) => void;
  dispatchLoginRequest: (object: any) => any;
}

type LoginScreenProps = PropsFromState & DispatchFromState;

class LoginScreen extends Component<LoginScreenProps> {
  private onEmailChange = (text: string) => {
    this.props.emailChanged(text);
  };

  private onPasswordChange = (text: string) => {
    this.props.passwordChanged(text);
  };

  private onLoginPress = () => {
    const { email, password } = this.props;
    this.props.dispatchLoginRequest({ email, password });
  };

  private renderLoginButton = () => {
    if (this.props.loading) {
      return <Spinner size="large" style={{ marginTop: Spacing.small }} />;
    } else {
      return <Button label={"Login"} onPress={this.onLoginPress} />;
    }
  };

  private renderError = () => {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: "transparent", marginVertical: Spacing.small }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  };

  //----------------------------------

  public render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title={"ClientOrganizer"}
          description={"Welcome back!"}
          style={styles.greeting}
        />
        <ScrollView>
          <Card style={{ flex: 1 }}>
            <CardSection>
              <Input
                secureTextEntry={false}
                label="Email"
                onChangeText={this.onEmailChange}
                value={this.props.email}
              />
            </CardSection>

            <CardSection>
              <Input
                secureTextEntry
                label="Password"
                onChangeText={this.onPasswordChange}
                value={this.props.password}
              />
            </CardSection>
            {this.renderError()}
            <CardSection>{this.renderLoginButton()}</CardSection>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }: any) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

const mapDispatchToProps = (dispatch: any) => ({
  emailChanged: (text: string) => dispatch(emailChanged(text)),
  passwordChanged: (text: string) => dispatch(passwordChanged(text)),
  dispatchLoginRequest: ({ email, password }: any) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
      payload: { email, password },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Color.darkThemeGreyDark,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: Color.error,
  },
  greeting: {
    flex: 0.4,
    textAlign: "center",
    paddingTop: Spacing.xxlarge,
  },
  button: {
    marginVertical: Spacing.med,
    paddingVertical: Spacing.small,
  },
  getStartedTouchableContainer: {
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: Spacing.xxlarge,
  },
});
