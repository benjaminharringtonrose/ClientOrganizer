import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spacing, Color } from "../styles";
import { NOTIFICATION } from "../api/PushNotifications";
import { Button } from ".";

interface IPostCardProps {
  notificationType?: NOTIFICATION;
  avatar?: string;
  name?: string;
  message?: number;
  timestamp?: number;
  buttons?: any;
}

interface ILocalState {
  commentModalVisible: boolean;
  imageLoading: boolean;
}

export function FriendRequestCard(props: IPostCardProps) {
  const [state, setState] = useState<ILocalState>({
    commentModalVisible: false,
    imageLoading: true,
  });

  const onLoadEnd = () => {
    setState({
      ...state,
      imageLoading: false,
    });
  };

  return (
    <View style={styles.rootContainer}>
      <View style={{ flexDirection: "row" }}>
        {!!props.avatar ? (
          <View>
            <Image
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                marginRight: 16,
                marginLeft: Spacing.small,
              }}
              onLoadEnd={onLoadEnd}
              source={{ uri: props.avatar }}
            />
            {state.imageLoading && (
              <ActivityIndicator
                animating={state.imageLoading}
                color={Color.white}
                style={{ position: "absolute", left: 20, top: 8 }}
              />
            )}
          </View>
        ) : (
          <View style={{ paddingHorizontal: Spacing.small }}>
            <Ionicons name={"person-circle"} color={Color.white} size={30} />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.message}>{props.message}</Text>
        </View>
        <View style={{ marginRight: Spacing.small }}>
          {!!props.buttons &&
            props.buttons.map((button: any) => {
              return (
                <Button
                  style={{
                    paddingHorizontal: Spacing.large,
                    marginBottom: Spacing.micro,
                    backgroundColor: Color.primary,
                  }}
                  label={button?.label}
                  onPress={button.onPress}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    borderRadius: 7,
    borderColor: Color.darkThemeGreyMed,
    borderWidth: 0.5,
    paddingVertical: Spacing.small,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: Color.white,
  },
  message: {
    fontSize: 14,
    color: Color.white,
  },
  post: {
    fontSize: 14,
    color: Color.white,
    marginBottom: Spacing.small,
    marginLeft: Spacing.small,
  },
  postImage: {
    flex: 1,
    width: undefined,
    height: 150,
    marginBottom: Spacing.small,
  },
});
