import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { ScreenContainer, MessagePreviewCard, Header, ButtonText } from "../components";
import { Color, Spacing } from "../styles";
import { IStringMap } from "./RegisterScreen";
import { IError } from "../store/types";
import { Entypo } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import { Routes } from "../navigation/routes";
import { IStoreState } from "../store/store";
import { fetchMessagesRequested, fetchThreadsRequested } from "../store/actions/MessagesActions";
import { getMostRecentMessage } from "./util";
import { usePrevious } from "../hooks/usePrevious";
import { isEqual } from "lodash";
import { Ionicons } from "@expo/vector-icons";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  threads?: IStringMap<any>[];
  fetchThreadsLoading: boolean;
  fetchThreadsError?: IError;
}

interface IDispatchFromState {
  dispatchFetchThreads: () => void;
  dispatchFetchMessages: () => void;
}

type IMessageScreenProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {
  selectedMessage?: IStringMap<any>;
  threads: any;
  showEdit?: boolean;
}

const MessageScreen = (props: IMessageScreenProps) => {
  const [state, setState] = useState<ILocalState>({
    selectedMessage: undefined,
    threads: undefined,
    showEdit: undefined,
  });

  useEffect(() => {
    props.dispatchFetchThreads();
    props.dispatchFetchMessages();
  }, []);

  const prevThreads = usePrevious(props?.threads);

  useEffect(() => {
    if (!isEqual(prevThreads, props?.threads)) {
      setState({ ...state, threads: props?.threads });
    }
  }, [props.threads]);

  useEffect(() => {
    if (state.showEdit !== undefined && !!state.showEdit) {
    }
  }, [state.showEdit]);

  const renderMessagePreview = ({ item }: any) => {
    const onMessagePress = () => {
      setState({
        ...state,
        selectedMessage: {
          uid: item?.uid,
          firstName: item.threadFirstName,
          lastName: item.threadLastName,
          email: item.email,
          avatar: item.avatar,
        },
      });
      props.navigation.navigate(Routes.MESSAGE_DETAILS_SCREEN, {
        threadId: item.id,
      });
    };

    function makeSlideTranslation(translationType: string, fromValue: number, toValue: number) {
      return {
        from: {
          [translationType]: fromValue,
        },
        to: {
          [translationType]: toValue,
        },
      };
    }

    if (item) {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          {state.showEdit && (
            <Animatable.View
              ref={(ref) => (this.view = ref)}
              animation={makeSlideTranslation("translateX", -100, 0)}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: Color.error,
                  width: 80,
                  height: 75,
                  borderBottomRightRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <Ionicons name={"close"} color={Color.white} size={25} />
                </View>
              </TouchableOpacity>
            </Animatable.View>
          )}
          {state.showEdit ? (
            <TouchableOpacity style={{ flex: 1 }} onPress={onMessagePress}>
              <Animatable.View animation={makeSlideTranslation("translateX", -80, 0)}>
                <MessagePreviewCard
                  avatar={item.threadAvatar}
                  name={`${item.threadFirstName} ${item.threadLastName}`}
                  message={getMostRecentMessage(item.messages)}
                  timestamp={item.timestamp}
                />
              </Animatable.View>
            </TouchableOpacity>
          ) : !state.showEdit && state.showEdit !== undefined ? (
            <TouchableOpacity style={{ flex: 1 }} onPress={onMessagePress}>
              <Animatable.View animation={makeSlideTranslation("translateX", 80, 0)}>
                <MessagePreviewCard
                  avatar={item.threadAvatar}
                  name={`${item.threadFirstName} ${item.threadLastName}`}
                  message={getMostRecentMessage(item.messages)}
                  timestamp={item.timestamp}
                />
              </Animatable.View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ flex: 1 }} onPress={onMessagePress}>
              <MessagePreviewCard
                avatar={item.threadAvatar}
                name={`${item.threadFirstName} ${item.threadLastName}`}
                message={getMostRecentMessage(item.messages)}
                timestamp={item.timestamp}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return null;
  };

  const refreshControl = () => {
    return (
      <RefreshControl
        refreshing={props.fetchThreadsLoading}
        onRefresh={() => props.dispatchFetchThreads()}
        tintColor={Color.white}
      />
    );
  };

  console.log("threads: ", state.threads);

  return (
    <ScreenContainer>
      <Header
        headerLeft={
          <ButtonText
            text={"Edit"}
            onPress={() => {
              setState({ ...state, showEdit: !state.showEdit });
            }}
            textStyle={{ fontSize: 18, fontWeight: "500", color: Color.white }}
          />
        }
        headerRight={
          <TouchableOpacity onPress={() => props.navigation.navigate(Routes.MESSAGE_MODALS)}>
            <Entypo name={"new-message"} size={20} color={Color.white} />
          </TouchableOpacity>
        }
      />
      <View style={{ paddingLeft: Spacing.large, paddingTop: Spacing.med }}>
        <Text style={{ color: Color.white, fontSize: 40 }}>{"Messages"}</Text>
      </View>
      <View style={{ margin: Spacing.med }}>
        <SearchBar value={""} onChangeText={() => {}} />
      </View>
      {state.threads?.length === 0 ? (
        <View style={styles.emptyMessagesContainer}>
          <Text style={{ color: Color.greyMed, fontSize: 16 }}>{"You have no messages"}</Text>
        </View>
      ) : null}
      <FlatList
        data={state.threads || []}
        renderItem={renderMessagePreview}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl()}
      />
    </ScreenContainer>
  );
};

const mapStateToProps = (state: IStoreState) => {
  return {
    threads: state.messages?.threads,
    fetchThreadsLoading: state.messages?.fetchThreadsLoading,
    fetchThreadsError: state.messages?.fetchThreadsError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchThreads: () => dispatch(fetchThreadsRequested()),
  dispatchFetchMessages: () => dispatch(fetchMessagesRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: Color.darkThemeGreyDark,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Color.darkThemeGreyMed,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: Color.white,
  },
  emptyMessagesContainer: {
    paddingVertical: Spacing.small,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.darkThemeGreyMed,
    marginHorizontal: Spacing.med,
  },
});
