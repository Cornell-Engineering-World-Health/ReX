import React from 'react'
import {StyleSheet, Text, View, Slider} from 'react-native'

export default class ScaleSlideInputType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title_text: props.title_text,
      value: props.value,
      max_val: props.max_val,
      scale_labels: props.scale_labels,
      input_style: props.input_style,
      title_text_style: props.title_text_style
    }
  }

  change (value) {
    this.setState(() => {
      return {
        value: parseFloat(value)
      }
    })
  }

  render () {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <Text style={styles.text}>{String(this.state.scale_labels[this.state.value])}</Text>
        <Slider
          step={1}
          maximumValue={this.state.max_val}
          onValueChange={this.change.bind(this)}
          value={this.state.value}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  }
})
