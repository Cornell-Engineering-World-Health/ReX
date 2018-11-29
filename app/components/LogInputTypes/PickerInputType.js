import React from 'react';
import {
  StyleSheet,
  Text,
  AppRegistry,
  TextInput,
  View,
  Picker
} from 'react-native';

export default class PickerInputType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title_text: props.title_text,
      value: props.value,
      picker_values: props.picker_values,
      input_style: props.input_style,
      title_text_style: props.title_text_style
    };
  }

  render() {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <View style={styles.picker_container}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.value}
            onValueChange={val => {
              this.setState({ value: val });
              this.props.handleChange(val);
            }}
          >
            {this.state.picker_values.map((prop, key) => {
              return (
                <Picker.Item
                  key={key}
                  label={prop}
                  value={prop}
                  color="black"
                />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picker: { width: 200 }
});
