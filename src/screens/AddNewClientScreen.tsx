import React, { Component } from "react";
import { StyleSheet, ScrollView, StatusBar, SafeAreaView, View, Text } from "react-native";
import { Color } from "../common/styles/Colors";
import { Spacing } from "../common/styles/Spacing";
import SubHeader from "../common/components/SubHeader";
import Input from "../common/components/Input";
import CardSection from "../common/components/CardSection";
import Card from "../common/components/Card";
import Button from "../common/components/Button";
import { Routes } from "../navigation/routes";
import { connect } from "react-redux";
import { FETCH_USER_REQUESTED, ADD_CLIENT_REQUESTED } from "../store/actions/types";
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
  dispatchAddClient: (object: any) => any;
}

interface LocalState {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
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
    notes: "",
  };

  public componentDidUpdate(oldProps: any) {
    if (oldProps.fetchUserLoading && !this.props.fetchUserLoading && !this.props.fetchUserError) {
      this.props.navigation.navigate(Routes.HOME_SCREEN);
    }
  }

  private onSubmit = () => {
    const { firstName, lastName, address, phoneNumber, email, notes } = this.state;

    this.props.dispatchAddClient({
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      notes,
    });
  };

  private renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>{"Add Client"}</Text>
        </View>
      </View>
    );
  };

  private renderSaveButton = () => {
    if (this.props.fetchUserLoading) {
      return <Spinner size="small" />;
    } else {
      return <Button label={"Save"} onPress={this.onSubmit} />;
    }
  };

  public render() {
    const { firstName, lastName, address, phoneNumber, email, notes } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.darkThemeGreyDark }}>
        <ScrollView style={styles.rootContainer}>
          <StatusBar barStyle={"light-content"} />
          {this.renderHeader()}
          <Card>
            <SubHeader label={"FirstName"} fontSize={16} />
            <CardSection>
              <Input
                value={firstName}
                onChangeText={(newText: string) => this.setState({ firstName: newText })}
                placeholder={"John"}
                autoCapitalize={"words"}
              />
            </CardSection>
            <SubHeader label={"Last Name"} fontSize={14} />
            <CardSection>
              <Input
                value={lastName}
                onChangeText={(newText: string) => this.setState({ lastName: newText })}
                placeholder={"Smith"}
                autoCapitalize={"words"}
              />
            </CardSection>
            <SubHeader label={"Street Address"} fontSize={16} />
            <CardSection>
              <Input
                value={address}
                onChangeText={(newText: string) => this.setState({ address: newText })}
                placeholder={"123 Beachside Ln"}
                autoCapitalize={"words"}
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
            <SubHeader label={"Additional Notes"} fontSize={16} />
            <CardSection>
              <Input
                value={notes}
                onChangeText={(newText: string) => this.setState({ notes: newText })}
                placeholder={".............."}
                autoCapitalize={"sentences"}
              />
            </CardSection>
            <CardSection style={{ marginBottom: Spacing.xxlarge, marginTop: Spacing.med }}>
              {this.renderSaveButton()}
            </CardSection>
          </Card>
        </ScrollView>
      </SafeAreaView>
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
  dispatchAddClient: (object: any) => dispatch({ type: ADD_CLIENT_REQUESTED, payload: object }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewClientScreen);

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: Spacing.xxlarge,
    paddingHorizontal: Spacing.micro,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.micro,
  },
  headerText: {
    fontSize: 26,
    color: Color.white,
  },
});
