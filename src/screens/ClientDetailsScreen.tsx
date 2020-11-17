import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import CellLabelLeftRight from "../common/components/CellLabelLeftRight";
import { Color } from "../common/styles/Colors";
import Card from "../common/components/Card";
import { Spacing } from "../common/styles/Spacing";

interface PassedProps {
  navigation: any;
  route: any;
}

type ClientDetailScreenProps = PassedProps;

export default class ClientDetailScreen extends Component<ClientDetailScreenProps, {}> {
  public render() {
    const client = this.props.route?.["params"]?.["client"];
    return (
      <ScrollView style={styles.rootContainer}>
        <Card>
          <CellLabelLeftRight
            labelLeft={"Name"}
            labelRight={`${client.firstName} ${client.lastName}`}
          />
          <CellLabelLeftRight labelLeft={"Address"} labelRight={client.address} />
          <CellLabelLeftRight
            labelLeft={"Budget"}
            labelRight={`${client.budgetLow} - ${client.budgetHigh}`}
          />
          <CellLabelLeftRight labelLeft={"Email"} labelRight={client.email} />
          <CellLabelLeftRight
            labelLeft={"Phone Number"}
            labelRight={client.phoneNumber}
          />
          <CellLabelLeftRight
            labelLeft={"Preferred Areas"}
            labelRight={client.preferredAreas}
          />
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: Spacing.med,
  },
});
