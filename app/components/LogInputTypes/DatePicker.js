import React from 'react'
import {StyleSheet, Text, View, DatePickerIOS} from 'react-native'
import moment from 'moment'

export default class DatePicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title_text: props.title_text,
      value: props.value,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      chosen_date: new Date()
    }
  }

  handleChange (val) {
    this.props.valueChange(this.props.val_label, moment(val.toLocaleDateString(), 'MM/DD/YYYY').format('YYYY-MM-DD'))
    this.setState({chosen_date: val})
  }

  render () {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <View style={styles.picker_container}>
          <DatePickerIOS
            style={styles.picker}
            date={this.state.chosen_date}
            mode={'date'}
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
    backgroundColor: 'white'
  }
})
