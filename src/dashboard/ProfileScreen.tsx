import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import Button from "../common/components/Button";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";
import { LOGOUT_USER_REQUEST, FETCH_USER_REQUEST } from "../store/actions/types";
import firebase from "firebase";
import { Color } from "../common/styles/Colors";
import Spinner from "../common/components/Spinner";
import { Spacing } from "../common/styles/Spacing";
import CellLabelLeftRight from "../common/components/CellLabelLeftRight";
import { Routes } from "../../navigation";
require("firebase/firestore");

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  loading: boolean;
  error: boolean;
  fetchUserLoading: boolean;
  fetchUserError: any;
}
interface LocalState {
  user?: firebase.firestore.DocumentData;
}
interface DispatchFromState {
  dispatchLogoutRequest: (object: any) => any;
  dispatchFetchUser: (user: any) => any;
}

type ProfileScreenProps = PropsFromState & DispatchFromState & PassedProps;

class ProfileScreen extends React.Component<ProfileScreenProps, LocalState> {
  public state = {
    user: {
      avatar: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    },
  };

  public componentDidUpdate(oldProps: any) {
    if (oldProps.loading && !this.props.loading && !this.props.error) {
      this.props.navigation.navigate(Routes.LOGIN_SCREEN);
    }
  }

  private renderSignOutButton = () => {
    if (this.props.loading) {
      return <Spinner size="small" />;
    } else {
      return <Button label={"Sign Out"} onPress={this.onLogoutPress} />;
    }
  };

  private onLogoutPress = () => {
    this.props.dispatchLogoutRequest(LOGOUT_USER_REQUEST);
  };

  public render() {
    const { user } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Card>
          <Text style={styles.subHeaderText}>{"User Information"}</Text>
          <CellLabelLeftRight
            labelLeft={"Name"}
            labelRight={`${user?.firstName} ${user?.lastName}`}
          />
          <CellLabelLeftRight labelLeft={"Email"} labelRight={user?.email} />
          <Text style={styles.subHeaderText}>{"Preferences"}</Text>
          <CellLabelLeftRight labelLeft={"preference 1"} labelRight={"preference 1"} />
          <CellLabelLeftRight labelLeft={"preference 2"} labelRight={"preference 2"} />
          <CellLabelLeftRight labelLeft={"preference 3"} labelRight={"preference 3"} />
          <CardSection style={{ marginTop: Spacing.med }}>
            {this.renderSignOutButton()}
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    fetchUserLoading: state.user.user.fetchUserLoading,
    fetchUserError: state.user.user.fetchUserfetchUserError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchLogoutRequest: () => dispatch({ type: LOGOUT_USER_REQUEST }),
  dispatchFetchUser: (user: any) => dispatch({ type: FETCH_USER_REQUEST, payload: user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: Spacing.xxlarge,
  },
  avatarContainer: {
    paddingTop: Spacing.xxlarge,
    paddingBottom: Spacing.med,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  subHeaderText: {
    fontSize: 20,
    color: Color.white,
    paddingVertical: Spacing.xsmall,
    paddingLeft: Spacing.micro,
  },
});
