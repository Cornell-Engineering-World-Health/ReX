import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions
} from 'react-native';
import Moment from 'moment';
import PillDesign from '../MedicineComponents/PillDesign';
import Modal from 'react-native-modal';
const USERNAME = 'Navin';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  header: {
    padding: 20,
    flex: 0.75,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  welcomeText: {
    color: 'white',
    fontSize: 60,
    textAlign: 'center'
  },
  container: {
    flex: 1
  },
  pillImage: {
    height: 75,
    width: 75,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  medicineWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  modalWrapper: {
    height: Dimensions.get('window').height / 2,
    backgroundColor: 'white'
  }
});

const medicineList = [
  {
    title: 'Tylenol',
    quantity: '2 pills',
    dosage: '400 mg',
    time: '6:00 PM',
    pillDesign: 'index1',
    note: 'Take after eating meal.'
  },
  {
    title: 'Sharpies',
    quantity: '2 pens',
    time: '8:00 AM',
    note: 'Take on empty stomach.',
    pillDesign: 'index1'
  },
  {
    title: 'Advil',
    quantity: '1 Tablet',
    time: '12:00 PM',
    note: 'Take after eating meal.',
    pillDesign: 'index2'
  },
  {
    title: 'Sharpies',
    quantity: '2 pens',
    time: '8:00 AM',
    note: 'Take on empty stomach.',
    pillDesign: 'index1'
  },
  {
    title: 'Advil',
    quantity: '1 Tablet',
    time: '12:00 PM',
    note: 'Take after eating meal.',
    pillDesign: 'index2'
  },
  {
    title: 'Advil',
    quantity: '1 Tablet',
    time: '12:00 PM',
    note: 'Take after eating meal.',
    pillDesign: 'index2'
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: null
    };
  }

  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../Resources/purpleGradient.jpg')}
      >
        <View style={styles.pageContainer}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome back {USERNAME} </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default Home;
