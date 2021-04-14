import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spacing, Color } from "../styles";
import moment from "moment";

interface IMessagePreviewCardProps {
  avatar?: string;
  name?: string;
  message?: string;
  timestamp?: number;
  onPress?: () => void;
}

interface ILocalState {
  imageLoading: boolean;
}

export function MessagePreviewCard(props: IMessagePreviewCardProps) {
  const [state, setState] = useState<ILocalState>({
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
        {!!props?.avatar ? (
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
              source={{ uri: props?.avatar }}
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
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.name}>{props?.name}</Text>
            <View style={{ flexDirection: "row", marginRight: Spacing.small }}>
              {!!props?.timestamp && (
                <Text style={styles.time} numberOfLines={1}>
                  {moment(props?.timestamp).fromNow()}
                </Text>
              )}

              <Ionicons name={"chevron-forward"} color={Color.greyMed} size={18} />
            </View>
          </View>
          <View>
            <Text style={styles.message} numberOfLines={2}>
              {props?.message}
            </Text>
          </View>
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
    minHeight: 75,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: Color.white,
  },
  time: {
    fontSize: 15,
    fontWeight: "500",
    color: Color.greyMed,
  },
  message: {
    fontSize: 11,
    color: Color.greyMed,
    marginTop: Spacing.xsmall,
    marginBottom: Spacing.small,
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
