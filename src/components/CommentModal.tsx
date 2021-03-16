import React, { Component, useState } from "react";
import { DropdownModal } from "./DropdownModal";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { Color } from "../styles";
import { View, StyleProp, ViewStyle } from "react-native";
import { BottomModal } from "./BottomModal";

interface ICommentModalProps {
  modalTitle: string;
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
  children: (JSX.Element | null)[] | JSX.Element | null;
  onBackdropPress: () => void;
}

interface ILocalState {
  showModal: boolean;
}
export function CommentModal(props: ICommentModalProps) {
  return (
    <View style={props.style}>
      <BottomModal
        title={props.modalTitle}
        isVisible={props.isVisible}
        onBackdropPress={props.onBackdropPress}
      >
        {props.children}
      </BottomModal>
    </View>
  );
}
