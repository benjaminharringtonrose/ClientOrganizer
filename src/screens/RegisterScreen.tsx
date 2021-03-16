import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import {
  Card,
  Input,
  Button,
  Spinner,
  ButtonBack,
  Header,
  CardSection,
  ScreenContainer,
} from "../components";

import { REGISTER_USER, UPLOAD_AVATAR } from "../store/types";
import { Color, Spacing } from "../styles";

import Routes from "../navigation/routes";

import { usePrevious } from "../hooks/usePrevious";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  avatar?: string;
  user: any;
  authLoading: boolean;
  authError: boolean;
}
interface DispatchFromState {
  dispatchUploadAvatar: (uri: string) => any;
  dispatchRegisterRequest: (object: any) => any;
}

export interface IStringMap<T> {
  [x: string]: T;
}

interface LocalState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type RegisterScreenProps = PropsFromState & DispatchFromState & PassedProps;

function RegisterScreen(props: RegisterScreenProps) {
  const [state, setState] = useState<LocalState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const oldProps = usePrevious(props);

  useEffect(() => {
    if (oldProps?.authLoading && !props.authLoading && !props.authError) {
      props.navigation.navigate(Routes.DASHBOARD_TABS);
    }
  }, [props.authLoading, props.authError]);

  const onRegisterPress = () => {
    const { email, password, firstName, lastName } = state;

    props.dispatchRegisterRequest({
      firstName,
      lastName,
      email,
      password,
    });
  };

  const renderButton = () => {
    if (props.authLoading) {
      return <Spinner size="large" style={{ marginTop: Spacing.med }} />;
    }
    return (
      <CardSection>
        <Button label={"Signup"} onPress={onRegisterPress} style={styles.button} />
      </CardSection>
    );
  };

  const renderError = () => {
    if (props.authError) {
      return <Text style={styles.errorText}>{props.authError}</Text>;
    }
  };

  const { firstName, lastName, email, password } = state;

  return (
    <ScreenContainer>
      <Header
        title={"Chatty"}
        headerLeft={
          <ButtonBack
            onPress={() => props.navigation.goBack()}
            iconSize={24}
            iconColor={Color.white}
          />
        }
      />
      <Card>
        <Text style={styles.subHeaderText}>{"Register Here"}</Text>
        <CardSection>
          <Input
            label="First Name"
            placeholder="John"
            secureTextEntry={false}
            autoCapitalize={"words"}
            onChangeText={(firstName: string) => setState({ ...state, firstName })}
            value={firstName}
            style={{ marginBottom: Spacing.small }}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Last Name"
            placeholder="Smith"
            secureTextEntry={false}
            autoCapitalize={"words"}
            onChangeText={(lastName: string) => setState({ ...state, lastName })}
            value={lastName}
            style={{ marginBottom: Spacing.small }}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            secureTextEntry={false}
            onChangeText={(email: string) => setState({ ...state, email })}
            value={email}
            style={{ marginBottom: Spacing.small }}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={(password: string) => setState({ ...state, password })}
            value={password}
            style={{ marginBottom: Spacing.small }}
          />
        </CardSection>

        {renderError()}
        {renderButton()}
      </Card>
    </ScreenContainer>
  );
}

const mapStateToProps = ({ auth }: any) => {
  const { avatar, error, loading, user } = auth;
  return {
    avatar,
    authError: error,
    authLoading: loading,
    user,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchUploadAvatar: (result: string) =>
    dispatch({ type: UPLOAD_AVATAR.REQUESTED, payload: result }),
  dispatchRegisterRequest: ({ firstName, lastName, email, password }: any) => {
    dispatch({
      type: REGISTER_USER.REQUESTED,
      payload: {
        firstName,
        lastName,
        email,
        password,
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
    marginTop: Spacing.small,
    marginBottom: Spacing.xlarge,
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
    color: Color.white,
  },
  subHeaderText: {
    fontSize: 30,
    color: Color.warmGrey200,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.large,
    paddingLeft: Spacing.micro,
  },
});
