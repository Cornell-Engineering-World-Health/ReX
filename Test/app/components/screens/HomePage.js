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
  swiperStyle: {
    flex: 1
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  medicineSlide: {
    height: 125,
    width: Dimensions.get('window').width,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20
  },
  medicineWrapper: {
    height: 125,
    width: Dimensions.get('window').width,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20
  }
});

const medicineList = [
  {
    title: 'Tylenol',
    quantity: '2 pills',
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
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: null
    };
  }

  _renderMedicine() {
    let list = [];
    let result = [];
    var keyIncrement = 0;
    for (var y = 0; y < medicineList.length; y++) {
      let x = 'index' + keyIncrement;
      list.push(
        <View style={{ alignItems: 'center' }} key={x}>
          <PillDesign
            onPress={() => this.setState({ modalVisible: x })}
            type={medicineList[y].pillDesign}
          />
          <Text style={{ color: 'white' }}>{medicineList[y].title}</Text>
          <Text style={{ color: 'white' }}>{medicineList[y].time}</Text>
          <Modal
            style={{
              flex: 1,
              justifyContent: 'space-around',
              backgroundColor: 'black'
            }}
            isVisible={this.state.modalVisible == x}
            onBackdropPress={() => this.setState({ modalVisible: null })}
          >
            <View>
              <Text style={styles.welcomeText}>{medicineList[y].title}</Text>
              <Text style={styles.welcomeText}>{medicineList[y].quantity}</Text>
              <Text style={styles.welcomeText}>{medicineList[y].time}</Text>
              <Text style={styles.welcomeText}>{medicineList[y].note}</Text>
            </View>
          </Modal>
        </View>
      );
      keyIncrement += 1;
    }
    for (var x = 0; x < 10; x++) {
      let keyItem = 'day' + x;
      result.push(
        <View key={keyItem} style={styles.medicineWrapper}>
          <View style={styles.medicineSlide}>{list}</View>
          <Text>{Moment(Date.now()).format('DD-MM-YYYY')}</Text>
        </View>
      );
    }
    return result;
  }

  render() {
    let medicinePage = this._renderMedicine();

    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../Resources/purpleGradient.jpg')}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome back {USERNAME} </Text>
          </View>
          <ScrollView horizontal={true} pagingEnabled={true}>
            {medicinePage}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}
export default Home;
