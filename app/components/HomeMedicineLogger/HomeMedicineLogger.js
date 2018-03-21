import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ImageBackground, TouchableHighlight, Dimensions } from 'react-native';
import styles from './styles';
import {COLOR} from '../Resources/constants';
const opacity = '30';
const shift = Dimensions.get('window').width*.02;

const HomeMedicineLogger = ({done, onPress, handlerMorning, handlerAfternoon, handlerEvening, handlerNight}) => {
  colors = [COLOR.red+opacity, COLOR.cyan+opacity, COLOR.purple+opacity, COLOR.blue+opacity ]
  done.map((val, i, done) => {done[i] = val ? colors[i] : '#FFFFFF' });

  return (
  <View style={styles.medicineViewContainer}>
    <View style={styles.medicineViewRow}>
      <TouchableHighlight
        activeOpacity={.5}
        underlayColor={colors[0]}
        style={[{backgroundColor: done[0]}, styles.medicineButton, styles.topLeftQuadrant]}
        onPress={handlerMorning}
      >
        <View style={[styles.buttonContent, {left: shift*2, top: shift}]}>
          <ImageBackground
            style={styles.imageStyle}
            source={require('../Resources/morningColor.png')}
          />
          <Text>9</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={colors[1]}
        style={[{backgroundColor: done[1]}, styles.medicineButton, styles.topRightQuadrant]}
        onPress={handlerAfternoon}
      >
        <View style={[styles.buttonContent, {right: shift*2, top: shift}]}>
          <ImageBackground
            style={styles.imageStyle}
            source={require('../Resources/afternoonColor.png')}
          />
          <Text>9</Text>
        </View>
      </TouchableHighlight>
    </View>
    <View style={styles.medicineViewRow}>
      <TouchableHighlight
        underlayColor={colors[2]}
        style={[{backgroundColor: done[2]}, styles.medicineButton, styles.bottomLeftQuadrant]}
        onPress={handlerEvening}
      >
        <View style={[styles.buttonContent, {left: shift*2, bottom: shift}]}>
          <ImageBackground
            style={styles.imageStyle}
            source={require('../Resources/eveningColor.png')}
          />
          <Text>9</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={colors[3]}
        style={[{backgroundColor: done[3]}, styles.medicineButton, styles.bottomRightQuadrant]}
        onPress={handlerNight}
      >
      <View style={[styles.buttonContent, {right: shift*2, bottom: shift}]}>
        <ImageBackground
          style={styles.imageStyle}
          source={require('../Resources/nightColor.png')}
        />
        <Text>9</Text>
      </View>
      </TouchableHighlight>
    </View>
  </View>
)};

HomeMedicineLogger.propTypes = {
  done: PropTypes.array,
  onPress: PropTypes.func,
  handlerMorning: PropTypes.func,
  handlerAfternoon: PropTypes.func,
  handlerEvening: PropTypes.func,
  handlerNight: PropTypes.func,
}

export default HomeMedicineLogger;
