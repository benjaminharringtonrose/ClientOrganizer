import React from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import Card from "../components/Card";
import CardSection from "../components/CardSection";
import Button from "../components/Button";
import { Color } from "../styles";

interface IAlertModalProps {
  label: string;
  onDeletePress: () => void;
  onCancelPress: () => void;
  isVisible: boolean;
}

export default function AlertModal(props: IAlertModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={props.isVisible}>
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
    backgroundColor: Color.darkThemeGrey,
    borderRadius: 3,
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
