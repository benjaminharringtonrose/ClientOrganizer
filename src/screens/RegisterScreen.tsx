import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect } from "react-redux";
import UserPermissions from "../utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";

import { Card, Input, Button, Spinner } from "../components";
import { Ionicons } from "@expo/vector-icons";

import { REGISTER_USER } from "../store/actions/types";
import { avatarChanged } from "../store/actions";
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
  dispatchChangeAvatar: (text: string) => any;
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
    const { avatar } = props;

    props.dispatchRegisterRequest({
      email,
      password,
      firstName,
      lastName,
      avatar,
    });
  };

  const onPickAvatar = async () => {
    try {
      UserPermissions.getCameraPermission();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        props.dispatchChangeAvatar(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderButton = () => {
    if (props.authLoading) {
      return <Spinner size="large" style={{ marginTop: Spacing.med }} />;
    }
    return <Button label={"Signup"} onPress={onRegisterPress} style={styles.button} />;
  };

  const renderError = () => {
    if (props.authError) {
      return <Text style={styles.errorText}>{props.authError}</Text>;
    }
  };

  const { firstName, lastName, email, password } = state;
  const { avatar } = props;

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView>
        <Card>
          <TouchableOpacity style={styles.avatarPlaceholder} onPress={onPickAvatar}>
            {!!avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
            <Ionicons name="ios-add" size={40} color="#FFF" style={styles.addIcon} />
          </TouchableOpacity>
          <Input
            label="First Name"
            placeholder="John"
            secureTextEntry={false}
            autoCapitalize={"words"}
            onChangeText={(firstName: string) => setState({ ...state, firstName })}
            value={firstName}
            style={{ marginBottom: Spacing.small }}
          />
          <Input
            label="Last Name"
            placeholder="Smith"
            secureTextEntry={false}
            autoCapitalize={"words"}
            onChangeText={(lastName: string) => setState({ ...state, lastName })}
            value={lastName}
            style={{ marginBottom: Spacing.small }}
          />
          <Input
            label="Email"
            placeholder="email@gmail.com"
            secureTextEntry={false}
            onChangeText={(email: string) => setState({ ...state, email })}
            value={email}
            style={{ marginBottom: Spacing.small }}
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={(password: string) => setState({ ...state, password })}
            value={password}
            style={{ marginBottom: Spacing.small }}
          />
          {renderError()}
          {renderButton()}
        </Card>
      </ScrollView>
    </SafeAreaView>
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
  dispatchChangeAvatar: (result: string) => dispatch(avatarChanged(result)),
  dispatchRegisterRequest: ({ email, password, firstName, lastName, avatar }: any) => {
    dispatch({
      type: REGISTER_USER.REQUESTED,
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
});
