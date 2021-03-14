import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Firebase from "../../Firebase";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import Routes from "../navigation/routes";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" size={24} color="#D8D9DB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost}>
          <Text style={{ fontWeight: "500" }}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={{ uri: props.avatar } || require("../assets/defaultAvatar.png")}
          style={styles.avatar}
        />
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={{ flex: 1 }}
          placeholder="Want to share something?"
          onChangeText={(text) => setState({ ...state, text })}
          value={state.text}
        />
      </View>

      <TouchableOpacity style={styles.photo} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color="#D8D9DB" />
      </TouchableOpacity>
      {!!state.image && (
        <View style={{ marginHorizontal: 32, marginTop: 32, height: 250 }}>
          <Image source={{ uri: state.image }} style={styles.image} />
        </View>
      )}
    </SafeAreaView>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
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
