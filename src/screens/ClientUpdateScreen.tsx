import React, { Component, useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import { Color, Spacing } from "../common/styles";
import Card from "../common/components/Card";
import Input from "../common/components/Input";
import CardSection from "../common/components/CardSection";
import Button from "../common/components/Button";
import { IClient } from "./HomeScreen";
import { UPDATE_CLIENT, FETCH_USER } from "../store/actions";
import { connect } from "react-redux";
import Routes from "../navigation/routes";
import firebase from "firebase";
import { usePrevious } from "../hooks/usePrevious";

interface PassedProps {
  navigation: any;
  route: any;
}

interface IPropsFromState {
  clients: IClient[];
  updateClientLoading: boolean;
  updateClientError: boolean;
}

interface DispatchFromState {
  dispatchFetchUser: (uid: any) => any;
  dispatchUpdateClient: (object: any) => any;
}

interface ILocalState {
  fieldLabel?: string;
  fieldValue?: string;
  updatedFieldValue: string;
}

type FieldLabel = "address" | "phoneNumber" | "email";

enum ClientFieldKey {
  firstName = "firstName",
  lastName = "lastName",
  address = "address",
  phoneNumber = "phoneNumber",
  email = "email",
}

type IClientUpdateScreenProps = PassedProps & DispatchFromState & IPropsFromState;

function ClientUpdateScreen(props: IClientUpdateScreenProps) {
  const [state, setState] = useState<ILocalState>({
    fieldLabel: "",
    fieldValue: "",
    updatedFieldValue: "",
  });

  const prevProps = usePrevious(props);

  useEffect(() => {
    const clientId = props.route?.params?.["clientId"];
    const fieldLabel = props.route?.params?.["fieldLabel"];
    getInitialFieldValue(fieldLabel, props.clients[clientId]);
  }, []);

  useEffect(() => {
    if (prevProps?.updateClientLoading && !props.updateClientLoading && !props.updateClientError) {
      const uid = firebase.auth().currentUser?.uid;
      props.dispatchFetchUser(uid);
      props.navigation.navigate(Routes.CLIENT_DETAIL_SCREEN);
    }
  }, [props.updateClientLoading, props.updateClientError]);

  const getInitialFieldValue = (fieldLabel: FieldLabel, client: IClient) => {
    if (!fieldLabel) {
      return "";
    }
    switch (fieldLabel) {
      case ClientFieldKey.address:
        setState({ ...state, fieldLabel: "Address", fieldValue: client.address });
        return;
      case ClientFieldKey.phoneNumber:
        setState({ ...state, fieldLabel: "Phone Number", fieldValue: client.phoneNumber });
        return;
      case ClientFieldKey.email:
        setState({ ...state, fieldLabel: "Email", fieldValue: client.email });
        return;
    }
  };

  const onSave = () => {
    const clientId: string = props.route?.["params"]?.["clientId"];
    const fieldLabel: string = props.route?.["params"]?.["fieldLabel"];
    const { updatedFieldValue } = state;
    props.dispatchUpdateClient({ clientId, fieldLabel, updatedFieldValue });
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{`Update Client Information`}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.darkThemeGreyMed }}>
      <ScrollView>
        {renderHeader()}
        <Card>
          <Input
            value={state.updatedFieldValue}
            onChangeText={(newValue: string) => setState({ updatedFieldValue: newValue })}
            placeholder={state.fieldValue}
            style={{ marginBottom: Spacing.med }}
          />
          <Button label={"Save"} onPress={onSave} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state: any) => {
  return {
    clients: state.user.user.clients,
    updateClientLoading: state.user.updateClientLoading,
    updateClientError: state.user.updateClientError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: any) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchUpdateClient: ({ clientId, fieldLabel, updatedFieldValue }: any) =>
    dispatch({
      type: UPDATE_CLIENT.REQUESTED,
      payload: { clientId, fieldLabel, fieldValue: updatedFieldValue },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientUpdateScreen);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.micro,
    paddingLeft: Spacing.small,
    paddingTop: Spacing.xxlarge,
    paddingBottom: Spacing.small,
  },
  headerText: {
    fontSize: 30,
    color: Color.warmGrey100,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
