import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { Routes } from "../navigation/routes";
import { Color, Spacing } from "../styles";
import { ScreenContainer, Header, ButtonText, ButtonBack } from "../components";
import { ADD_POST } from "../store/types";
import { usePrevious } from "../hooks/usePrevious";

interface IPassedProps {
  navigation: any;
}

interface IPropsFromState {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  addPostLoading: boolean;
  addPostError?: any;
}

interface IDispatchFromState {
  dispatchAddPost: (object: any) => any;
}

type IPostScreenProps = IPropsFromState & IPassedProps & IDispatchFromState;

interface ILocalState {
  text: string;
  image?: string;
  imageLoading: boolean;
}

function PostScreen(props: IPostScreenProps) {
  const [state, setState] = useState<ILocalState>({
    text: "",
    image: undefined,
    imageLoading: true,
  });

  const oldProps = usePrevious(props);

  useEffect(() => {
    if (oldProps?.addPostLoading && !props.addPostLoading && !props.addPostError) {
      props.navigation.navigate(Routes.FEED_SCREEN);
    }
  }, [props.addPostLoading, props.addPostError]);

  const handlePost = () => {
    props.dispatchAddPost({
      firstName: props.firstName,
      lastName: props.lastName,
      avatar: props.avatar,
      text: state.text.trim(),
      image: state.image,
    });
    setState({ ...state, image: undefined, text: "" });
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

  const onLoadEnd = () => {
    setState({ ...state, imageLoading: false });
  };

  if (props.addPostLoading) {
    return (
      <ScreenContainer style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={Color.white} size={"large"} />
      </ScreenContainer>
    );
  }
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
        {!!props.avatar ? (
          <View>
            <Image style={styles.avatar} onLoadEnd={onLoadEnd} source={{ uri: props.avatar }} />
            {state.imageLoading && (
              <ActivityIndicator
                animating={state.imageLoading}
                color={Color.white}
                style={{ position: "absolute", left: 14, top: 14 }}
              />
            )}
          </View>
        ) : (
          <Ionicons
            name={"person-circle-outline"}
            color={Color.white}
            size={40}
            style={{ marginRight: Spacing.small }}
          />
        )}
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
        <View style={{ marginTop: 32, height: 300 }}>
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
    addPostLoading: state.user?.addPostLoading,
    addPostError: state.user?.addPostError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  dispatchAddPost: (object: any) => dispatch({ type: ADD_POST.REQUESTED, payload: object }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

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
    alignItems: "center",
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
    borderRadius: 3,
  },
});
