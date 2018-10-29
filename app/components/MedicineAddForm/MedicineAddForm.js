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
import TextInputType from '../LogInputTypes/TextInputType'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);
import { Calendar } from 'react-native-calendars';

export default class MedicineAddForm extends React.Component {
  constructor (props) {
    super(props)

    this.name;
    this.dosage;
  }

  valueChange(label, value){

  }

  nextFocus(){
    this.dosage.textInput.focus()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>{'Input MEd'}</Text>
        </View>
        <TextInputType
          ref={(t) => {this.name = t}}
          input_style={styles.input_container_green}
          title_text_style={styles.title_text}
          text={''}
          placeholder_text={'Tap to type'}
          title_text={'Medicine Name'}
          val_label={'name'}
          valueChange={this.valueChange.bind(this)}
          blurOnSubmit={false}
          returnKeyType = { 'next' }
          onSubmitEditing={() => {this.nextFocus()}}
        />
        <TextInputType
          ref={(t) => {this.dosage = t}}
          input_style={styles.input_container_green}
          title_text_style={styles.title_text}
          text={''}
          placeholder_text={'Tap to type'}
          title_text={'Dosage (mg)'}
          val_label={'dosage'}
          valueChange={this.valueChange.bind(this)}
          blurOnSubmit={false}
          returnKeyType = { 'next' }
          onSubmitEditing={() => {}}
          keyboardType={'number-pad'}
        />
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20
  },
  headerView: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: viewportWidth
  },
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '400',
    color: 'black'
  },
  title_text: {
    fontSize: 20,
    color: '#e5e5e5',
    paddingBottom: 10
  },
  input_container_green: {
    width: 320,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#2D8464',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2D8464'
  },
})
