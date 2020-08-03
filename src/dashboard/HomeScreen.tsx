import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, FlatList } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Card from "../common/components/Card";
import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";
import InputSearch from "../common/components/InputSearch";
import { TouchableText } from "../common/components/TouchableText";
import { ThumbnailActionable } from "../common/components/ThumbnailActionable";
import { thumbnailData, thumbnailDataReversed } from "./util";
import HorizontalThumbnailList from "../common/components/HorizontalThumbnailList";

interface PropsFromState {
  category: string;
  subcategory: string;
  subsubcategory: string;
  age: string;
}

interface DispatchFromState {
  selectCategory: (text: string) => void;
}

type HomeScreenProps = PropsFromState & DispatchFromState;

class HomeScreen extends Component<HomeScreenProps> {
  private onChangeSearchText = () => {};

  private renderThumbnails = ({ item }: any) => {
    return (
      <ThumbnailActionable
        imageSource={item.imageSource}
        name={item.name}
        school={item.school}
        profession={item.profession}
      />
    );
  };
  render() {
    const { category, subcategory, age } = this.props;
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
        <Card>
          <HorizontalThumbnailList
            headerText={"Featured Instructors"}
            topRightActionableText={"See All"}
            onTopRightPress={() => {}}
            thumbnailData={thumbnailData}
            renderThumbnails={this.renderThumbnails}
            style={{ marginBottom: Spacing.xlarge }}
          />
          <HorizontalThumbnailList
            headerText={"Suggestions For You"}
            topRightActionableText={"See All"}
            onTopRightPress={() => {}}
            thumbnailData={thumbnailDataReversed}
            renderThumbnails={this.renderThumbnails}
          />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ initialFlow }: any) => {
  const { category, subcategory, subsubcategory, age } = initialFlow;
  return { category, subcategory, subsubcategory, age };
};

const mapDispatchToProps = (dispatch: any) => {};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  featuredHeaderText: {
    flex: 1,
    color: Color.greyLight,
    fontSize: 22,
    paddingLeft: Spacing.xsmall,
    paddingBottom: Spacing.small,
  },
});
