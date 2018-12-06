import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Header,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../Button/Button';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);
import { Calendar } from 'react-native-calendars';
import { COLOR, IMAGES } from '../../resources/constants';

/**
 * Emulates the StackNavigator header.
 */
const NavigationHeader = ({ onPressBack, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onPressBack}>
        <Image style={styles.img} source={IMAGES.headerBack} />
      </TouchableOpacity>
      {title ? <Text style={styles.title}>{title}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    borderBottomColor: 'black',
    paddingBottom: 10,
    marginBottom: 10,
    justifyContent: 'center'
  },
  img: {
    width: 30,
    height: 30
  },
  title: {
    fontSize: 30,
    fontWeight: '200'
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0
  }
});

NavigationHeader.propTypes = {
  onPressBack: PropTypes.func,
  title: PropTypes.string
};

export default NavigationHeader;
