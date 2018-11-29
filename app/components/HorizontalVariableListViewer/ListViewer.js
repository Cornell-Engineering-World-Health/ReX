import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Header,
  ScrollView,
  TouchableOpacity,
  DatePickerIOS,
  Picker,
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
import { COLOR } from '../Resources/constants';

/**
ListViewer is a horizontal scrollview of items of a list.
*/
const ListViewer = ({list, backgroundColor}) => {
  let contents = list.map((v, i) => {
    return (
      <View
        style={[styles.item, {backgroundColor: backgroundColor}]}
        key={i}
      >
        <Text style={styles.itemText}>{v}</Text>
      </View>
    )
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
          {contents}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-start'
  },
  item: {
    padding: 5,
    height: 30,
    borderRadius: 10,
    marginRight: 5,
    marginLeft: 5
  },
  itemText: {
    color: 'white',
    fontSize: 16
  }
})

ListViewer.propTypes = {
  list: PropTypes.array,
  color: PropTypes.string
}

export default ListViewer
