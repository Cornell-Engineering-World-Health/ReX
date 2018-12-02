<<<<<<< HEAD
import React from 'react';
=======
import React from 'react'
>>>>>>> nocirclesadface
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
<<<<<<< HEAD
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from 'react-native-modal';
import TextInputType from '../LogInputTypes/TextInputType';
import TimePicker from '../LogInputTypes/TimePicker';
import Button from '../Button/Button';
=======
} from 'react-native'
import PropTypes from 'prop-types';
import moment from 'moment'
import Modal from 'react-native-modal'
import TextInputType from '../LogInputTypes/TextInputType'
import TimePicker from '../LogInputTypes/TimePicker'
import Button from '../Button/Button'
>>>>>>> nocirclesadface
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);
import { Calendar } from 'react-native-calendars';
<<<<<<< HEAD
import { COLOR } from '../../resources/constants';
=======
import { COLOR } from '../Resources/constants';
>>>>>>> nocirclesadface

/**
ListViewer is a horizontal scrollview of items of a list.
*/
<<<<<<< HEAD
const ListViewer = ({ list, backgroundColor }) => {
  let contents = list.map((v, i) => {
    return (
      <View style={[styles.item, { backgroundColor: backgroundColor }]} key={i}>
        <Text style={styles.itemText}>{v}</Text>
      </View>
    );
=======
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
>>>>>>> nocirclesadface
  });

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <ScrollView horizontal>{contents}</ScrollView>
    </View>
  );
};
=======
      <ScrollView horizontal>
          {contents}
      </ScrollView>
    </View>
  )
}
>>>>>>> nocirclesadface

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
<<<<<<< HEAD
});
=======
})
>>>>>>> nocirclesadface

ListViewer.propTypes = {
  list: PropTypes.array,
  color: PropTypes.string
<<<<<<< HEAD
};

export default ListViewer;
=======
}

export default ListViewer
>>>>>>> nocirclesadface
