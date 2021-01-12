import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewProperties,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Spacing, Color } from "../styles";
import { Divider } from "./Divider";
import Icon from "react-native-vector-icons/FontAwesome";
import { Modal } from "./Modal";
import { BottomModal } from "./BottomModal";
import CardSection from "./CardSection";
import CellLabelLeftRight from "./CellLabelLeftRight";
import CellIconActionable from "./CellIconActionable";

export interface DropdownModalProps extends ViewProperties {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  loading?: boolean;
  isVisible: boolean;
  onPress: () => void;
  onBackdropPress: () => void;
}

interface LocalState {
  showModal: boolean;
}

export class DropdownModal extends React.PureComponent<DropdownModalProps, LocalState> {
  public render() {
    const placeholderText = this.props.placeholder || "Select Value";
    return (
      <CardSection style={{ flexDirection: "column" }}>
        <TouchableOpacity
          style={this.props.style}
          onPress={this.props.onPress}
          disabled={this.props.disabled}
        >
          <CellIconActionable
            label={"Date"}
            labelRight={this.props.value || placeholderText}
            onPress={this.props.onPress}
            disabled={this.props.disabled}
            iconRightName={"down"}
            iconRightSize={16}
          />
          <BottomModal
            title={"title"}
            isVisible={this.props.isVisible}
            onBackdropPress={() => this.props.onBackdropPress()}
          >
            {this.props.children}
          </BottomModal>
        </TouchableOpacity>
      </CardSection>
    );
  }
}
