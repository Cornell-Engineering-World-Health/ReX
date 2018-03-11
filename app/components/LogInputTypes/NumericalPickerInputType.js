import React from 'react'
import {StyleSheet, Text, AppRegistry, TextInput, View, Picker} from 'react-native'
import PickerInputType from './PickerInputType'

export default class NumericalPickerInputType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title_text: props.title_text,
      value: props.value + ' ' + props.unit,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      picker_values: []
    }
    for (let i = props.min; i <= props.max; i++) {
      this.state.picker_values.push(i + ' ' + props.unit)
    }
  }

  render () {
    return (
      <PickerInputType
        title_text={this.state.title_text}
        value={this.state.value}
        picker_values={this.state.picker_values}
        input_style={this.state.input_style}
        title_text_style={this.state.title_text_style}
      />
    )
  }
}
