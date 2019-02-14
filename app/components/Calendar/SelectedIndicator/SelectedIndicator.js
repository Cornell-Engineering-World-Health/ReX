import React from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
const width = Dimensions.get("window").width / 7 - 7;
const height = Dimensions.get("window").height / 2.5 / 6;

const SelectedIndicator = () => {
  return (
    <View style={styles.box}>
      <View style={[styles.whiteTop, { top: -3 }]} />
      <View style={[styles.whiteSide, { left: -3 }]} />
      <View style={[styles.whiteSide, { right: -3 }]} />
      <View style={[styles.whiteTop, { bottom: -3 }]} />
    </View>
  );
};

const whitespace = (Dimensions.get("window").width / 7 - 9) * 0.65;

const styles = StyleSheet.create({
  box: {
    width: width,
    height: height,
    position: "absolute",
    borderWidth: 3,
    alignItems: "center",
    borderColor: "#C0C0C0"
  },
  whiteTop: {
    position: "absolute",
    width: whitespace,
    height: 3,
    backgroundColor: "white"
  },
  whiteSide: {
    position: "absolute",
    width: 3,
    height: height - (width - whitespace),
    backgroundColor: "transparent",
    top: (width - whitespace) / 2 - 3
  }
});

export default SelectedIndicator;
