import React from 'react'
import {StyleSheet, Text, AppRegistry, TextInput, View} from 'react-native'

export default class TextInputType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title_text: props.title_text,
      placeholder_text: props.placeholder_text,
      input_style: props.input_style,
      title_text_style: props.title_text_style
    }
  }

  render () {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <TextInput style={styles.text}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.placeholder_text}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'white'
  }
})
