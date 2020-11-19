import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Color } from "../common/styles/Colors";
import Card from "../common/components/Card";
import { Spacing } from "../common/styles/Spacing";
import { Icon } from "react-native-elements";
import CellIconActionable from "../common/components/CellIconActionable";
import { Routes } from "../../navigation";
import { connect } from "react-redux";
import { IClient } from "./HomeScreen";
import { FlatList } from "react-native-gesture-handler";

interface IPassedProps {
  navigation: any;
  route: any;
}
interface ILocalState {
  editMode: boolean;
}

interface IPropsFromState {
  clients: IClient[];
  fetchUserLoading: boolean;
  fetchUserError: boolean;
}

type IClientDetailScreenProps = IPassedProps & IPropsFromState;

class ClientDetailScreen extends Component<IClientDetailScreenProps, ILocalState> {
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
            size={26}
          />
        </TouchableOpacity>
      </View>
    );
  };

  public render() {
    const { editMode } = this.state;

    const clientId = this.props.route?.["params"]?.["client"]?.["id"];
    console.log("clientId - details screen -", clientId);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.darkThemeGreyDark }}>
        <ScrollView style={styles.rootContainer}>
          {this.renderHeader(
            this.props.clients[clientId]?.firstName,
            this.props.clients[clientId]?.lastName
          )}
          <Card>
            {this.props.fetchUserLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator />
              </View>
            ) : (
              <>
                <CellIconActionable
                  label={"Address"}
                  labelRight={this.props.clients[clientId]?.address || " "}
                  onPress={() => {
                    this.setState({ editMode: false });
                    this.props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                      fieldLabel: "address", // todo - enum
                      clientId,
                    });
                  }}
                  disabled={editMode ? false : true}
                  iconRightName={editMode ? "right" : undefined}
                  iconRightSize={16}
                />
                <CellIconActionable
                  label={"Phone Number"}
                  labelRight={this.props.clients[clientId]?.phoneNumber || " "}
                  onPress={() => {
                    this.setState({ editMode: false });
                    this.props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                      fieldLabel: "phoneNumber",
                      clientId,
                    });
                  }}
                  disabled={editMode ? false : true}
                  iconRightName={editMode ? "right" : undefined}
                  iconRightSize={16}
                />
                <CellIconActionable
                  label={"Email"}
                  labelRight={this.props.clients[clientId]?.email || " "}
                  onPress={() => {
                    this.setState({ editMode: false });
                    this.props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                      fieldLabel: "email",
                      clientId,
                    });
                  }}
                  disabled={editMode ? false : true}
                  iconRightName={editMode ? "right" : undefined}
                  iconRightSize={16}
                />
                <CellIconActionable
                  label={"Budget Low"}
                  labelRight={this.props.clients[clientId]?.budgetLow || " "}
                  onPress={() => {
                    this.setState({ editMode: false });
                    this.props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                      fieldLabel: "budgetLow",
                      clientId,
                    });
                  }}
                  disabled={editMode ? false : true}
                  iconRightName={editMode ? "right" : undefined}
                  iconRightSize={16}
                />
                <CellIconActionable
                  label={"Budget High"}
                  labelRight={this.props.clients[clientId]?.budgetHigh || " "}
                  onPress={() => {
                    this.setState({ editMode: false });
                    this.props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                      fieldLabel: "budgetHigh",
                      clientId,
                    });
                  }}
                  disabled={editMode ? false : true}
                  iconRightName={editMode ? "right" : undefined}
                  iconRightSize={16}
                />
                <CellIconActionable
                  label={"Preferred Areas"}
                  labelRight={this.props.clients[clientId]?.preferredAreas || " "}
                  onPress={() => {
                    this.setState({ editMode: false });
                    this.props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                      fieldLabel: "preferredAreas",
                      clientId,
                    });
                  }}
                  disabled={editMode ? false : true}
                  iconRightName={editMode ? "right" : undefined}
                  iconRightSize={16}
                />
                <CellIconActionable
                  label={"Notes"}
                  labelRight={this.props.clients[clientId]?.notes || " "}
                  onPress={() => {
                    this.setState({ editMode: false });
                    this.props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                      fieldLabel: "notes",
                      clientId,
                    });
                  }}
                  disabled={editMode ? false : true}
                  iconRightName={editMode ? "right" : undefined}
                  iconRightSize={16}
                />
              </>
            )}
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    clients: state.user.user.clients,
    fetchUserLoading: state.user.fetchUserLoading,
    fetchUserError: state.user.fetchUserError,
  };
};

export default connect(mapStateToProps)(ClientDetailScreen);

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
    flex: 1,
    fontSize: 32,
    color: Color.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
