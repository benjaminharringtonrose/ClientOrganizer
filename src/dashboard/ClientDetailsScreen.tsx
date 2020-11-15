import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import CellLabelLeftRight from "../common/components/CellLabelLeftRight";
import { Color } from "../common/styles/Colors";
import Card from "../common/components/Card";
import CardSection from "../common/components/CardSection";

interface PassedProps {
  navigation: any;
  route: any;
}

type ClientDetailScreenProps = PassedProps;

export default class ClientDetailScreen extends Component<ClientDetailScreenProps, {}> {
  public render() {
    const client = this.props.route?.["params"]?.["client"];
    return (
      <View style={styles.rootContainer}>
        <Card>
          <CellLabelLeftRight labelLeft={"name"} labelRight={client.name} />
          <CellLabelLeftRight labelLeft={"address"} labelRight={client.address} />
          <CellLabelLeftRight labelLeft={"budget"} labelRight={client.budget} />
          <CellLabelLeftRight labelLeft={"email"} labelRight={client.email} />
          <CellLabelLeftRight labelLeft={"phoneNumber"} labelRight={client.phoneNumber} />
          <CellLabelLeftRight
            labelLeft={"preferredAreas"}
            labelRight={client.preferredAreas}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
    paddingTop: 200,
  },
});
