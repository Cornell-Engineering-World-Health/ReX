import React from 'react'
import {StyleSheet, Text, AppRegistry, TextInput, View, Image} from 'react-native'

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
        <View style = {{flex: 1, flexDirection: 'row'}}>
        <Image source = {require('../Resources/Images/icons8-right-arrow-filled-50.png')} style = {styles.images}/>
        <TextInput style={styles.text}
          onChangeText={(text) => {
            this.setState({text})
            this.props.valueChange(this.props.val_label, text)
          }}
          placeholder={this.state.placeholder_text}
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',

  },
  images: {
    height: 30,
    width: 30,
    marginRight: 10

  }
})
