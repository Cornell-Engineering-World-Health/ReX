import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Header,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types';
import moment from 'moment'
import Modal from 'react-native-modal'
import TextInputType from '../LogInputTypes/TextInputType'
import TimePicker from '../LogInputTypes/TimePicker'
import Button from '../Button/Button'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);
import { Calendar } from 'react-native-calendars';
import { COLOR, IMAGES } from '../../resources/constants';

/**
* Emulates the StackNavigator header.
*/
const NavigationHeader = ({onPressBack}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressBack}
      >
        <Image style={styles.img} source={IMAGES.headerBack} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
    marginBottom: 10
  },
  img: {
    width: 30,
    height: 30
  }
})

NavigationHeader.propTypes = {
  onPressBack: PropTypes.func,
}

export default NavigationHeader
