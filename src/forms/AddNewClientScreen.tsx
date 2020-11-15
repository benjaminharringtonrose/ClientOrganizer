import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActionSheetIOS,
} from "react-native";
import { Color } from "../common/styles/Colors";
import { Spacing } from "../common/styles/Spacing";
import SubHeader from "../common/components/SubHeader";
import Input from "../common/components/Input";
import CardSection from "../common/components/CardSection";
import Card from "../common/components/Card";
import Button from "../common/components/Button";
import { connect } from "react-redux";
import {
  clientNameChanged,
  clientAddressChanged,
  clientPhoneNumberChanged,
  clientEmailChanged,
  clientBudgetChanged,
  clientPreferredAreasChanged,
  clientNotesChanged,
} from "../store/actions";
import { getDocRef } from "../dashboard/util";
import { Routes } from "../../navigation";
import firebase from "firebase";
import uuid from "uuid-random";

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  budget: string;
  preferredAreas: string;
  notes: string;
}

interface DispatchFromState {
  clientNameChanged: (text: string) => void;
  clientAddressChanged: (text: string) => void;
  clientPhoneNumberChanged: (text: string) => void;
  clientEmailChanged: (text: string) => void;
  clientBudgetChanged: (text: string) => void;
  clientPreferredAreasChanged: (text: string) => void;
  clientNotesChanged: (text: string) => void;
}

type AddNewClientScreenProps = PropsFromState & DispatchFromState & PassedProps;

class AddNewClientScreen extends React.Component<AddNewClientScreenProps> {
  private onChangeClientName = (text: string) => {
    this.props.clientNameChanged(text);
  };
  private onChangeClientAddress = (text: string) => {
    this.props.clientAddressChanged(text);
  };
  private onChangeClientPhoneNumber = (text: string) => {
    this.props.clientPhoneNumberChanged(text);
  };
  private onChangeClientEmail = (text: string) => {
    this.props.clientEmailChanged(text);
  };
  private onChangeClientBudget = (text: string) => {
    this.props.clientBudgetChanged(text);
  };
  private onChangeClientPreferredAreas = (text: string) => {
    this.props.clientPreferredAreasChanged(text);
  };
  private onChangeClientNotes = (text: string) => {
    this.props.clientNotesChanged(text);
  };
  private onSubmit = () => {
    const {
      name,
      address,
      phoneNumber,
      email,
      budget,
      preferredAreas,
      notes,
      navigation,
    } = this.props;

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser?.uid)
      .set(
        {
          clients: {
            [uuid()]: {
              name,
              address,
              phoneNumber,
              email,
              budget,
              preferredAreas,
              notes,
            },
          },
        },
        { merge: true }
      )
      .then(function () {
        console.log("Document successfully written!");
        navigation.navigate(Routes.HOME_SCREEN);
      })
      .catch(function (error: any) {
        console.error("Error writing document: ", error);
      });
  };

  render() {
    const {
      name,
      address,
      phoneNumber,
      email,
      budget,
      preferredAreas,
      notes,
    } = this.props;

    return (
      <ScrollView
        style={{
          backgroundColor: Color.darkThemeGreyDark,
          paddingTop: Spacing.large,
          paddingHorizontal: Spacing.micro,
        }}
      >
        <StatusBar barStyle={"light-content"} />
        <SubHeader
          label={"New Client"}
          fontSize={30}
          style={{ marginTop: Spacing.xlarge }}
        />
        <Card>
          <SubHeader label={"First & Last Name"} fontSize={14} />
          <CardSection>
            <Input
              value={name}
              onChangeText={this.onChangeClientName}
              placeholder={"John Smith"}
            />
          </CardSection>
          <SubHeader label={"Street Address"} fontSize={14} />
          <CardSection>
            <Input
              value={address}
              onChangeText={this.onChangeClientAddress}
              placeholder={"123 Beachside Ln"}
            />
          </CardSection>
          <SubHeader label={"Phone number"} fontSize={14} />
          <CardSection>
            <Input
              value={phoneNumber}
              onChangeText={this.onChangeClientPhoneNumber}
              placeholder={"(555) 555-5555"}
            />
          </CardSection>
          <SubHeader label={"Email Address"} fontSize={14} />
          <CardSection>
            <Input
              value={email}
              onChangeText={this.onChangeClientEmail}
              placeholder={"johnsmith@gmail.com"}
            />
          </CardSection>
          <SubHeader label={"Budget"} fontSize={14} />
          <CardSection>
            <Input
              value={budget}
              onChangeText={this.onChangeClientBudget}
              placeholder={"$500,000 - $550,000"}
            />
          </CardSection>
          <SubHeader label={"Preferred Areas"} fontSize={14} />
          <CardSection>
            <Input
              value={preferredAreas}
              onChangeText={this.onChangeClientPreferredAreas}
              placeholder={"Wrightsville Beach"}
            />
          </CardSection>
          <SubHeader label={"Additional Notes"} fontSize={14} />
          <CardSection>
            <Input
              value={notes}
              onChangeText={this.onChangeClientNotes}
              placeholder={".............."}
            />
          </CardSection>
          <CardSection style={{ marginBottom: Spacing.xxlarge, marginTop: Spacing.med }}>
            <Button label={"Submit"} onPress={this.onSubmit} />
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ client }: any) => {
  const { name, address, phoneNumber, email, budget, preferredAreas, notes } = client;
  return { name, address, phoneNumber, email, budget, preferredAreas, notes };
};

const mapDispatchToProps = (dispatch: any) => ({
  clientNameChanged: (text: string) => dispatch(clientNameChanged(text)),
  clientAddressChanged: (text: string) => dispatch(clientAddressChanged(text)),
  clientPhoneNumberChanged: (text: string) => dispatch(clientPhoneNumberChanged(text)),
  clientEmailChanged: (text: string) => dispatch(clientEmailChanged(text)),
  clientBudgetChanged: (text: string) => dispatch(clientBudgetChanged(text)),
  clientPreferredAreasChanged: (text: string) =>
    dispatch(clientPreferredAreasChanged(text)),
  clientNotesChanged: (text: string) => dispatch(clientNotesChanged(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewClientScreen);

const styles = StyleSheet.create({});
