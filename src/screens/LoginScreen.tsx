import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { connect } from "react-redux";
import { LOGIN_USER } from "../store/actions/types";

import Card from "../common/components/Card";
import Input from "../common/components/Input";
import Button from "../common/components/Button";
import Spinner from "../common/components/Spinner";
import Header from "../common/components/Header";

import { Color, Spacing } from "../common/styles";
import Routes from "../navigation/routes";
import { Icon } from "react-native-elements";
import firebase from "firebase";
import { usePrevious } from "../hooks/usePrevious";

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

function LoginScreen(props: LoginScreenProps) {
  const [state, setState] = useState<LocalState>({
    email: "",
    password: "",
  });

  const oldProps = usePrevious(props);

  useEffect(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword("brtest@test.com", "password")
      .then(() => {
        console.log("Logged in");
        props.navigation.navigate(Routes.DASHBOARD_TABS);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (oldProps?.authLoading && !props.authLoading && !props.authError) {
      setState({ ...state, email: "", password: "" });
      props.navigation.navigate(Routes.DASHBOARD_TABS);
    }
  }, [props.authLoading, props.authError]);

  const onLoginPress = () => {
    const { email, password } = state;
    props.dispatchLoginRequest({ email, password });
    setState({ ...state, email: "", password: "" });
  };

  const renderLoginButton = () => {
    if (props.authLoading) {
      return <Spinner size="small" />;
    } else {
      return (
        <Button label={"Login"} onPress={onLoginPress} style={{ marginBottom: Spacing.large }} />
      );
    }
  };

  const renderError = () => {
    if (props.authError) {
      return (
        <View style={{ marginVertical: Spacing.small }}>
          <Text style={styles.errorTextStyle}>{props.authError}</Text>
        </View>
      );
    }
  };
  if (props.authLoading) {
    return null;
  }
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={"light-content"} />
      <Header title={"ClientManager"} description={"Welcome back!"} style={styles.greeting} />
      <ScrollView>
        <Card>
          <Input
            secureTextEntry={false}
            label="Email"
            onChangeText={(email: string) => setState({ ...state, email })}
            value={state.email}
            selectionColor={Color.greyMed}
            returnKeyType={"next"}
            style={{ marginBottom: Spacing.small }}
          />
          <Input
            secureTextEntry
            label="Password"
            onChangeText={(password: string) => setState({ ...state, password })}
            value={state.password}
            selectionColor={Color.greyMed}
            onSubmitEditting={() => onLoginPress()}
            returnKeyType={"go"}
            style={{ marginBottom: Spacing.large }}
          />
          {renderError()}
          {renderLoginButton()}
          <TouchableOpacity
            onPress={() => props.navigation.navigate(Routes.REGISTER_SCREEN)}
            style={{ alignItems: "center", flexDirection: "row", justifyContent: "flex-end" }}
          >
            <Text style={{ color: Color.warmGrey50, textAlign: "right", fontSize: 16 }}>
              {"Register here"}
            </Text>
            <Icon name={"arrow-forward"} color={Color.warmGrey50} size={18} />
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
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
    backgroundColor: Color.darkThemeGreyMed,
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
