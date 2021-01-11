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
import { Icon, colors } from "react-native-elements";
import CellIconActionable from "../common/components/CellIconActionable";
import { Routes } from "../navigation/routes";
import { connect } from "react-redux";
import { IClient } from "./HomeScreen";
import MapView, { Marker } from "react-native-maps";

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
        <View style={{ paddingLeft: Spacing.small }}>
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
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.darkThemeGreyDark }}>
        {this.renderHeader(
          this.props.clients[clientId]?.firstName,
          this.props.clients[clientId]?.lastName
        )}
        <ScrollView style={styles.rootContainer} indicatorStyle={"white"}>
          <Card>
            {this.props.fetchUserLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator />
              </View>
            ) : (
              <View>
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
              </View>
            )}
          </Card>
        </ScrollView>
        <MapView
          style={styles.mapContainer}
          region={{
            latitude: 34.244968,
            longitude: -77.95262,
            latitudeDelta: 0.01622,
            longitudeDelta: 0.01221,
          }}
        />
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
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
  },
  headerContainer: {
    paddingTop: Spacing.xxlarge,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Spacing.micro,
  },
  headerText: {
    fontSize: 32,
    color: Color.white,
    paddingBottom: Spacing.small,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: Spacing.small,
    borderRadius: 5,
  },
});
