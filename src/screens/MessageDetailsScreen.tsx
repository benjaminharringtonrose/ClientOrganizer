import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { ScreenContainer, Header, ButtonBack, Input } from "../components";
import { Color, Spacing } from "../styles";
import { IStoreState } from "../store/store";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { Routes } from "../navigation/routes";
import { MessageParamList } from "../navigation/navigation";
import { RouteProp } from "../store/types";
import { fetchMessagesRequested, sendMessageRequested } from "../store/actions/MessagesActions";
import { IStringMap } from "./RegisterScreen";

interface IPassedProps {
  navigation: StackNavigationProp<MessageParamList, Routes.MESSAGE_DETAILS_SCREEN>;
  route: RouteProp<MessageParamList, Routes.MESSAGE_DETAILS_SCREEN>;
}

interface IPropsFromState {
  uid: string;
  messages?: IStringMap<any>[];
}

interface IDispatchFromState {
  dispatchSendMessage: ({
    senderId,
    recipientId,
    threadFirstName,
    threadLastName,
    threadAvatar,
    message,
  }: any) => void;
  dispatchFetchMessages: () => void;
}

type MessageDetailsProps = IPassedProps & IPropsFromState & IDispatchFromState;

interface ILocalState {
  image?: string;
  imageLoading: boolean;
  messageInput: string;
  mappedMessages?: IStringMap<any>[];
}

function MessageDetailsScreen(props: MessageDetailsProps) {
  const [state, setState] = useState<ILocalState>({
    image: undefined,
    imageLoading: true,
    messageInput: "",
    mappedMessages: undefined,
  });

  useEffect(() => {
    const messages: any = [];
    if (props.messages) {
      for (const [key, thread] of Object.entries(props.messages)) {
        if (props.route.params?.threadId === thread.threadId) {
          for (const [key, message] of Object.entries(thread.messages)) {
            messages.push(message);
          }
        }
      }
    }
    setState({ ...state, mappedMessages: messages });
  }, [props.messages]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setState({ ...state, image: result.uri });
    }
  };

  const getThreadData = (senderId: string, messages?: IStringMap<any>) => {
    if (!messages) {
      console.warn("No messages");
      return;
    }
    console.log("senderId", senderId, "messages", messages);
    for (const [key, value] of Object.entries(messages)) {
      if (value.senderId === senderId) {
        return value;
      }
    }
  };

  const onSendMessagePress = () => {
    const threadData = getThreadData(props.route.params?.senderId, props.messages);
    props.dispatchSendMessage({
      senderId: props.uid,
      recipientId: props.route.params?.senderId,
      message: state.messageInput,
      threadAvatar: threadData.threadAvatar,
      threadFirstName: threadData.threadFirstName,
      threadLastName: threadData.threadLastName,
    });
    props.dispatchFetchMessages();
    setState({ ...state, messageInput: "" });
  };

  const isSender = (senderId: string) => {
    if (senderId === props.uid) {
      return true;
    }
    return false;
  };

  const screenWidth = Dimensions.get("screen").width;

  return (
    <ScreenContainer>
      <Header
        title={"Message Details"}
        headerLeft={
          <ButtonBack
            onPress={() => props.navigation.goBack()}
            iconSize={24}
            iconColor={Color.white}
          />
        }
      />
      <FlatList
        data={state.mappedMessages}
        inverted
        renderItem={({ item }) => {
          if (item) {
            if (isSender(item.senderId)) {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    marginBottom: Spacing.micro,
                    marginHorizontal: Spacing.small,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      padding: 15,
                      backgroundColor: Color.primary,
                      borderRadius: 20,
                      width: screenWidth * 0.8,
                    }}
                  >
                    <Text style={{ color: Color.white, fontSize: 18 }}>{item.message}</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    marginBottom: Spacing.micro,
                    marginHorizontal: Spacing.small,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      padding: 15,
                      backgroundColor: Color.darkThemeGreyMed,
                      borderRadius: 20,
                      width: screenWidth * 0.8,
                    }}
                  >
                    <Text style={{ color: Color.white, fontSize: 18 }}>{item.message}</Text>
                  </View>
                </View>
              );
            }
          }
          return null;
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        // refreshControl={refreshControl()}
      />

      <View
        style={{
          flexDirection: "row",
          paddingVertical: Spacing.small,
          paddingRight: Spacing.small,
          borderTopColor: Color.darkThemeGreyMed,
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: Spacing.small,
          }}
          onPress={pickImage}
        >
          <Ionicons name="md-camera" size={32} color={Color.darkThemeGrey} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            minHeight: 40,
            borderColor: Color.darkThemeGreyMed,
            borderWidth: 2,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: Spacing.micro,
          }}
        >
          <Input
            style={{
              flex: 1,
              backgroundColor: Color.black,
            }}
            selectionColor={Color.greyLight}
            onChangeText={(messageInput: string) => setState({ ...state, messageInput })}
          />
          <TouchableOpacity style={{ paddingRight: Spacing.small }} onPress={onSendMessagePress}>
            <Ionicons name={"ios-send"} color={Color.darkThemeGrey} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

const mapStateToProps = (state: IStoreState) => {
  return {
    uid: state?.user?.user?.uid,
    messages: state.messages?.messages,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchFetchMessages: () => dispatch(fetchMessagesRequested()),
  dispatchSendMessage: ({
    senderId,
    recipientId,
    threadFirstName,
    threadLastName,
    threadAvatar,
    message,
  }: any) =>
    dispatch(
      sendMessageRequested({
        senderId,
        recipientId,
        threadFirstName,
        threadLastName,
        threadAvatar,
        message,
      })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailsScreen);
