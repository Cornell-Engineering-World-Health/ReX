import React from 'react'
import {
  StyleSheet,
  Text,
  AppRegistry,
  TextInput,
  View,
  ScrollView,
  Picker,
  ViewPropTypes,
  TouchableOpacity
} from 'react-native'
import CheckBox from 'react-native-check-box'
import ColorButton from './ColorButton'

export default class ChecklistInputType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title_text: props.title_text,
      list_values: props.list_values,
      input_style: props.input_style,
      title_text_style: props.title_text_style
    }
  }

  handleChange (val) {
    this.props.valueChange(this.props.val_label, val)
  }

  render () {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <View style={styles.checkbox_area}>
          <ScrollView vertical>
            {this.state.list_values.map((prop, key) => {
              return <ColorButton key={key} button_text={prop} />
            })}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkbox_area: {
    alignItems: 'center',
    height: 200
  }
})
