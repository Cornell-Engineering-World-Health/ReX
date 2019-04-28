import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import { IMAGES } from "../../resources/constants";

/**
 * Emulates the StackNavigator header.
 */
const NavigationHeader = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={props.onPressBack}>
        <Image
          style={[styles.img, props.imageStyle]}
          source={IMAGES.headerBack}
        />
      </TouchableOpacity>
      {props.title ? (
        <Text style={[styles.title, props.textStyle]}>{props.title}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 10,
    borderBottomColor: "black",
    paddingBottom: 10,
    marginBottom: 10,
    justifyContent: "center"
  },
  img: {
    width: 30,
    height: 30
  },
  title: {
    fontSize: 30,
    fontWeight: "200"
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 0
  }
});

NavigationHeader.propTypes = {
  onPressBack: PropTypes.func,
  title: PropTypes.string
};

export default NavigationHeader;
