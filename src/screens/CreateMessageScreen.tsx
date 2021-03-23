import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Color, Spacing } from "../styles";
import { ScreenContainer, Header, ButtonText } from "../components";
import { Routes } from "../navigation/routes";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface PassedProps {
  navigation?: any;
}

interface ILocalState {
  image?: string;
  imageLoading: boolean;
}

export function CreateMessageScreen(props: PassedProps) {
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
  return (
    <ScreenContainer>
      <Header
        title={"New Message"}
        headerRight={
          <ButtonText
            text={"Cancel"}
            onPress={() => props.navigation.pop()}
            textStyle={{ fontSize: 18, fontWeight: "500", color: Color.white }}
          />
        }
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: Spacing.small,
            paddingRight: Spacing.small,
            borderColor: Color.darkThemeGreyMed,
            borderWidth: 1,
          }}
        >
          <Text style={{ fontSize: 18, color: Color.greyMed, paddingHorizontal: Spacing.small }}>
            {"To:"}
          </Text>
          <View style={{ flex: 1, marginVertical: Spacing.small }}>
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
          <TouchableOpacity style={{ marginLeft: Spacing.small }}>
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
              borderWidth: 3,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: Spacing.micro,
            }}
          >
            <TextInput style={{ flex: 1 }} />
            <TouchableOpacity>
              <Ionicons name={"ios-send"} color={Color.darkThemeGrey} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
