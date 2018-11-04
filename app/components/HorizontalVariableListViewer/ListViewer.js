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
const ListViewer = ({list}) => {
  let contents = list.map((v, i) => {
    return (
      <View
        style={styles.item}
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
    height: 50
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-start'
  },
  item: {
    backgroundColor: COLOR.cyan,
    padding: 5,
    height: 30,
    borderRadius: 10,
    marginTop: 10,
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
  allowEdit: PropTypes.bool,
  onAdd: PropTypes.func,
  onRemoveRecent: PropTypes.func
}

export default ListViewer
