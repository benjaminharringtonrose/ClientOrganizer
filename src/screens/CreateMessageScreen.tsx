import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from "react-native";
import { Color, Spacing } from "../styles";
import { ScreenContainer, Header, ButtonText, UserCard, Input } from "../components";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { BottomModal } from "../components";
import { connect } from "react-redux";
import { IStoreState } from "../store/store";
import { IStringMap } from "./RegisterScreen";
import { sendMessageRequested, fetchMessagesRequested } from "../store/actions/MessagesActions";
import { FlatList } from "react-native-gesture-handler";
import { mapFriends } from "./util";
import { StackNavigationProp } from "@react-navigation/stack";
import { Routes } from "../navigation/routes";
import { CreateMessageParamList } from "../navigation/navigation";

interface IPassedProps {
  navigation: StackNavigationProp<CreateMessageParamList, Routes.CREATE_MESSAGE_SCREEN>;
}

interface IPropsFromState {
  user?: any;
  sendMessageLoading: boolean;
  sendMessageError?: any;
  friends?: IStringMap<any>;
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
    setState({
      ...state,
      mappedFriends: mapFriends(props?.friends),
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

  const renderFriend = ({ item }: any) => {
    if (item) {
      return (
        <TouchableOpacity
          onPress={() =>
            setState({
              ...state,
              selectedFriend: item,
              friendInput: `${item.friendFirstName} ${item.friendLastName}`,
              showModal: false,
            })
          }
        >
          <UserCard
            avatar={item.friendAvatar}
            name={`${item.friendFirstName} ${item.friendLastName}`}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const onSendMessagePress = () => {
    props.dispatchSendMessage({
      senderId: props.user?.uid,
      recipientId: state.selectedFriend?.friendId,
      message: state.messageInput,
      threadAvatar: state.selectedFriend?.friendAvatar,
      threadFirstName: state.selectedFriend?.friendFirstName,
      threadLastName: state.selectedFriend?.friendLastName,
    });
    props.dispatchFetchMessages();
    props.navigation.navigate(Routes.MESSAGE_DETAILS_SCREEN, {
      threadId: state.selectedFriend?.friendId,
    });
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: Spacing.small,
            paddingRight: Spacing.small,
            borderBottomColor: Color.darkThemeGreyMed,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: Color.greyLight,
              paddingHorizontal: Spacing.small,
            }}
          >
            {"To:"}
          </Text>
          <Input
            style={{
              flex: 1,
              minHeight: 40,
              borderColor: Color.darkThemeGreyMed,
              borderWidth: 2,
              borderRadius: 20,
              backgroundColor: Color.black,
            }}
            selectionColor={Color.greyLight}
            onChangeText={(friendInput: string) => setState({ ...state, friendInput })}
            value={state.friendInput}
          />

          <TouchableOpacity
            style={{ marginLeft: Spacing.small }}
            onPress={() => {
              setState({ ...state, showModal: true });
            }}
          >
            <Ionicons name={"ios-add-circle-outline"} color={Color.primary} size={30} />
          </TouchableOpacity>
        </View>

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
      </View>
      <BottomModal
        title={"Friends"}
        isVisible={state.showModal}
        onBackdropPress={() => setState({ ...state, showModal: false })}
      >
        <SafeAreaView style={{ minHeight: 100, backgroundColor: Color.black }}>
          <FlatList data={state.mappedFriends} renderItem={renderFriend} />
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
    friends: state.user?.user?.friends,
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
