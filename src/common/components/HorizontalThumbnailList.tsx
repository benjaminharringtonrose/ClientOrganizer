import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from "react-native";
import { TouchableText } from "../components/TouchableText";
import { Spacing } from "../styles/Spacing";
import { Color } from "../styles/Colors";

interface HorizontalThumbnailListProps {
  headerText?: string;
  topRightActionableText: string;
  onTopRightPress: () => void;
  thumbnailData: ReadonlyArray<any> | null | undefined;
  renderThumbnails: ListRenderItem<any> | null | undefined;
  style?: StyleProp<ViewStyle>;
}
export default class HorizontalThumbnailList extends React.Component<
  HorizontalThumbnailListProps,
  {}
> {
  public render() {
    const {
      headerText,
      topRightActionableText,
      onTopRightPress,
      thumbnailData,
      renderThumbnails,
      style,
    } = this.props;
    return (
      <View style={[style, { flex: 1 }]}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={styles.featuredHeaderText}>{headerText}</Text>
          <TouchableText
            text={topRightActionableText}
            onPress={onTopRightPress}
            style={{
              paddingRight: Spacing.small,
            }}
            textStyle={{ color: Color.white, fontSize: 16 }}
          />
        </View>
        <FlatList
          data={thumbnailData}
          renderItem={renderThumbnails}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  featuredHeaderText: {
    flex: 1,
    color: Color.greyLight,
    fontSize: 22,
    paddingLeft: Spacing.xsmall,
    paddingBottom: Spacing.small,
  },
});
