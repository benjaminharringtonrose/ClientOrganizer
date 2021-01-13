import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, StatusBar, SafeAreaView, View, Text } from "react-native";
import { FETCH_USER, ADD_CLIENT } from "../store/actions/types";
import SubHeader from "../common/components/SubHeader";
import Input from "../common/components/Input";
import CardSection from "../common/components/CardSection";
import Card from "../common/components/Card";
import Button from "../common/components/Button";
import Routes from "../navigation/routes";
import Spinner from "../common/components/Spinner";
import { Color, Spacing } from "../common/styles";

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
    return (
      <View style={{ marginTop: Spacing.xlarge }}>
        {this.props.fetchUserLoading ? (
          <Spinner size="small" />
        ) : (
          <Button label={"Save"} onPress={this.onSubmit} />
        )}
      </View>
    );
  };

  public render() {
    const { firstName, lastName, address, phoneNumber, email, notes } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.darkThemeGreyMed }}>
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
            {this.renderSaveButton()}
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
  dispatchFetchUser: (uid: any) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchAddClient: (object: any) => dispatch({ type: ADD_CLIENT.REQUESTED, payload: object }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewClientScreen);

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: Spacing.xxlarge,
    paddingHorizontal: Spacing.micro,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Spacing.small,
  },
  headerText: {
    fontSize: 32,
    color: Color.warmGrey100,
  },
});
