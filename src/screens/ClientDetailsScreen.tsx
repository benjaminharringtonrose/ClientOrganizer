import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import Routes from "../navigation/routes";
import { IClient } from "./HomeScreen";

import { Icon } from "react-native-elements";
import CellIconActionable from "../common/components/CellIconActionable";
import { Color, Spacing } from "../common/styles";
import { callTelephone } from "./util";
import Button from "../common/components/Button";
import Card from "../common/components/Card";

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

function ClientDetailScreen(props: IClientDetailScreenProps) {
  const [state, setState] = useState<ILocalState>({
    editMode: false,
  });

  const renderHeader = (firstName: string, lastName: string) => {
    const { editMode } = state;
    return (
      <View style={styles.headerContainer}>
        <View style={{ paddingLeft: Spacing.small }}>
          <Text style={styles.headerText}>{`${firstName} ${lastName}`}</Text>
        </View>
        <TouchableOpacity onPress={() => setState({ editMode: !editMode })}>
          <Icon
            style={{ marginRight: Spacing.large }}
            name={"edit"}
            type={"antdesign"}
            color={Color.peach}
            size={26}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const { editMode } = state;
  const clientId = props.route?.["params"]?.["client"]?.["id"];
  const client = props.clients[clientId];
  return (
    <SafeAreaView style={styles.rootContainer}>
      {renderHeader(client?.firstName, client?.lastName)}
      <ScrollView>
        {props.fetchUserLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <Card>
            <CellIconActionable
              label={"Address"}
              labelRight={client?.address || " "}
              onPress={() => {
                setState({ editMode: false });
                props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                  fieldLabel: "address", // todo - enum
                  clientId,
                });
              }}
              disabled={editMode ? false : true}
              iconRightName={editMode ? "right" : undefined}
              iconRightSize={16}
              style={{ marginBottom: Spacing.small }}
            />
            <CellIconActionable
              label={"Phone Number"}
              labelRight={client?.phoneNumber || " "}
              onPress={() => {
                setState({ editMode: false });
                props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                  fieldLabel: "phoneNumber",
                  clientId,
                });
              }}
              disabled={editMode ? false : true}
              iconRightName={editMode ? "right" : undefined}
              iconRightSize={16}
              style={{ marginBottom: Spacing.small }}
            />
            <CellIconActionable
              label={"Email"}
              labelRight={client?.email || " "}
              onPress={() => {
                setState({ editMode: false });
                props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                  fieldLabel: "email",
                  clientId,
                });
              }}
              disabled={editMode ? false : true}
              iconRightName={editMode ? "right" : undefined}
              iconRightSize={16}
              style={{ marginBottom: Spacing.small }}
            />
            <CellIconActionable
              label={"Notes"}
              labelRight={client?.notes || " "}
              onPress={() => {
                setState({ editMode: false });
                props.navigation.navigate(Routes.CLIENT_UPDATE_SCREEN, {
                  fieldLabel: "notes",
                  clientId,
                });
              }}
              disabled={editMode ? false : true}
              iconRightName={editMode ? "right" : undefined}
              iconRightSize={16}
              style={{ marginBottom: Spacing.large }}
            />
            {!!client?.phoneNumber && (
              <Button
                label={`Call ${client?.firstName}`}
                onPress={() => callTelephone(client?.phoneNumber)}
              />
            )}
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
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
    backgroundColor: Color.darkThemeGreyMed,
  },
  headerContainer: {
    paddingTop: Spacing.xxlarge,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Spacing.micro,
    paddingBottom: Spacing.small,
  },
  headerText: {
    fontSize: 30,
    color: Color.warmGrey100,
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
