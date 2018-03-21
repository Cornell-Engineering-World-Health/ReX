import React from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, TouchableHighlight } from 'react-native';
import styles from './styles';
import constants from '../Resources/constants';

const HomeMedicineLogger = ({onPress}) => (
  <View style={styles.medicineViewContainer}>
    <View style={styles.medicineViewRow}>
      <TouchableHighlight
        activeOpacity={.5}
        underlayColor={}
        style={[styles.medicineButton, styles.topLeftQuadrant]}
        onPress={onPress}
      >
        <ImageBackground
          style={styles.imageStyle}
          source={require('../Resources/morningColor.png')}
        >
        </ImageBackground>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={.5}
        underlayColor={}
        style={[styles.medicineButton, styles.topRightQuadrant]}
        onPress={onPress}
      >
        <ImageBackground
          style={styles.imageStyle}
          source={require('../Resources/afternoonColor.png')}
        >
        </ImageBackground>
      </TouchableHighlight>
    </View>
    <View style={styles.medicineViewRow}>
      <TouchableHighlight
        activeOpacity={.5}
        underlayColor={}
        style={[styles.medicineButton, styles.bottomLeftQuadrant]}
        onPress={onPress}
      >
        <ImageBackground
          style={styles.imageStyle}
          source={require('../Resources/eveningColor.png')}
        >
        </ImageBackground>
      </TouchableHighlight>
      <TouchableHighlight
        activeOpacity={.5}
        underlayColor={}
        style={[styles.medicineButton, styles.bottomRightQuadrant]}
        onPress={onPress}
      >
        <ImageBackground
          style={styles.imageStyle}
          source={require('../Resources/nightColor.png')}
        >
        </ImageBackground>
      </TouchableHighlight>
    </View>
  </View>
);

HomeMedicineLogger.propTypes = {
  onPress: PropTypes.func,
}

export default HomeMedicineLogger;
