import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView, Image, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import UserPermissions from "../util/permissions";
import * as ImagePicker from "expo-image-picker";
import { avatarChanged } from "../store/actions";
import { LOGOUT_USER, FETCH_USER } from "../store/actions/types";
import firebase from "firebase";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import Card from "../components/Card";
import CellLabelLeftRight from "../components/CellLabelLeftRight";
import { Ionicons } from "@expo/vector-icons";
import { Color, Spacing } from "../styles";
import Routes from "../navigation/routes";
import { usePrevious } from "../hooks/usePrevious";

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
  dispatchChangeAvatar: (text: string) => any;
}

type ProfileScreenProps = PropsFromState & DispatchFromState & PassedProps;

function ProfileScreen(props: ProfileScreenProps) {
  const prevProps = usePrevious(props);

  useEffect(() => {
    if (prevProps?.loading && !props.loading && !props.error) {
      props.navigation.navigate(Routes.LOGIN_SCREEN);
    }
  }, [props.loading, props.error]);
  const onLogoutPress = () => {
    props.dispatchLogoutRequest(LOGOUT_USER.REQUESTED);
  };

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      props.dispatchFetchUser(uid);
    }
  }, []);

  const renderSignOutButton = () => {
    if (props.loading) {
      return <Spinner size="small" />;
    } else {
      return <Button label={"Sign Out"} onPress={onLogoutPress} />;
    }
  };
  console.log("props.avatar", props.avatar);
  return (
    <ScrollView style={styles.container}>
      <Card>
        <View style={styles.avatarPlaceholder}>
          {props.avatar && <Image source={{ uri: props?.avatar }} style={styles.avatar} />}
          <Ionicons name="ios-add" size={40} color="#FFF" style={styles.addIcon} />
        </View>
        <Text style={styles.subHeaderText}>{"User Information"}</Text>
        <CellLabelLeftRight
          labelLeft={"Name"}
          labelRight={`${props.firstName} ${props.lastName}`}
          style={{ marginBottom: Spacing.small }}
        />
        <CellLabelLeftRight
          labelLeft={"Email"}
          labelRight={props.email}
          style={{ marginBottom: Spacing.large }}
        />
        {renderSignOutButton()}
      </Card>
    </ScrollView>
  );
}

const mapStateToProps = (state: any) => {
  // console.log("STATE", state.user.user.avatar);
  return {
    avatar: state.user.user.avatar,
    firstName: state.user.user.firstName,
    lastName: state.user.user.lastName,
    email: state.user.user.email,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: any) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchLogoutRequest: () => dispatch({ type: LOGOUT_USER.REQUESTED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyMed,
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
