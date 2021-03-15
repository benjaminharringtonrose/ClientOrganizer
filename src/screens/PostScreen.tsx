import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Firebase from "../../Firebase";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import Routes from "../navigation/routes";
import { Color } from "../styles";
import { ScreenContainer, Header, ButtonText, ButtonBack } from "../components";

interface ILocalState {
  text: string;
  image?: string;
}

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  loading: boolean;
  error: boolean;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
}

type IPostScreenProps = IPropsFromState & IPassedProps;

function PostScreen(props: IPostScreenProps) {
  const [state, setState] = useState<ILocalState>({
    text: "",
    image: undefined,
  });

  const handlePost = () => {
    Firebase.shared
      .addPost({
        firstName: props.firstName,
        lastName: props.lastName,
        avatar: props.avatar,
        text: state.text.trim(),
        image: state.image,
      })
      .then(() => {
        setState({ ...state, text: "", image: undefined });
        props.navigation.navigate(Routes.FEED_SCREEN);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

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

  return (
    <ScreenContainer>
      <Header
        headerLeft={
          <ButtonBack
            onPress={() => props.navigation.goBack()}
            iconSize={24}
            iconColor={Color.white}
          />
        }
        headerRight={
          <ButtonText
            text={"Post"}
            onPress={handlePost}
            textStyle={{ fontWeight: "500", color: Color.white }}
          />
        }
      />
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: props.avatar } || require("../assets/defaultAvatar.png")}
          style={styles.avatar}
        />
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={{ flex: 1, color: Color.white }}
          placeholder="Want to share something?"
          placeholderTextColor={Color.darkThemeGrey}
          onChangeText={(text) => setState({ ...state, text })}
          value={state.text}
        />
      </View>

      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color={Color.darkThemeGrey} />
      </TouchableOpacity>
      {!!state.image ? (
        <View style={{ marginHorizontal: 32, marginTop: 32, height: 250 }}>
          <Image source={{ uri: state.image }} style={styles.image} />
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const mapStateToProps = (state: any) => {
  return {
    avatar: state.user?.user?.avatar,
    firstName: state.user?.user?.firstName,
    lastName: state.user?.user?.lastName,
    email: state.user?.user?.email,
    loading: state.auth.loading,
    error: state.auth?.error,
  };
};

export default connect(mapStateToProps, {})(PostScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkThemeGreyDark,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color.darkThemeGreyMed,
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
