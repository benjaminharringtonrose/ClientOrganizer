import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { ScreenContainer, Header, ButtonBack } from "../components";
import { Color } from "../styles";
import { IStoreState } from "../store/store";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { Routes } from "../navigation/routes";
import { MessageParamList } from "../navigation/navigation";
import { RouteProp } from "../store/types";
import { fetchMessagesRequested, sendMessageRequested } from "../store/actions/MessagesActions";
import { IStringMap } from "./RegisterScreen";
import firebase from "firebase";
import { BubbleSender } from "../components/BubbleSender";
import { BubbleReciever } from "../components/BubbleReciever";
import { MessageSenderInput } from "../components/MessageSenderInput";
import { BubbleMessageList } from "../components/BubbleMessageList";

interface IPassedProps {
  navigation: StackNavigationProp<MessageParamList, Routes.MESSAGE_DETAILS_SCREEN>;
  route: RouteProp<MessageParamList, Routes.MESSAGE_DETAILS_SCREEN>;
}

interface IPropsFromState {
  uid: string;
  messages?: IStringMap<any>[];
  threads?: any;
  user: any;
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
    var unsubscribe = firebase
      .firestore()
      .collection("messages")
      .doc(props.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const docData = doc.data();
          for (const [key, item] of Object.entries(docData!)) {
            if (key === props.route.params?.threadId) {
              let messages: any = [];
              for (const [key, message] of Object.entries(item.messages!)) {
                messages = messages.concat({ ...(message as Object), id: key });
              }
              messages.sort(function (a: any, b: any) {
                return a.timestamp < b.timestamp;
              });
              setState({ ...state, mappedMessages: messages });
            }
          }
        }
      });
    return function cleanup() {
      unsubscribe();
    };
  }, []);

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

  const onSendMessagePress = () => {
    setState({ ...state, messageInput: "" });
    props.dispatchSendMessage({
      senderId: props.uid,
      recipientId: props.route.params?.threadId,
      message: state.messageInput,
      threadAvatar: props.user.avatar,
      threadFirstName: props.user.firstName,
      threadLastName: props.user.lastName,
    });
    props.dispatchFetchMessages();
  };

  return (
    <ScreenContainer>
      <Header
        title={"Message Details"}
        headerLeft={
          <ButtonBack
            onPress={() => props.navigation.popToTop()}
            iconSize={24}
            iconColor={Color.white}
          />
        }
      />
      <BubbleMessageList messages={state.mappedMessages} uid={props.uid} />
      <MessageSenderInput
        onChangeText={(messageInput: string) => setState({ ...state, messageInput })}
        onCameraPress={() => {}}
        onSendPress={onSendMessagePress}
      />
    </ScreenContainer>
  );
}

const mapStateToProps = (state: IStoreState) => {
  return {
    uid: state.user?.user?.uid,
    messages: state.messages?.messages,
    threads: state.messages?.threads,
    user: state.user?.user,
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
