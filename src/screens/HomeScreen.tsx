import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect, useSelector } from "react-redux";
import firebase from "firebase";
import { FETCH_USER, DELETE_CLIENT } from "../store/actions/types";
import Routes from "../navigation/routes";

import SearchBar from "../common/components/SearchBar";
import CellIconActionable from "../common/components/CellIconActionable";
import AlertModal from "../common/components/AlertModal";

import { mapClients } from "./util";
import { Color, Spacing } from "../common/styles";
import { isEqual } from "lodash";

export interface IClient {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  preferredAreas: string;
  notes: string;
}

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  clients: any;
  fetchUserLoading?: boolean;
  fetchUserError?: string;
  deleteClientLoading?: boolean;
  deleteClientError?: string;
}

interface DispatchFromState {
  searchTextChanged: (text: string) => void;
  dispatchFetchUser: (uid: string) => void;
  dispatchDeleteClient: (clientId: string) => void;
}

interface LocalState {
  clients: IClient[];
  filteredClients: IClient[];
  modalVisible: boolean;
  editMode: boolean;
  clientId?: string;
  searchText: string;
}

type HomeScreenProps = PropsFromState & DispatchFromState & PassedProps;

function HomeScreen(props: HomeScreenProps) {
  const [state, setState] = React.useState<LocalState>({
    clients: [],
    filteredClients: [],
    modalVisible: false,
    editMode: false,
    clientId: undefined,
    searchText: "",
  });

  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    if (uid) {
      props.dispatchFetchUser(uid);
    }
  }, []);

  useEffect(() => {
    if (!props.fetchUserLoading && !props.fetchUserError && !props.deleteClientLoading) {
      if (!isEqual(props.clients, state.clients)) {
        const mappedClients = mapClients(props.clients);
        setState({ ...state, clients: mappedClients });
      }
    }
  }, [props.clients, props.fetchUserLoading, props.fetchUserError, props.deleteClientLoading]);

  const onAddNewClientPress = () => {
    setState({ ...state, editMode: false });
    props.navigation.navigate(Routes.ADD_NEW_CLIENT_SCREEN);
  };

  const onDeletePress = () => {
    props.dispatchDeleteClient(state.clientId!);
    setState({ ...state, modalVisible: !state.modalVisible, editMode: !state.editMode });
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>{"Client Manager"}</Text>
        </View>
        <TouchableOpacity onPress={onAddNewClientPress}>
          <Icon
            style={{ marginRight: Spacing.large }}
            name={"plus"}
            type={"antdesign"}
            color={Color.peach}
            size={26}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setState({ ...state, editMode: !state.editMode })}>
          <Icon name={"trash"} type={"feather"} color={Color.peach} size={22} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderClientCell = ({ item }: any) => {
    const iconName = state.editMode ? "minuscircle" : "right";
    const color = state.editMode ? Color.peach : Color.white;
    return (
      <CellIconActionable
        onPress={() => {
          if (state.editMode) {
            setState({ ...state, modalVisible: true, clientId: item.id });
          } else {
            props.navigation.navigate(Routes.CLIENT_DETAIL_SCREEN, {
              client: item,
            });
          }
        }}
        label={`${item.lastName}, ${item.firstName}`}
        iconRightName={iconName}
        iconRightColor={color}
        iconRightSize={16}
        style={{ marginBottom: Spacing.small }}
      />
    );
  };

  const searchClients = (searchText: string) => {
    setState({ ...state, searchText });
    const filteredClients = state.clients.filter(
      (client: any) => client.lastName.includes(searchText) || client.firstName.includes(searchText)
    );
    setState({ ...state, filteredClients });
  };

  const loading = !!props.fetchUserLoading || !!props.deleteClientLoading;
  const showAllClients = !!!state.filteredClients.length && state.searchText === "";

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle={"light-content"} />
      {renderHeader()}
      <View style={{ paddingVertical: Spacing.large }}>
        <SearchBar
          onChangeText={searchClients}
          value={state.searchText}
          placeholder={"search clients..."}
        />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ borderRadius: 5 }}>
          <FlatList
            data={showAllClients ? state.clients : state.filteredClients}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => renderClientCell({ item })}
            indicatorStyle={"white"}
          />
        </View>
      )}

      <AlertModal
        label={"Are you sure you want to delete this client?"}
        onDeletePress={onDeletePress}
        onCancelPress={() => {
          setState({ ...state, modalVisible: !state.modalVisible, editMode: !state.modalVisible });
        }}
        isVisible={state.modalVisible}
      />
    </View>
  );
}

const mapStateToProps = (state: any) => {
  return {
    clients: state.user.user.clients,
    fetchUserLoading: state.user.fetchUserLoading,
    fetchUserError: state.user.fetchUserError,
    deleteClientLoading: state.user.deleteClientLoading,
    deleteClientError: state.user.deleteClientError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchUser: (uid: any) => dispatch({ type: FETCH_USER.REQUESTED, payload: uid }),
  dispatchDeleteClient: (clientId: any) =>
    dispatch({ type: DELETE_CLIENT.REQUESTED, payload: clientId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyMed,
    paddingHorizontal: Spacing.med,
    paddingTop: Spacing.xxlarge,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.micro,
  },
  headerText: {
    fontSize: 30,
    color: Color.warmGrey200,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
