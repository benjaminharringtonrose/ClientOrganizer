import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Color, Spacing } from "../styles";
import { ScreenContainer, ButtonText, UserCard, Input } from "../components";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { BottomModal } from "../components";
import { connect } from "react-redux";
import { IStoreState } from "../store/store";
import { IStringMap } from "./RegisterScreen";
import { sendMessageRequested, fetchMessagesRequested } from "../store/actions/MessagesActions";
import { FlatList } from "react-native-gesture-handler";
import { mapFriends, getFriendsAsync } from "./util";
import { StackNavigationProp } from "@react-navigation/stack";
import { Routes } from "../navigation/routes";
import { CreateMessageParamList } from "../navigation/navigation";
import { MessageRecipientInput } from "../components/MessageRecipientInput";
import { MessageSenderInput } from "../components/MessageSenderInput";

interface IPassedProps {
  navigation: StackNavigationProp<CreateMessageParamList, Routes.CREATE_MESSAGE_SCREEN>;
}

interface IPropsFromState {
  user?: any;
  sendMessageLoading: boolean;
  sendMessageError?: any;
  friendsList?: string[];
}

interface ILocalState {
  image?: string;
  imageLoading: boolean;
  showModal: boolean;
  friendInput: string;
  messageInput: string;
  mappedFriends?: IStringMap<any>[];
  selectedFriend?: IStringMap<any>;
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

type CreateMessageScreenProps = IPassedProps & IPropsFromState & IDispatchFromState;

function CreateMessageScreen(props: CreateMessageScreenProps) {
  const [state, setState] = useState<ILocalState>({
    image: undefined,
    imageLoading: true,
    showModal: false,
    friendInput: "",
    messageInput: "",
    mappedFriends: undefined,
    selectedFriend: undefined,
  });

  useEffect(() => {
    props.navigation.setOptions({
      title: "New Message",
      headerRight: () => (
        <ButtonText
          text={"Cancel"}
          onPress={() => props.navigation.pop()}
          textStyle={{ fontSize: 18, fontWeight: "500", color: Color.white }}
          containerStyle={{ paddingRight: Spacing.small }}
        />
      ),
    });
    getFriendsAsync(props.friendsList).then((friends) => {
      setState({ ...state, mappedFriends: mapFriends(friends) });
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      setState({
        ...state,
        image: result.uri,
      });
    }
  };

  const onSendMessagePress = () => {
    props.dispatchSendMessage({
      senderId: props.user?.uid,
      recipientId: state.selectedFriend?.uid,
      message: state.messageInput,
      threadAvatar: state.selectedFriend?.avatar,
      threadFirstName: state.selectedFriend?.firstName,
      threadLastName: state.selectedFriend?.lastName,
    });
    props.dispatchFetchMessages();
    props.navigation.navigate(Routes.MESSAGE_DETAILS_SCREEN, {
      threadId: state.selectedFriend?.uid,
    });
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <MessageRecipientInput
          onChangeText={(friendInput: string) => setState({ ...state, friendInput })}
          value={state.friendInput}
          onAddRecipientPress={() => setState({ ...state, showModal: true })}
        />
        <MessageSenderInput
          onChangeText={(messageInput: string) => setState({ ...state, messageInput })}
          onCameraPress={() => {}}
          onSendPress={onSendMessagePress}
        />
      </View>
      <BottomModal
        title={"Friends"}
        isVisible={state.showModal}
        onBackdropPress={() => setState({ ...state, showModal: false })}
      >
        <SafeAreaView style={{ minHeight: 100, backgroundColor: Color.black }}>
          <FlatList
            data={state.mappedFriends}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    setState({
                      ...state,
                      selectedFriend: item,
                      friendInput: `${item.firstName} ${item.lastName}`,
                      showModal: false,
                    })
                  }
                >
                  <UserCard avatar={item.avatar} name={`${item.firstName} ${item.lastName}`} />
                </TouchableOpacity>
              );
            }}
          />
        </SafeAreaView>
      </BottomModal>
    </ScreenContainer>
  );
}

const mapStateToProps = (state: IStoreState) => {
  return {
    user: state.user?.user,
    sendMessageLoading: state.messages.sendMessageLoading,
    sendMessageError: state.messages?.fetchMessagesError,
    friendsList: state.user?.user?.friendsList,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
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
  dispatchFetchMessages: () => dispatch(fetchMessagesRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageScreen);

const styles = StyleSheet.create({});
