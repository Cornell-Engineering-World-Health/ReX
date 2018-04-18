import React from 'react'
import {StyleSheet, Text, AppRegistry, TextInput, View, Picker, DatePickerIOS} from 'react-native'
import PickerInputType from './PickerInputType'
import moment from 'moment'

export default class TimePicker extends React.Component {
  constructor (props) {
    super(props)
    date = new Date()
    time = props.chosen_date.split(':')
    date.setHours(time[0])
    date.setMinutes(time[1])

    this.state = {
      title_text: props.title_text,
      value: props.value,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      chosen_date: date
    }
  }

  handleChange (val) {
    this.props.valueChange(this.props.val_label, moment(val.toLocaleTimeString(), 'hh:mm:ss ampm').format('HH:mm'))
    this.setState({chosen_date: val})
  }

  handleDelete (val) {
    console.log('delete')
  }

  render () {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <View onclick={this.handleDelete.bind(this)}>
          <Text style={styles.delete}>Delete</Text>
        </View>
        <View style={styles.picker_container}>
          <DatePickerIOS
            style={styles.picker}
            date={this.state.chosen_date}
            mode={'time'}
            onDateChange={this.handleChange.bind(this)} />
        </View>
      </View>
    )
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
  delete: {
    color: 'red'
  }
})
