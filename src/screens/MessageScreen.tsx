import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ScreenContainer, MessagePreviewCard, Header, ButtonText } from "../components";
import { Color, Spacing } from "../styles";
import { IStringMap } from "./RegisterScreen";
import { IError } from "../store/types";
import { Entypo } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import { Routes } from "../navigation/routes";
import { IStoreState } from "../store/store";
import { fetchMessagesRequested } from "../store/actions/MessagesActions";
import { getMostRecentMessage } from "./util";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  messages?: IStringMap<any>[];
  fetchMessagesLoading: boolean;
  fetchMessagesError?: IError;
}

interface IDispatchFromState {
  dispatchFetchMessages: () => void;
}

type IMessageScreenProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {
  selectedMessage?: IStringMap<any>;
}

const MessageScreen = (props: IMessageScreenProps) => {
  const [state, setState] = useState<ILocalState>({
    selectedMessage: undefined,
  });

  useEffect(() => {
    props.dispatchFetchMessages();
  }, []);

  const renderMessagePreview = ({ item }: any) => {
    const onMessagePress = () => {
      setState({
        ...state,
        selectedMessage: {
          uid: item?.uid,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          avatar: item.avatar,
        },
      });
      props.navigation.navigate(Routes.MESSAGE_DETAILS_SCREEN, {
        threadId: item.threadId,
      });
    };
    if (item) {
      return (
        <TouchableOpacity onPress={onMessagePress}>
          <MessagePreviewCard
            avatar={item.threadAvatar}
            name={`${item.threadFirstName} ${item.threadLastName}`}
            message={getMostRecentMessage(item.messages)}
            timestamp={item.timestamp}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const refreshControl = () => {
    return (
      <RefreshControl
        refreshing={props.fetchMessagesLoading}
        onRefresh={() => props.dispatchFetchMessages()}
        tintColor={Color.white}
      />
    );
  };
  return (
    <ScreenContainer>
      <Header
        headerLeft={
          <ButtonText
            text={"Edit"}
            onPress={() => {}}
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
      {props.messages?.length === 0 ? (
        <View style={styles.emptyMessagesContainer}>
          <Text style={{ color: Color.greyMed, fontSize: 16 }}>{"You have no messages"}</Text>
        </View>
      ) : null}
      <FlatList
        data={props.messages || []}
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
    messages: state.messages?.messages,
    fetchMessagesLoading: state.messages?.fetchMessagesLoading,
    fetchMessagesError: state.messages?.fetchMessagesError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
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
