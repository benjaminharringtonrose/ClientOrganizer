import React, { useState } from "react";
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
import { FETCH_USER_REQUEST } from "../store/actions/types";

interface PassedProps {
  navigation: any;
}

interface DispatchFromState {
  dispatchFetchUser: (uid: any) => any;
}

type AddNewClientScreenProps = PassedProps & DispatchFromState;

function AddNewClientScreen(props: AddNewClientScreenProps) {
  const { navigation } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [budgetLow, setBudgetLow] = useState("");
  const [budgetHigh, setBudgetHigh] = useState("");
  const [preferredAreas, setPreferredAreas] = useState("");
  const [notes, setNotes] = useState("");

  const onSubmit = () => {
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
      .then(function () {
        console.log("Document successfully written!");
        const uid = firebase.auth().currentUser?.uid;
        if (uid) {
          props.dispatchFetchUser({ uid });
        }

        navigation.navigate(Routes.HOME_SCREEN);
      })
      .catch(function (error: any) {
        console.error("Error writing document: ", error);
      });
  };

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
        <SubHeader label={"FirstName"} fontSize={14} />
        <CardSection>
          <Input value={firstName} onChangeText={setFirstName} placeholder={"John"} />
        </CardSection>
        <SubHeader label={"Last Name"} fontSize={14} />
        <CardSection>
          <Input value={lastName} onChangeText={setLastName} placeholder={"Smith"} />
        </CardSection>
        <SubHeader label={"Street Address"} fontSize={14} />
        <CardSection>
          <Input
            value={address}
            onChangeText={setAddress}
            placeholder={"123 Beachside Ln"}
          />
        </CardSection>
        <SubHeader label={"Phone number"} fontSize={14} />
        <CardSection>
          <Input
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder={"(555) 555-5555"}
          />
        </CardSection>
        <SubHeader label={"Email Address"} fontSize={14} />
        <CardSection>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder={"johnsmith@gmail.com"}
          />
        </CardSection>
        <SubHeader label={"LowBudget"} fontSize={14} />
        <CardSection>
          <Input value={budgetLow} onChangeText={setBudgetLow} placeholder={"$500,000"} />
        </CardSection>
        <SubHeader label={"HighBudget"} fontSize={14} />
        <CardSection>
          <Input
            value={budgetHigh}
            onChangeText={setBudgetHigh}
            placeholder={"$550,000"}
          />
        </CardSection>
        <SubHeader label={"Preferred Areas"} fontSize={14} />
        <CardSection>
          <Input
            value={preferredAreas}
            onChangeText={setPreferredAreas}
            placeholder={"Wrightsville Beach"}
          />
        </CardSection>
        <SubHeader label={"Additional Notes"} fontSize={14} />
        <CardSection>
          <Input value={notes} onChangeText={setNotes} placeholder={".............."} />
        </CardSection>
        <CardSection style={{ marginBottom: Spacing.xxlarge, marginTop: Spacing.med }}>
          <Button label={"Save"} onPress={onSubmit} />
        </CardSection>
      </Card>
    </ScrollView>
  );
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: ({ uid }: any) =>
    dispatch({ type: FETCH_USER_REQUEST, payload: { uid } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewClientScreen);

const styles = StyleSheet.create({});
