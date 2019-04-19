import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import styles from './styles';
import { COLOR, IMAGES } from '../../resources/constants';
const opacity = '20';
const shift = 4 * (Dimensions.get('window').width * 0.4) / (3 * Math.PI);
const radius = Dimensions.get('window').width * 0.4;

const HomeMedicineLogger = ({
  done,
  onPress,
  handlerMorning,
  handlerAfternoon,
  handlerEvening,
  handlerNight,
  amtArr
}) => {
  colors = [
    COLOR.red + opacity,
    COLOR.cyan + opacity,
    COLOR.purple + opacity,
    COLOR.blue + opacity
  ];
  done.map((val, i, done) => {
    done[i] = val ? colors[i] : '#FFFFFF';
  });

  return (
    <View style={styles.medicineViewContainer}>
      <View style={styles.medicineViewRow}>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={colors[0]}
          style={[
            { backgroundColor: done[0] },
            styles.medicineButton,
            styles.topLeftQuadrant
          ]}
          onPress={() => {
            handlerMorning(false);
          }}
          onLongPress={() => {
            handlerMorning(true);
          }}
        >
          <View
            style={[
              styles.buttonContent,
              {
                right: shift - radius * 0.5 / 2,
                bottom: shift - radius * 0.9 / 2
              }
            ]}
          >
            <Text style={styles.timeText}>5am - 12pm</Text>
            <ImageBackground
              style={styles.imageStyle}
              source={IMAGES.morningColor}
            />
            <Text style={styles.amountText}>{amtArr[0]}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors[1]}
          style={[
            { backgroundColor: done[1] },
            styles.medicineButton,
            styles.topRightQuadrant
          ]}
          onPress={() => {
            handlerAfternoon(false);
          }}
          onLongPress={() => {
            handlerAfternoon(true);
          }}
        >
          <View
            style={[
              styles.buttonContent,
              {
                left: shift - radius * 0.5 / 2,
                bottom: shift - radius * 0.9 / 2
              }
            ]}
          >
            <Text style={styles.timeText}>12pm - 5pm</Text>
            <ImageBackground
              style={styles.imageStyle}
              source={IMAGES.afternoonColor}
            />
            <Text style={styles.amountText}>{amtArr[1]}</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.medicineViewRow}>
        <TouchableHighlight
          underlayColor={colors[2]}
          style={[
            { backgroundColor: done[2] },
            styles.medicineButton,
            styles.bottomLeftQuadrant
          ]}
          onPress={() => {
            handlerEvening(false);
          }}
          onLongPress={() => {
            handlerEvening(true);
          }}
        >
          <View
            style={[
              styles.buttonContent,
              { right: shift - radius * 0.5 / 2, top: shift - radius * 0.8 / 2 }
            ]}
          >
            <Text style={styles.timeText}>5pm - 9pm</Text>
            <ImageBackground
              style={styles.imageStyle}
              source={IMAGES.eveningColor}
            />
            <Text style={styles.amountText}>{amtArr[2]}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={colors[3]}
          style={[
            { backgroundColor: done[3] },
            styles.medicineButton,
            styles.bottomRightQuadrant
          ]}
          onPress={() => {
            handlerNight(false);
          }}
          onLongPress={() => {
            handlerNight(true);
          }}
        >
          <View
            style={[
              styles.buttonContent,
              { left: shift - radius * 0.5 / 2, top: shift - radius * 0.8 / 2 }
            ]}
          >
            <Text style={styles.timeText}>9pm - 5am</Text>
            <ImageBackground
              style={styles.imageStyle}
              source={IMAGES.nightColor}
            />
            <Text style={styles.amountText}>{amtArr[3]}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

HomeMedicineLogger.propTypes = {
  done: PropTypes.array,
  onPress: PropTypes.func,
  handlerMorning: PropTypes.func,
  handlerAfternoon: PropTypes.func,
  handlerEvening: PropTypes.func,
  handlerNight: PropTypes.func,
  amtArr: PropTypes.array
};

export default HomeMedicineLogger;
