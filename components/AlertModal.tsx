import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "./Card";
import CardSection from "./CardSection";
import Button from "./Button";
import { Color } from "../../styles";
import { Modal } from "./Modal";

interface IAlertModalProps {
  label: string;
  onDeletePress: () => void;
  onCancelPress: () => void;
  isVisible: boolean;
}

export default function AlertModal(props: IAlertModalProps) {
  return (
    <Modal isVisible={props.isVisible}>
      <View style={styles.centeredView}>
        <Card>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.label}</Text>
            <CardSection>
              <Button label={"Delete"} onPress={props.onDeletePress} />
            </CardSection>
            <CardSection>
              <Button label={"Cancel"} onPress={props.onCancelPress} />
            </CardSection>
          </View>
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 100,
    backgroundColor: Color.darkThemeGreyDark,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Color.darkThemeGrey,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "white",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
