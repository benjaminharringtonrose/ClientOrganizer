import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Card from "../common/components/Card";
import CellIconActionable from "../common/components/CellIconActionable";
import Header from "../common/components/Header";
import { Spacing } from "../common/styles/Spacing";
import { Color } from "../common/styles/Colors";
import { selectCategory } from "../store/actions";
interface PropsFromState {
  category: string;
}
interface DispatchFromState {
  selectCategory: (text: string) => void;
}
type WelcomeScreenProps = PropsFromState & DispatchFromState;

class WelcomeScreen extends Component<WelcomeScreenProps> {
  private onInstrumentPress = () => {
    this.props.selectCategory("instrument");
    Actions.navigateToInstrument();
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          title={"ULRN"}
          description={"What do you want to learn?"}
          style={styles.headerContainer}
        />
        <Card style={styles.cardContainer}>
          <CellIconActionable
            label={"Instruments"}
            labelColor={Color.primary}
            iconLeftName={"guitar"}
            iconRightName={"right"}
            iconLeftColor={Color.primary}
            iconRightColor={Color.primary}
            iconLeftSize={24}
            iconRightSize={16}
            onPress={this.onInstrumentPress}
          />
          <CellIconActionable
            label={"Languages"}
            labelColor={Color.primary}
            iconLeftName={"language"}
            iconRightName={"right"}
            iconLeftColor={Color.primary}
            iconRightColor={Color.primary}
            iconLeftSize={24}
            iconRightSize={16}
            onPress={() => {}}
          />
          <CellIconActionable
            label={"Arts"}
            labelColor={Color.primary}
            iconLeftName={"paint-brush"}
            iconRightName={"right"}
            iconLeftColor={Color.primary}
            iconRightColor={Color.primary}
            iconLeftSize={24}
            iconRightSize={16}
            onPress={() => {}}
          />
          <CellIconActionable
            label={"School Subjects"}
            labelColor={Color.primary}
            iconLeftName={"book"}
            iconRightName={"right"}
            iconLeftColor={Color.primary}
            iconRightColor={Color.primary}
            iconLeftSize={24}
            iconRightSize={16}
            onPress={() => {}}
          />
          <CellIconActionable
            label={"Sports"}
            labelColor={Color.primary}
            iconLeftName={"baseball-ball"}
            iconRightName={"right"}
            iconLeftColor={Color.primary}
            iconRightColor={Color.primary}
            iconLeftSize={24}
            iconRightSize={16}
            onPress={() => {}}
          />
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }: any) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

const mapDispatchToProps = (dispatch: any) => ({
  selectCategory: (text: string) => dispatch(selectCategory(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  // CONTAINERS //
  mainContainer: {
    flex: 1,
    backgroundColor: Color.primaryBackground,
  },
  headerContainer: {
    flex: 0.3,
    backgroundColor: Color.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    position: "relative",
    paddingTop: Spacing.xxlarge,
    marginBottom: Spacing.large,
  },
  cardContainer: {
    flex: 0.7,
    borderColor: "#FFF",
  },
});
