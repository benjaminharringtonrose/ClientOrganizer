import React from "react";
import {
  StyleProp,
  StyleSheet,
  ImageSourcePropType,
  ImageBackground,
  View,
  ImageStyle,
} from "react-native";
import { Text } from "react-native";
import { Spacing } from "../styles/Spacing";
import { Color } from "../styles/Colors";
interface ThumbnailActionableProps {
  imageSource: ImageSourcePropType;
  name: string;
  school: string;
  profession: string;
  style?: StyleProp<ImageStyle>;
}
export const ThumbnailActionable = (props: ThumbnailActionableProps) => {
  const { imageSource, name, school, profession, style } = props;
  return (
    <ImageBackground
      style={[style, styles.image]}
      source={imageSource}
      resizeMode={"cover"}
      imageStyle={{ borderRadius: 10 }}
    >
      <View
        style={{
          flex: 1,
          alignSelf: "flex-end",
          justifyContent: "flex-end",
          margin: Spacing.micro,
        }}
      >
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{profession}</Text>
        <Text style={styles.text}>{school}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 225,
    marginHorizontal: Spacing.micro,
  },
  text: {
    textAlign: "right",
    color: Color.white,
    textShadowColor: Color.black,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 8,
  },
});
