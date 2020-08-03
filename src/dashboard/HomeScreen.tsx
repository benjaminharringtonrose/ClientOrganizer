import React, { Component } from "react";
import { StyleSheet, StatusBar, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";
import InputSearch from "../common/components/InputSearch";

interface PropsFromState {}

interface DispatchFromState {}

type HomeScreenProps = PropsFromState & DispatchFromState;

class HomeScreen extends Component<HomeScreenProps> {
  private onChangeSearchText = () => {};

  render() {
    return (
      <ScrollView
        nestedScrollEnabled={true}
        style={{
          backgroundColor: Color.darkThemeGreyDark,
          paddingTop: Spacing.xxlarge,
        }}
      >
        <StatusBar barStyle={"light-content"} />
        <InputSearch
          onChangeText={this.onChangeSearchText}
          placeholder={"Search"}
          keyboardType={"web-search"}
          style={{ marginBottom: Spacing.xlarge, marginHorizontal: Spacing.micro }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user }: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({});
