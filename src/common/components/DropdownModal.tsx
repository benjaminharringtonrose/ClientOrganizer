import * as React from "react";
import { View, ViewProperties } from "react-native";
import { BottomModal } from "./BottomModal";
import CellIconActionable from "./CellIconActionable";

export interface DropdownModalProps extends ViewProperties {
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  loading?: boolean;
  isVisible: boolean;
  modalTitle: string;
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
      <>
        <CellIconActionable
          label={this.props.label}
          labelRight={this.props.value || placeholderText}
          onPress={this.props.onPress}
          disabled={this.props.disabled}
          iconRightName={"down"}
          iconRightSize={16}
        />
        <BottomModal
          title={this.props.modalTitle}
          isVisible={this.props.isVisible}
          onBackdropPress={() => this.props.onBackdropPress()}
        >
          {this.props.children}
        </BottomModal>
      </>
    );
  }
}
