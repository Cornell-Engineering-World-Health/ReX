import React from 'react'
import {StyleSheet, Text, View, Image, Slider} from 'react-native'

export default class ScaleSlideInputType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title_text: props.title_text,
      value: props.value,
      max_val: props.max_val,
      scale_labels: props.scale_labels,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      intensity_emoticons: [require('../Resources/Images/icons8-intensity-0.png'), require('../Resources/Images/icons8-intensity-1.png'), require('../Resources/Images/icons8-intensity-2.png'), require('../Resources/Images/icons8-intensity-3.png')]
    }
  }

  change (value) {
    console.log(value)
    var intensity_colors = [require('../Resources/Images/icons8-intensity-color-0.png'), require('../Resources/Images/icons8-intensity-color-1.png'), require('../Resources/Images/icons8-intensity-color-2.png'), require('../Resources/Images/icons8-intensity-color-3.png')]
    var intensity_emoticons = [require('../Resources/Images/icons8-intensity-0.png'), require('../Resources/Images/icons8-intensity-1.png'), require('../Resources/Images/icons8-intensity-2.png'), require('../Resources/Images/icons8-intensity-3.png')]
    if (value > 0){
      intensity_emoticons[value - 1] = intensity_colors[value-1]
    }
    this.setState(() => {
      return {
        value: parseFloat(value),
        intensity_emoticons: intensity_emoticons
      }
    })
    this.props.valueChange(this.props.val_label, value)
  }

  render () {
    return (
      <View style = {this.state.input_style}>
        <View style = {{flex: 1, flexDirection: 'row'}}>
          <Image source = {this.state.intensity_emoticons[0]} style = {styles.intensity_image}/>
          <Image source = {this.state.intensity_emoticons[1]} style = {styles.intensity_image}/>
          <Image source = {this.state.intensity_emoticons[2]} style = {styles.intensity_image}/>
          <Image source = {this.state.intensity_emoticons[3]} style = {styles.intensity_image}/>
        </View>
        {/* <Text style={styles.text}>{String(this.state.scale_labels[this.state.value])}</Text> */}
        <Slider
          step={1}
          maximumValue={this.state.max_val}
          onValueChange={this.change.bind(this)}
          value={this.state.value}
          // minimumTrackTintColor='#6ef7c9'
          // minimumTrackTintColor='#aafac8'
          minimumTrackTintColor='#49dcb1'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'green'
  },
  intensity_image: {
    height: 40,
    width: 40,
    marginLeft: 23
  }
})
