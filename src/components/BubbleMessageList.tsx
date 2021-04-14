import React from "react";
import { FlatList } from "react-native";
import { BubbleSender } from "./BubbleSender";
import { BubbleReciever } from "./BubbleReciever";
import { IStringMap } from "../screens/RegisterScreen";

interface IBubbleMessageListProps {
  messages?: IStringMap<any>[];
  uid: string;
}

export const BubbleMessageList = (props: IBubbleMessageListProps) => {
  const isSender = (senderId: string) => {
    if (senderId === props.uid) {
      return true;
    }
    return false;
  };

  return (
    <FlatList
      data={props?.messages || []}
      inverted
      renderItem={({ item }) => {
        if (item) {
          if (isSender(item.senderId)) {
            return <BubbleSender message={item.message} />;
          } else {
            return <BubbleReciever message={item.message} />;
          }
        }
        return null;
      }}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};
