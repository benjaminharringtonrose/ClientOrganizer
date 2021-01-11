import React, { Component } from "react";
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

class ClientUpdateScreen extends Component<IClientUpdateScreenProps, ILocalState> {
  public state = {
    fieldLabel: undefined,
    fieldValue: undefined,
    updatedFieldValue: "",
  };

  public componentDidMount() {
    const clientId = this.props.route?.["params"]?.["clientId"];
    const fieldLabel = this.props.route?.["params"]?.["fieldLabel"];
    this.getInitialFieldValue(fieldLabel, this.props.clients[clientId]);
  }

  public componentDidUpdate(oldProps: IClientUpdateScreenProps) {
    if (
      oldProps.updateClientLoading &&
      !this.props.updateClientLoading &&
      !this.props.updateClientError
    ) {
      const uid = firebase.auth().currentUser?.uid;
      this.props.dispatchFetchUser(uid);
      this.props.navigation.navigate(Routes.CLIENT_DETAIL_SCREEN);
    }
  }

  private getInitialFieldValue = (fieldLabel: FieldLabel, client: IClient) => {
    if (!fieldLabel) {
      return "";
    }
    switch (fieldLabel) {
      case ClientFieldKey.address:
        this.setState({ fieldLabel: "Address", fieldValue: client.address });
        return;
      case ClientFieldKey.phoneNumber:
        this.setState({ fieldLabel: "Phone Number", fieldValue: client.phoneNumber });
        return;
      case ClientFieldKey.email:
        this.setState({ fieldLabel: "Email", fieldValue: client.email });
        return;
    }
  };

  private onSave = () => {
    const clientId: string = this.props.route?.["params"]?.["clientId"];
    const fieldLabel: string = this.props.route?.["params"]?.["fieldLabel"];
    const { updatedFieldValue } = this.state;
    this.props.dispatchUpdateClient({ clientId, fieldLabel, updatedFieldValue });
  };

  private renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{`Update Client Information`}</Text>
      </View>
    );
  };

  public render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.darkThemeGreyDark }}>
        <ScrollView style={styles.rootContainer}>
          {this.renderHeader()}
          <Card>
            <CardSection>
              <Input
                value={this.state.updatedFieldValue}
                onChangeText={(newValue: string) => this.setState({ updatedFieldValue: newValue })}
                placeholder={this.state.fieldValue}
                selectionColor={Color.greyMed}
              />
            </CardSection>
            <CardSection>
              <Button label={"Save"} onPress={this.onSave} />
            </CardSection>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
  rootContainer: {
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: Spacing.xxlarge,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.micro,
    paddingLeft: Spacing.small,
  },
  headerText: {
    fontSize: 26,
    color: Color.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
