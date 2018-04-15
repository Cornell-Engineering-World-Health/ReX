import React from 'react';
import { Text, View, ImageBackground, TouchableHighlight, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
const width = Dimensions.get('window').width / 7 -7;
const SelectedIndicator = () => {

  return (
  <View style={styles.box}>
    <View style={styles.whiteTop}/>
    <View style={[styles.whiteSide, {left: -3}]}/>
    <View style={[styles.whiteSide,  {right: -3}]}/>
  </View>
)};

const whitespace = (Dimensions.get('window').width / 7 -9) * 0.65;

const styles = StyleSheet.create({
  box: {
    width: width,
    height: 43,
    position: 'absolute',
    borderWidth: 3,
    alignItems: 'center',
  },
  whiteTop: {
    position: 'absolute',
    width: whitespace,
    height: 3,
    backgroundColor: 'white',
    top: -3,
  },
  whiteSide: {
    position: 'absolute',
    width: 3,
    height: 43 - ((whitespace/.65) - whitespace) -4,
    backgroundColor: 'white',
    top: ((whitespace/.65- whitespace) - 3*2) / 2 + 4 ,
  },
});

export default SelectedIndicator;
