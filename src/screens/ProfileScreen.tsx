import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity, ActivityIndicator } from "react-native";
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
  Header,
} from "../components";

import { Color, Spacing } from "../styles";
import UserPermissions from "../utilities/UserPermissions";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  authLoading: boolean;
  uploadAvatarLoading: boolean;
  uploadAvatarError?: any;
}

interface DispatchFromState {
  dispatchFetchUser: (uid: string) => any;
  dispatchLogoutRequest: (object: any) => any;
  dispatchUploadAvatar: (avatarUri: string) => any;
}

type ProfileScreenProps = PropsFromState & DispatchFromState & PassedProps;

interface ILocalState {
  imageLoading: boolean;
}

function ProfileScreen(props: ProfileScreenProps) {
  const [state, setState] = useState<ILocalState>({
    imageLoading: true,
  });

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
    if (props.authLoading) {
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
      console.warn(error);
    }
  };

  const onLoadEnd = () => {
    setState({ ...state, imageLoading: false });
  };

  return (
    <ScreenContainer>
      <Header />
      <Card>
        <TouchableOpacity style={styles.avatarPlaceholder} onPress={onPickAvatar}>
          <View>
            <Image style={styles.avatar} onLoadEnd={onLoadEnd} source={{ uri: props.avatar }} />
            {state.imageLoading && (
              <ActivityIndicator
                animating={state.imageLoading}
                color={Color.white}
                style={{
                  flex: 1,
                  marginTop: 60,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            )}
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: props.uploadAvatarLoading ? Color.black : Color.primary,
                borderRadius: 20,
                borderColor: Color.black,
                borderWidth: 5,
              }}
            >
              {props.uploadAvatarLoading ? (
                <ActivityIndicator size={30} color={Color.white} />
              ) : (
                <Ionicons name="ios-add" size={30} color={Color.white} style={styles.addIcon} />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.subHeaderText}>{"User Profile"}</Text>
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
  return {
    avatar: state.user?.user?.avatar,
    firstName: state.user?.user?.firstName,
    lastName: state.user?.user?.lastName,
    email: state.user?.user?.email,
    authLoading: state.auth.loading,
    authError: state.auth?.error,
    uploadAvatarLoading: state.user?.uploadAvatarLoading,
    uploadAvatarError: state.user?.uploadAvatarError,
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
    width: 120,
    height: 120,
    alignSelf: "center",
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
