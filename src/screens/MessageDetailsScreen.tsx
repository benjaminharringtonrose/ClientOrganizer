import React, { useState } from "react";
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
import { MessageSenderInput } from "../components/MessageSenderInput";
import { BubbleMessageList } from "../components/BubbleMessageList";
import { useMessages } from "../hooks/useMessages";

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
}

function MessageDetailsScreen(props: MessageDetailsProps) {
  const [state, setState] = useState<ILocalState>({
    image: undefined,
    imageLoading: true,
    messageInput: "",
  });

  const messages = useMessages(props.route.params?.threadId);

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
    props.dispatchSendMessage({
      senderId: props.uid,
      recipientId: props.route.params?.threadId,
      message: state.messageInput,
      threadAvatar: props.user.avatar,
      threadFirstName: props.user.firstName,
      threadLastName: props.user.lastName,
    });
    setState({ ...state, messageInput: "" });
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
      <BubbleMessageList messages={messages} uid={props.uid} />
      <MessageSenderInput
        onChangeText={(messageInput: string) => setState({ ...state, messageInput })}
        onCameraPress={() => {}}
        onSendPress={onSendMessagePress}
        value={state.messageInput}
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
