import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  DatePickerIOS,
  Picker
} from 'react-native';
import Modal from 'react-native-modal';
import { COLOR } from '../Resources/constants.js';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

const durationButtonTitles = [
  '< 1 Hour',
  'Between 1 - 3 hours',
  'Between 3-5 hours',
  '> 5 hours',
  'More Specific'
];

export default class Duration extends React.Component {
  static propTypes = {
    buttonTitles: PropTypes.array, // array of strings
    valueChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      pickerModalOpen: false,
      hourChoice: 0,
      minuteChoice: 0,
      selected: -1
    };
  }

  handleChange(val) {
    this.props.valueChange(this.props.val_label, val);
  }
  handleMoreSpecificChange() {
    let hour = this.state.hourChoice;
    let minute = this.state.minuteChoice;

    let hourSuffix = hour == 1 ? ' hour' : ' hours';
    let minuteSuffix = minute == 1 ? ' minute' : ' minutes';

    if (minute == 0) {
      this.props.valueChange(this.props.val_label, hour + hourSuffix);
    } else {
      this.props.valueChange(
        this.props.val_label,
        hour + hourSuffix + ', ' + minute + minuteSuffix
      );
    }
  }

  _renderTimePicker() {
    const MAX_HOURS = 48;
    let hours_arr = [];
    let mins_arr = [];
    for (var x = 0; x < MAX_HOURS; x++) {
      hours_arr.push(<Picker.Item key={x} label={x + ''} value={x} />);
    }

    for (var y = 0; y < 60; y += 5) {
      mins_arr.push(<Picker.Item key={y} label={y + ''} value={y} />);
    }

    return (
      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.hourChoice}
          onValueChange={val => {
            this.setState({ hourChoice: val });
          }}
        >
          {hours_arr}
        </Picker>
        <Text>Hours</Text>
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.minuteChoice}
          onValueChange={val => {
            this.setState({ minuteChoice: val });
          }}
        >
          {mins_arr}
        </Picker>
        <Text> Minutes </Text>
      </View>
    );
  }

  render() {
    //first put in the normal buttons
    let buttonBody = durationButtonTitles.map((option, x) => {
      return (
        <View style={styles.buttonWrapper} key={x}>
          <TouchableOpacity
            onPress={() => {
              if (x == durationButtonTitles.length - 1) {
                this.setState({ pickerModalOpen: true });
              } else {
                this.handleChange(option);
                this.setState({ selected: x });
              }
            }}
            style={
              this.state.selected == x ? styles.buttonSelected : styles.button
            }
          >
            <Text
              style={
                this.state.selected == x
                  ? styles.textSelected
                  : styles.buttonText
              }
            >
              {option}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.questionText}>{'How long has it been?'}</Text>
        </View>
        <View style={styles.body}>
          {buttonBody}

          <Modal
            isVisible={this.state.pickerModalOpen}
            animationInTiming={500}
            animationOutTiming={500}
            onBackdropPress={() => {
              this.setState({ pickerModalOpen: false });
            }}
            style={styles.modal}
          >
            <View
              style={{
                flex: 0.35,
                backgroundColor: '#ffffff'
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[styles.modalSubmitButton, { borderRightWidth: 1 }]}
                  onPress={() => {
                    this.setState({ pickerModalOpen: false, selected: 5 });
                    this.handleMoreSpecificChange();
                  }}
                  alignItems="center"
                >
                  <Text style={styles.text}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSubmitButton}
                  onPress={() => {
                    this.setState({ pickerModalOpen: false });
                  }}
                  alignItems="center"
                >
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
              </View>
              {this._renderTimePicker()}
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 15
  },
  textSelected: {
    fontSize: 18,
    fontWeight: '100',
    textAlign: 'center',
    color: 'white'
  },
  header: {
    flex: 0.2
  },
  body: {
    flex: 0.8
  },
  questionText: {
    fontSize: 25,
    fontWeight: '200',
    textAlign: 'center'
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalSubmitButton: {
    width: viewportWidth / 2,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aedfe1'
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12
  },
  button: {
    borderColor: COLOR.blue,
    borderWidth: 2,
    padding: 5,
    justifyContent: 'center',
    height: 43,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.11,
    borderRadius: 5,
    marginBottom: 6
  },
  buttonSelected: {
    backgroundColor: COLOR.blue,
    padding: 5,
    justifyContent: 'center',
    height: 43,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.11,
    borderRadius: 5,
    borderRadius: 5,
    marginBottom: 6
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center'
  },
  buttonWrapper: {
    width: viewportWidth * 0.75
  },
  pickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  pickerStyle: {
    flex: 1
  }
});
