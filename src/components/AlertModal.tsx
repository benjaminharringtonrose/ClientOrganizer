import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "./Card";
import { CardSection } from "./CardSection";
import { Button } from "./Button";
import { Color, Spacing } from "../styles";
import { Modal } from "./Modal";
import { IStringMap } from "../screens/RegisterScreen";

interface IAlertModalProps {
  label: string;
  actions: IStringMap<any>[];
  isVisible: boolean;
}

export default function AlertModal(props: IAlertModalProps) {
  return (
    <Modal isVisible={props.isVisible}>
      <View style={styles.centeredView}>
        <Card>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.label}</Text>
            {props.actions.map((action) => {
              return (
                <CardSection>
                  <Button label={action.buttonLabel} onPress={action.onPress} />
                </CardSection>
              );
            })}
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
    marginTop: 22,
  },
  modalView: {
    marginTop: 100,
    backgroundColor: Color.darkThemeGreyMed,
    borderRadius: 3,
    padding: 40,
    marginHorizontal: Spacing.small,
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
