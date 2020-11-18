import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import CellLabelLeftRight from "../common/components/CellLabelLeftRight";
import { Color } from "../common/styles/Colors";
import Card from "../common/components/Card";
import { Spacing } from "../common/styles/Spacing";
import Header from "../common/components/Header";
import { Icon } from "react-native-elements";
import CellIconActionable from "../common/components/CellIconActionable";
import { Routes } from "../../navigation";

interface PassedProps {
  navigation: any;
  route: any;
}
interface ILocalState {
  editMode: boolean;
}

type ClientDetailScreenProps = PassedProps;

export default class ClientDetailScreen extends Component<
  ClientDetailScreenProps,
  ILocalState
> {
  public state = {
    editMode: false,
  };

  private renderHeader = (firstName: string, lastName: string) => {
    const { editMode } = this.state;
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1, paddingLeft: Spacing.small }}>
          <Text style={styles.headerText}>{`${firstName} ${lastName}`}</Text>
        </View>
        <TouchableOpacity onPress={() => this.setState({ editMode: !editMode })}>
          <Icon
            style={{ marginRight: Spacing.large }}
            name={"edit"}
            type={"antdesign"}
            color={editMode ? Color.darkThemeGreenLight : Color.white}
            size={18}
          />
        </TouchableOpacity>
      </View>
    );
  };

  public render() {
    const { editMode } = this.state;
    const client = this.props.route?.["params"]?.["client"];
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.darkThemeGreyDark }}>
        <ScrollView style={styles.rootContainer}>
          {this.renderHeader(client.firstName, client.lastName)}
          <Card>
            <CellIconActionable
              label={"Address"}
              labelRight={client.address || " "}
              onPress={() => this.props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN)}
              disabled={editMode ? false : true}
              iconRightName={editMode ? "right" : undefined}
            />
            <CellIconActionable
              label={"Budget"}
              labelRight={
                client.budgetLow ? `${client.budgetLow} - ${client.budgetHigh}` : " "
              }
              onPress={() => {}}
              disabled={editMode ? false : true}
              iconRightName={editMode ? "right" : undefined}
            />
            <CellIconActionable
              label={"Email"}
              labelRight={client.email || " "}
              onPress={() => {}}
              disabled={editMode ? false : true}
              iconRightName={editMode ? "right" : undefined}
            />
            <CellIconActionable
              label={"Phone Number"}
              labelRight={client.phoneNumber || " "}
              onPress={() => {}}
              disabled={editMode ? false : true}
              iconRightName={editMode ? "right" : undefined}
            />
            <CellIconActionable
              label={"Preferred Areas"}
              labelRight={client.preferredAreas || " "}
              onPress={() => {}}
              disabled={editMode ? false : true}
              iconRightName={editMode ? "right" : undefined}
            />
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: Spacing.xxlarge,
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
