import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ScreenContainer, Header, ButtonBack } from "../components";
import { Color, Spacing } from "../styles";
import { IStoreState } from "../store/store";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const list = [
  {
    senderId: "jhsdf",
    message: "hsdgfjhsgdfj",
  },
];

const MOCK_MESSAGES = [
  {
    senderId: "1",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    senderId: "ljJzCc5iZQO847Fw0AHnb75fFq02",
    message: "Lorem ipsum dolor sit amet.",
  },
  {
    senderId: "3",
    message:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    senderId: "ljJzCc5iZQO847Fw0AHnb75fFq02",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    senderId: "5",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    senderId: "ljJzCc5iZQO847Fw0AHnb75fFq02",
    message: "Lorem ipsum dolor sit amet.",
  },
  {
    senderId: "7",
    message:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    senderId: "ljJzCc5iZQO847Fw0AHnb75fFq02",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    senderId: "9",
    message: "Consectetur adipiscing elit!",
  },
];

interface PassedProps {
  navigation: any;
}

interface PropsFromState {
  uid: string;
}

type MessageDetailsProps = PassedProps & PropsFromState;

interface ILocalState {
  image?: string;
  imageLoading: boolean;
}

function MessageDetailsScreen(props: MessageDetailsProps) {
  const [state, setState] = useState<ILocalState>({
    image: undefined,
    imageLoading: true,
  });

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
  // function refreshControl() {
  //   return (
  //     <RefreshControl
  //       refreshing={props.fetchPostsLoading}
  //       onRefresh={() => props.dispatchFetchPosts()}
  //       tintColor={Color.white}
  //     />
  //   );
  // }

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
        data={MOCK_MESSAGES}
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
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              flex: 1,
              minHeight: 40,
              borderColor: Color.darkThemeGreyMed,
              borderWidth: 3,
              borderRadius: 20,
            }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const mapStateToProps = (state: IStoreState) => {
  // console.log(state?.user?.user?.uid);
  return {
    uid: state?.user?.user?.uid,
  };
};

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetailsScreen);
