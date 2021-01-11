import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { connect } from "react-redux";
import { LOGIN_USER } from "../store/actions/types";

import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import Spinner from "../common/components/Spinner";
import Header from "../common/components/Header";

import { Color, Spacing } from "../common/styles";
import Routes from "../navigation/routes";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  authLoading: boolean;
  authError: boolean;
}
interface DispatchFromState {
  dispatchLoginRequest: (object: any) => any;
}

interface LocalState {
  email: string;
  password: string;
}

type LoginScreenProps = PropsFromState & DispatchFromState & PassedProps;

class LoginScreen extends Component<LoginScreenProps, LocalState> {
  public state = {
    email: "",
    password: "",
  };

  componentDidUpdate(oldProps: any) {
    if (oldProps.authLoading && !this.props.authLoading && !this.props.authError) {
      this.setState({ email: "", password: "" });
      this.props.navigation.navigate(Routes.DASHBOARD_TABS);
    }
    if (oldProps.authError !== this.props.authError) {
      if (this.props.authError) {
        this.setState({ password: "" });
      }
    }
  }

  private onLoginPress = () => {
    const { email, password } = this.state;
    this.props.dispatchLoginRequest({ email, password });
  };

  private renderLoginButton = () => {
    if (this.props.authLoading) {
      return <Spinner size="small" />;
    } else {
      return <Button label={"Login"} onPress={this.onLoginPress} />;
    }
  };

  private renderError = () => {
    if (this.props.authError) {
      return (
        <View style={{ backgroundColor: "transparent", marginVertical: Spacing.small }}>
          <Text style={styles.errorTextStyle}>{this.props.authError}</Text>
        </View>
      );
    }
  };

  public render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle={"light-content"} />
        <Header title={"ClientManager"} description={"Welcome back!"} style={styles.greeting} />
        <ScrollView>
          <Card style={{ flex: 1 }}>
            <CardSection>
              <Input
                secureTextEntry={false}
                label="Email"
                onChangeText={(email: string) => this.setState({ email })}
                value={this.state.email}
                selectionColor={Color.greyMed}
                returnKeyType={"next"}
              />
            </CardSection>
            <CardSection>
              <Input
                secureTextEntry
                label="Password"
                onChangeText={(password: string) => this.setState({ password })}
                value={this.state.password}
                selectionColor={Color.greyMed}
                onSubmitEditting={() => this.onLoginPress()}
                returnKeyType={"go"}
              />
            </CardSection>
            {this.renderError()}
            <CardSection>{this.renderLoginButton()}</CardSection>
            <TouchableOpacity>
              <Text
                style={{ color: "white" }}
                onPress={() => this.props.navigation.navigate(Routes.REGISTER_SCREEN)}
              >
                {"Register here"}
              </Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    authError: state.auth.error,
    authLoading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchLoginRequest: ({ email, password }: any) => {
    dispatch({
      type: LOGIN_USER.REQUESTED,
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
