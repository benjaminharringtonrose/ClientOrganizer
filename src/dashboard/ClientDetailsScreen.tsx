import React, { Component } from "react";
import { Text, View } from "react-native";

interface PassedProps {
  navigation: any;
}

type ClientDetailScreenProps = PassedProps;

export default class ClientDetailScreen extends Component<ClientDetailScreenProps, {}> {
  public render() {
    return (
      <View>
        <Text>{"ClientDetailScreen"}</Text>
      </View>
    );
  }
}
