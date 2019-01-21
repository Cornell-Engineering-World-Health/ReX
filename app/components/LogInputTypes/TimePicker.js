import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  DatePickerIOS,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    date = new Date();

    let rounding = 15 * 60 * 1000;
    let closest15minTime = moment();
    closest15minTime = moment(Math.round((+closest15minTime) / rounding) * rounding);
    let timeStr = closest15minTime.format("HH:mm");

    time = timeStr.split(':');
    date.setHours(time[0]);
    date.setMinutes(time[1]);


    this.state = {
      title_text: props.title_text,
      value: props.value,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      chosen_date: date
    };
  }

  handleChange(val) {
    this.props.valueChange(
      this.props.val_label,
      moment(val.toLocaleTimeString(), 'hh:mm:ss ampm').format('HH:mm')
    );
    this.setState({ chosen_date: val });
  }

  handleDelete(val) {
    this.props.deletePressed();
  }

  handleAdd(val) {
    this.props.addPressed();
  }

  render() {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginBottom: 30,
            paddingLeft: 5
          }}
        >
          <TouchableOpacity onPress={this.handleAdd.bind(this)}>
            <Text style={styles.add}>Add Another</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleDelete.bind(this)}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.picker_container}>
          <DatePickerIOS
            date={this.state.chosen_date}
            mode={'time'}
            minuteInterval={15}
            onDateChange={this.handleChange.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker_container: {
    flex: 1,
    justifyContent: 'center'
  },
  picker: {
    color: 'white'
  },
  add: {
    color: 'green',
    fontSize: 16,
    marginRight: 10
  },
  delete: {
    color: 'red',
    fontSize: 16
  }
});
