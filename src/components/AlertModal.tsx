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
  onBackdropPress: () => void;
}

export default function AlertModal(props: IAlertModalProps) {
  return (
    // I added is to fix ts but idk what it is -> panResponderThreshold={10} so if
    // there's issues it's probably because of that.
    <Modal
      panResponderThreshold={10}
      isVisible={props.isVisible}
      onBackdropPress={props.onBackdropPress}
    >
      <View style={styles.centeredView}>
        <Card>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.label}</Text>
            {props.actions.map((action) => {
              return (
                <CardSection style={{ marginBottom: Spacing.xsmall }}>
                  <Button
                    label={action.buttonLabel}
                    onPress={action.onPress}
                    style={{ backgroundColor: Color.primary }}
                  />
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
  },
  modalView: {
    marginTop: 100,
    backgroundColor: Color.darkThemeGreyDark,
    borderRadius: 15,
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
