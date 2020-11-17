import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar } from "react-native";
import { Color } from "../common/styles/Colors";
import { Spacing } from "../common/styles/Spacing";
import SubHeader from "../common/components/SubHeader";
import Input from "../common/components/Input";
import CardSection from "../common/components/CardSection";
import Card from "../common/components/Card";
import Button from "../common/components/Button";
import { Routes } from "../../navigation";
import firebase from "firebase";
import uuid from "uuid-random";
import { connect } from "react-redux";
import { FETCH_USER_REQUESTED } from "../store/actions/types";
import Spinner from "../common/components/Spinner";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  fetchUserLoading: boolean;
  fetchUserError: boolean;
}

interface DispatchFromState {
  dispatchFetchUser: (uid: any) => any;
}

interface LocalState {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  budgetLow: string;
  budgetHigh: string;
  preferredAreas: string;
  notes: string;
}

type AddNewClientScreenProps = PassedProps & PropsFromState & DispatchFromState;

class AddNewClientScreen extends Component<AddNewClientScreenProps, LocalState> {
  public state = {
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    budgetLow: "",
    budgetHigh: "",
    preferredAreas: "",
    notes: "",
  };

  public componentDidUpdate(oldProps: any) {
    if (
      oldProps.fetchUserLoading &&
      !this.props.fetchUserLoading &&
      !this.props.fetchUserError
    ) {
      this.props.navigation.navigate(Routes.HOME_SCREEN);
    }
  }

  private renderLoginButton = () => {
    if (this.props.fetchUserLoading) {
      return <Spinner size="small" />;
    } else {
      return <Button label={"Save"} onPress={this.onSubmit} />;
    }
  };

  private onSubmit = () => {
    const { dispatchFetchUser } = this.props;

    const {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      budgetLow,
      budgetHigh,
      preferredAreas,
      notes,
    } = this.state;

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .set(
        {
          clients: {
            [uuid()]: {
              firstName,
              lastName,
              address,
              phoneNumber,
              email,
              budgetLow,
              budgetHigh,
              preferredAreas,
              notes,
            },
          },
        },
        { merge: true }
      )
      .then(() => {
        console.log("Document successfully written!");
        const uid = firebase.auth().currentUser?.uid;
        if (uid) {
          dispatchFetchUser(uid);
        }
      })
      .catch(() => (error: any) => {
        console.error("Error writing document: ", error);
      });
  };

  public render() {
    const {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      budgetLow,
      budgetHigh,
      preferredAreas,
      notes,
    } = this.state;
    return (
      <ScrollView style={styles.rootContainer}>
        <StatusBar barStyle={"light-content"} />
        <Card>
          <SubHeader label={"FirstName"} fontSize={16} />
          <CardSection>
            <Input
              value={firstName}
              onChangeText={(newText: string) => this.setState({ firstName: newText })}
              placeholder={"John"}
            />
          </CardSection>
          <SubHeader label={"Last Name"} fontSize={14} />
          <CardSection>
            <Input
              value={lastName}
              onChangeText={(newText: string) => this.setState({ lastName: newText })}
              placeholder={"Smith"}
            />
          </CardSection>
          <SubHeader label={"Street Address"} fontSize={16} />
          <CardSection>
            <Input
              value={address}
              onChangeText={(newText: string) => this.setState({ address: newText })}
              placeholder={"123 Beachside Ln"}
            />
          </CardSection>
          <SubHeader label={"Phone number"} fontSize={16} />
          <CardSection>
            <Input
              value={phoneNumber}
              onChangeText={(newText: string) => this.setState({ phoneNumber: newText })}
              placeholder={"(555) 555-5555"}
            />
          </CardSection>
          <SubHeader label={"Email Address"} fontSize={16} />
          <CardSection>
            <Input
              value={email}
              onChangeText={(newText: string) => this.setState({ email: newText })}
              placeholder={"johnsmith@gmail.com"}
            />
          </CardSection>
          <SubHeader label={"Budget Lowest"} fontSize={16} />
          <CardSection>
            <Input
              value={budgetLow}
              onChangeText={(newText: string) => this.setState({ budgetLow: newText })}
              placeholder={"$500,000"}
            />
          </CardSection>
          <SubHeader label={"Budget Highest"} fontSize={16} />
          <CardSection>
            <Input
              value={budgetHigh}
              onChangeText={(newText: string) => this.setState({ budgetHigh: newText })}
              placeholder={"$550,000"}
            />
          </CardSection>
          <SubHeader label={"Preferred Areas"} fontSize={16} />
          <CardSection>
            <Input
              value={preferredAreas}
              onChangeText={(newText: string) =>
                this.setState({ preferredAreas: newText })
              }
              placeholder={"Wrightsville Beach"}
            />
          </CardSection>
          <SubHeader label={"Additional Notes"} fontSize={16} />
          <CardSection>
            <Input
              value={notes}
              onChangeText={(newText: string) => this.setState({ notes: newText })}
              placeholder={".............."}
            />
          </CardSection>
          <CardSection style={{ marginBottom: Spacing.xxlarge, marginTop: Spacing.med }}>
            {this.renderLoginButton()}
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    fetchUserLoading: state.user.fetchUserLoading,
    fetchUserError: state.user.fetchUserError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: any) => dispatch({ type: FETCH_USER_REQUESTED, payload: uid }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewClientScreen);

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: Spacing.large,
    paddingHorizontal: Spacing.micro,
  },
});
