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
      background_color: !this.state.background_color
    })
  }

  render () {
    return (
      <TouchableOpacity
        style={[styles.checkbutton, {backgroundColor: this.state.background_color ? '#2D6D84' : 'transparent'}]}
        onPress={this.changeCheckbuttonStyle.bind(this)}>
        <Text style={[styles.checkbox_text, {color: this.state.background_color ? '#2D6D84' : '#6ef7c9'}]}>
          {this.state.button_text}
        </Text>
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#6ef7c9'
  },
  checkbox: {
    flex: 1,
    padding: 5
  },
  checkbox_text: {
    fontSize: 20,
    color: '#747375'
  }
})
