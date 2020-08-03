import React, { Component } from "react";
import { StyleSheet, StatusBar, ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";
import InputSearch from "../common/components/InputSearch";
import { searchTextChanged } from "../store/actions/UserActions";
import Card from "../common/components/Card";
import { FlatList } from "react-native-gesture-handler";
import CardSection from "../common/components/CardSection";

interface PropsFromState {
  seachText: string;
}

interface DispatchFromState {
  searchTextChanged: (text: string) => void;
}

type HomeScreenProps = PropsFromState & DispatchFromState;

class HomeScreen extends Component<HomeScreenProps> {
  private onChangeSearchText = (text: string) => {
    this.props.searchTextChanged(text);
  };

  render() {
    const db: any = [];
    console.log(db.length > 0);
    return (
      <View style={{ flex: 1, backgroundColor: Color.darkThemeGreyDark }}>
        <StatusBar barStyle={"light-content"} />
        <Card style={{ flex: 1 }}>
          <InputSearch
            onChangeText={this.onChangeSearchText}
            value={this.props.seachText}
            placeholder={"search clients..."}
            keyboardType={"web-search"}
            style={{ marginTop: Spacing.xlarge, marginHorizontal: Spacing.med }}
          />
          {db.length > 0 ? (
            <FlatList
              style={{
                flex: 1,
                backgroundColor: Color.darkThemeGreyDark,
                paddingTop: Spacing.xlarge,
                paddingHorizontal: Spacing.small,
              }}
              data={db}
              renderItem={({ item }: any) => <Text>{item?.key}</Text>}
            />
          ) : (
            <CardSection
              style={{
                paddingVertical: Spacing.xxlarge,
                marginHorizontal: Spacing.med,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: Color.darkThemeGrey }}>
                {"No clients have been added yet."}
              </Text>
            </CardSection>
          )}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ user }: any) => {
  const { searchText } = user;
  return { searchText };
};

const mapDispatchToProps = (dispatch: any) => ({
  searchTextChanged: (text: string) => dispatch(searchTextChanged(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({});
