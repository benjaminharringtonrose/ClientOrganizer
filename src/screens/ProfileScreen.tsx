import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { connect } from "react-redux";
import { LOGOUT_USER, FETCH_USER, UPLOAD_AVATAR } from "../store/types";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import {
  ScreenContainer,
  Card,
  CardSection,
  Spinner,
  Button,
  CellLabelLeftRight,
} from "../components";

import { Color, Spacing } from "../styles";
import UserPermissions from "../utilities/UserPermissions";

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

interface DispatchFromState {
  dispatchFetchUser: (uid: string) => any;
  dispatchLogoutRequest: (object: any) => any;
  dispatchUploadAvatar: (avatarUri: string) => any;
}

type ProfileScreenProps = PropsFromState & DispatchFromState & PassedProps;

interface ILocalState {
  avatarUri?: string;
}

function ProfileScreen(props: ProfileScreenProps) {
  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      props.dispatchFetchUser(uid);
    }
  }, []);

  const onLogoutPress = () => {
    props.dispatchLogoutRequest(LOGOUT_USER.REQUESTED);
  };

  const renderSignOutButton = () => {
    if (props.loading) {
      return <Spinner size="small" color={Color.white} />;
    } else {
      return (
        <CardSection>
          <Button label={"Sign Out"} onPress={onLogoutPress} />
        </CardSection>
      );
    }
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
        props.dispatchUploadAvatar(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenContainer>
      <Card>
        <TouchableOpacity style={styles.avatarPlaceholder} onPress={onPickAvatar}>
          {!!props.avatar && <Image source={{ uri: props.avatar }} style={styles.avatar} />}
          <Ionicons name="ios-add" size={40} color="#FFF" style={styles.addIcon} />
        </TouchableOpacity>
        <Text style={styles.subHeaderText}>{"User Information"}</Text>
        <CardSection>
          <CellLabelLeftRight
            labelLeft={"Name"}
            labelRight={`${props.firstName} ${props.lastName}`}
            style={{ marginBottom: Spacing.micro }}
          />
        </CardSection>
        <CardSection>
          <CellLabelLeftRight
            labelLeft={"Email"}
            labelRight={props.email}
            style={{ marginBottom: Spacing.large }}
          />
        </CardSection>

        {renderSignOutButton()}
      </Card>
    </ScreenContainer>
  );
}

const mapStateToProps = (state: any) => {
  console.log("STATE", state.user);
  return {
    avatar: state.user?.user?.avatar,
    firstName: state.user?.user?.firstName,
    lastName: state.user?.user?.lastName,
    email: state.user?.user?.email,
    loading: state.auth.loading,
    error: state.auth?.error,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: any) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchLogoutRequest: () => dispatch({ type: LOGOUT_USER.REQUESTED }),
  dispatchUploadAvatar: (avatarUri: any) =>
    dispatch({ type: UPLOAD_AVATAR.REQUESTED, payload: avatarUri }),
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
    fontSize: 30,
    color: Color.warmGrey200,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.large,
    paddingLeft: Spacing.micro,
  },
});
