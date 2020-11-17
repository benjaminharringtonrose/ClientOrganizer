import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Image } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import Card from "../common/components/Card";
import Header from "../common/components/Header";
import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";
import { carouselItems } from "../dashboard/util";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { TouchableText } from "../common/components/TouchableText";

interface StartupScreenState {
  activeIndex: number;
  carouselItems: ICarouselItemProps[];
  screenWidth: number;
  screenHeight: number;
}

interface ICarouselItemProps {
  title: string;
  text: string;
  source: string;
}

class StartupScreen extends Component<ICarouselItemProps, StartupScreenState> {
  carousel: any;

  constructor(props: any) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: carouselItems,
      screenWidth: Math.round(Dimensions.get("window").width),
      screenHeight: Math.round(Dimensions.get("window").height),
    };
  }
  private onLoginPress = () => {
    Actions.navigateToLogin();
  };
  private onSignUpPress = () => {
    Actions.navigateToRegister();
  };

  public render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title={"ClientOrganizer"}
          description={"Stay on top of it."}
          style={styles.headerContainer}
        />
        <ScrollView style={{ flex: 1 }}>
          <TouchableText
            text={"Sign up here"}
            onPress={this.onSignUpPress}
            textStyle={{ color: Color.white }}
            style={{ paddingVertical: Spacing.micro }}
          />
          <TouchableText
            text={"Already have an account? Log in here."}
            textStyle={{ color: Color.darkThemeBlueGrey }}
            onPress={this.onLoginPress}
          />
        </ScrollView>
      </View>
    );
  }
}

export default StartupScreen;

const styles = StyleSheet.create({
  // CONTAINERS //
  mainContainer: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
  },
  headerContainer: {
    flex: 0.2,
    paddingTop: Spacing.xlarge,
    paddingBottom: Spacing.small,
  },
  cardContainer: {
    flex: 1,
    alignSelf: "center",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  imageContainer: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
  },
  touchableGetStartedContainer: {
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: Spacing.micro,
  },
  touchableLoginContainer: {
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: Spacing.xlarge,
  },
  captionText: {
    alignSelf: "center",
    color: Color.white,
    paddingTop: Spacing.small,
  },
});
