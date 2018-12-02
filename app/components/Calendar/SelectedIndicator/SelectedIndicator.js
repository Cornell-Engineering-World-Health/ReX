import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { StyleSheet } from 'react-native';
import { COLOR } from '../../../resources/constants';
const width = Dimensions.get('window').width / 7 - 7;
const height = Dimensions.get('window').height / 2.5 / 6;

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

const whitespace = (Dimensions.get('window').width / 7 - 9) * 0.65;

const styles = StyleSheet.create({
  box: {
    width: width,
    height: height,
    position: 'absolute',
    borderWidth: 3,
    alignItems: 'center',
    borderColor: '#C0C0C0'
  },
  whiteTop: {
    position: 'absolute',
    width: whitespace,
    height: 3,
    backgroundColor: 'white'
  },
  whiteSide: {
    position: 'absolute',
    width: 3,
    height: height - (width - whitespace),
    backgroundColor: 'white',
    top: (width - whitespace) / 2 - 3
  },
  blackBottom: {
    position: 'absolute',
    width: whitespace,
    height: 3,
    backgroundColor: '#C0C0C0',
    bottom: -3
  }
});

export default SelectedIndicator;
