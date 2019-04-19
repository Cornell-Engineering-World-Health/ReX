import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Picker
} from 'react-native';
import Modal from 'react-native-modal';
import { COLOR } from '../../resources/constants.js';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

var MORE_SPECIFIC_DEFAULT = 'More Specific';
export default class MultiChoice extends React.Component {
  static propTypes = {
    buttonTitles: PropTypes.array, // array of strings
    valueChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      pickerModalOpen: false,
      selected: -1
    };
  }

  handleChange(val) {
    this.props.valueChange(this.props.val_label, val);
  }

  render() {
    let buttonBody = this.props.buttonTitles.map((option, x) => {
      var isLastElement = x == this.props.buttonTitles.length - 1;

      return (
        <View style={styles.buttonWrapper} key={x}>
          <TouchableOpacity
            onPress={() => {
              this.handleChange(option);
              this.setState({ selected: x });
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
          <Text style={styles.questionText}>
            {'???'}
          </Text>
        </View>
        <View style={styles.body}>
          {buttonBody}
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
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingLeft: 20,
    paddingRight: 20
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

});
