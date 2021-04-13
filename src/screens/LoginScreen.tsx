import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { LOGIN_USER, IError } from "../store/types";
import { Color, Spacing } from "../styles";
import { Routes } from "../navigation/routes";
import { Icon } from "react-native-elements";
import { Card, CardSection, ScreenContainer, Header, Input, Button, Spinner } from "../components";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthParamList } from "../navigation/navigation";
import { IStoreState } from "../store/store";

interface IPassedProps {
  navigation: StackNavigationProp<AuthParamList, Routes.LOGIN_SCREEN>;
}

interface IPropsFromState {
  loginLoading: boolean;
  loginError?: IError;
}
interface IDispatchFromState {
  dispatchLoginRequest: (object: any) => any;
}

interface ILocalState {
  email: string;
  password: string;
}

type LoginScreenProps = IPropsFromState & IDispatchFromState & IPassedProps;

function LoginScreen(props: LoginScreenProps) {
  const [state, setState] = useState<ILocalState>({
    email: "",
    password: "",
  });

  const onLoginPress = () => {
    const { email, password } = state;
    props.dispatchLoginRequest({ email, password });
    setState({ ...state, password: "" });
  };

  const renderLoginButton = () => {
    if (props.loginLoading) {
      return <Spinner size="small" color={Color.white} />;
    } else {
      return (
        <CardSection>
          <Button label={"Login"} onPress={onLoginPress} style={{ marginBottom: Spacing.small }} />
        </CardSection>
      );
    }
  };

  const renderError = () => {
    if (props.loginError) {
      return (
        <View style={{ marginVertical: Spacing.small }}>
          <Text style={styles.errorTextStyle}>{props.loginError.message}</Text>
        </View>
      );
    }
  };

  return (
    <ScreenContainer>
      <Card>
        <CardSection style={{ flexDirection: "column", paddingTop: Spacing.xxlarge }}>
          <Text style={{ color: Color.white, fontSize: 36, paddingBottom: 10 }}>{"Welcome"}</Text>
          <Text style={{ color: Color.white, fontSize: 20, paddingBottom: Spacing.xxlarge }}>
            {"Log into your account"}
          </Text>
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry={false}
            label="Email"
            onChangeText={(email: string) => setState({ ...state, email })}
            value={state.email}
            selectionColor={Color.greyMed}
            returnKeyType={"next"}
            style={{ marginBottom: Spacing.micro }}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            onChangeText={(password: string) => setState({ ...state, password })}
            value={state.password}
            selectionColor={Color.greyMed}
            onSubmitEditting={() => onLoginPress()}
            returnKeyType={"go"}
            style={{ marginBottom: Spacing.small }}
          />
        </CardSection>
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
    </ScreenContainer>
  );
}

const mapStateToProps = (state: IStoreState) => {
  return {
    authError: state.auth?.loginLoading,
    authLoading: state.auth.loginError,
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
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: Color.error,
  },
});
