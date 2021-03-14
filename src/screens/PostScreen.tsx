import React from "react";
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
import UserPermissions from "../utilities/UserPermissions";

interface ILocalState {
  text: string;
  image: string;
}

interface IPropsFromState {}

export default class PostScreen extends React.Component<ILocalState> {
  state = {
    user: {
      text: "",
      image: undefined,
    },
  };

  show = null;
  componentDidMount() {
    UserPermissions.getCameraPermission;
    const user = Firebase.shared.uid;

    this.show = Firebase.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        this.setState({ user: doc.data() });
      });
  }
  handlePost = () => {
    Firebase.shared
      .addPost({
        name: this.state.user.name,
        text: this.state.user.text.trim(),
        localUri: this.state.user.image,
        uri: this.state.user.avatar,
        // id: id
      })
      .then((ref) => {
        this.setState({ user: { ...this.state.user, text: "" } });
        this.setState({ user: { ...this.state.user, image: undefined } });
        this.setState({
          user: { ...this.state.user, avatar: this.state.user.avatar },
        });
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, image: result.uri } });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={24} color="#D8D9DB" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePost}>
            <Text style={{ fontWeight: "500" }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={
              this.state.user.avatar
                ? { uri: this.state.user.avatar }
                : require("../assets/defaultAvatar.png")
            }
            style={styles.avatar}
          />
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder="Want to share something?"
            onChangeText={(text) => this.setState({ user: { ...this.state.user, text: text } })}
            value={this.state.user.text}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <Ionicons name="md-camera" size={32} color="#D8D9DB" />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 250 }}>
          <Image source={{ uri: this.state.user.image }} style={styles.image} />
        </View>
      </SafeAreaView>
    );
  }
}

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
