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
<<<<<<< HEAD
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../Button/Button';
=======
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
>>>>>>> nocirclesadface
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);
import { Calendar } from 'react-native-calendars';
<<<<<<< HEAD
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
=======
import { COLOR, IMAGES } from '../Resources/constants';

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
>>>>>>> nocirclesadface

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 10,
    borderBottomColor: 'black',
<<<<<<< HEAD
    paddingBottom: 10,
    marginBottom: 10,
    justifyContent: 'center'
=======
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 5,
    marginBottom: 10
>>>>>>> nocirclesadface
  },
  img: {
    width: 30,
    height: 30
<<<<<<< HEAD
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
=======
  }
})

NavigationHeader.propTypes = {
  onPressBack: PropTypes.func,
}

export default NavigationHeader
>>>>>>> nocirclesadface
