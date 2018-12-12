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

/**
 * Checklist input component for forms
 */
export default class ChecklistInputType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title_text: props.title_text,
      list_values: props.list_values,
      logicalValArray: props.value,
      input_style: props.input_style,
      title_text_style: props.title_text_style
    };
  }

  handleChange (idx, val) {
    let submit_option_val_map = {}
    this.state.list_values.forEach((e, i) => {
      submit_option_val_map[e] = (i == idx) ? val : this.state.logicalValArray[i]
    })
    this.props.valueChange(this.props.val_label, submit_option_val_map)
    tempArr = this.state.logicalValArray
    tempArr[idx] = val
    this.setState({
      logicalValArray: tempArr
    })
  }

  render() {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <ScrollView horizontal>
          <View style={styles.checkbox_area}>
            {this.state.list_values.map((prop, key) => {
              return <ColorButton key={key} button_text={prop}
                                  value={this.state.logicalValArray[key]}
                                  handleChange={e => {this.handleChange(key, e)}}
                      />;
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
