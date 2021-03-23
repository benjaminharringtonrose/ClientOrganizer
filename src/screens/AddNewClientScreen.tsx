import React, { Component, useState, useEffect } from "react";
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
import { usePrevious } from "../hooks/usePrevious";

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

function AddNewClientScreen(props: AddNewClientScreenProps) {
  const [state, setState] = useState<LocalState>({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });

  const oldProps = usePrevious(props);

  useEffect(() => {
    if (oldProps?.fetchUserLoading && !props.fetchUserLoading && !props.fetchUserError) {
      props.navigation.navigate(Routes.HOME_SCREEN);
    }
  }, [props.fetchUserLoading, props.fetchUserError]);

  const onSubmit = () => {
    const { firstName, lastName, address, phoneNumber, email, notes } = state;
    props.dispatchAddClient({
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      notes,
    });
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>{"Add Client"}</Text>
        </View>
      </View>
    );
  };

  const renderSaveButton = () => {
    return (
      <View style={{ marginTop: Spacing.xlarge }}>
        {props.fetchUserLoading ? (
          <Spinner size="small" />
        ) : (
          <Button label={"Save"} onPress={onSubmit} />
        )}
      </View>
    );
  };

  const { firstName, lastName, address, phoneNumber, email, notes } = state;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.darkThemeGreyMed }}>
      <ScrollView style={styles.rootContainer}>
        <StatusBar barStyle={"light-content"} />
        {renderHeader()}
        <Card>
          <SubHeader label={"FirstName"} fontSize={16} />
          <CardSection>
            <Input
              value={firstName}
              onChangeText={(newText: string) => setState({ ...state, firstName: newText })}
              placeholder={"John"}
              autoCapitalize={"words"}
            />
          </CardSection>
          <SubHeader label={"Last Name"} fontSize={14} />
          <CardSection>
            <Input
              value={lastName}
              onChangeText={(newText: string) => setState({ ...state, lastName: newText })}
              placeholder={"Smith"}
              autoCapitalize={"words"}
            />
          </CardSection>
          <SubHeader label={"Street Address"} fontSize={16} />
          <CardSection>
            <Input
              value={address}
              onChangeText={(newText: string) => setState({ ...state, address: newText })}
              placeholder={"123 Beachside Ln"}
              autoCapitalize={"words"}
            />
          </CardSection>
          <SubHeader label={"Phone number"} fontSize={16} />
          <CardSection>
            <Input
              value={phoneNumber}
              onChangeText={(newText: string) => setState({ ...state, phoneNumber: newText })}
              placeholder={"(555) 555-5555"}
            />
          </CardSection>
          <SubHeader label={"Email Address"} fontSize={16} />
          <CardSection>
            <Input
              value={email}
              onChangeText={(newText: string) => setState({ ...state, email: newText })}
              placeholder={"johnsmith@gmail.com"}
            />
          </CardSection>
          <SubHeader label={"Additional Notes"} fontSize={16} />
          <CardSection>
            <Input
              value={notes}
              onChangeText={(newText: string) => setState({ ...state, notes: newText })}
              placeholder={".............."}
              autoCapitalize={"sentences"}
            />
          </CardSection>
          {renderSaveButton()}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
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
