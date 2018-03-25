import React from 'react';
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
} from 'react-native';
import CheckBox from 'react-native-check-box';
import ColorButton from './ColorButton';

export default class ChecklistInputType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title_text: props.title_text,
      list_values: props.list_values,
      input_style: props.input_style,
      title_text_style: props.title_text_style
    };
  }

  render() {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <ScrollView horizontal>
          <View style={styles.checkbox_area}>
            {this.state.list_values.map((prop, key) => {
              return <ColorButton key={key} button_text={prop} />;
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkbox_area: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: 200
  }
});