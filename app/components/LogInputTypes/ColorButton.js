import React from 'react'
import {StyleSheet, Text, AppRegistry, TextInput, View, TouchableOpacity} from 'react-native'

export default class ColorButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      button_text: props.button_text,
      background_color: false
    }
  }

  changeCheckbuttonStyle () {
    this.setState({
      button_text: this.state.button_text,
      background_color: !this.state.background_color
    })
  }

  render () {
    return (
      <TouchableOpacity
        style={[styles.checkbutton, {backgroundColor: this.state.background_color ? '#bf5252' : 'transparent'}]}
        onClick={this.changeCheckbuttonStyle.bind(this)}>
        <Text style={styles.checkbox_text}>{this.state.button_text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  checkbutton: {
    margin: 10,
    alignItems: 'bottom',
    width: 200,
    height: 40,
    alignItems: 'center',
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#bf5252'
  },
  checkbox: {
    flex: 1,
    padding: 5
  },
  checkbox_text: {
    color: 'white',
    fontSize: 20
  }
})
