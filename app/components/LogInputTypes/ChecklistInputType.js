import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
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
          <View style={styles.checkbox_area}>
            {this.state.list_values.map((prop, key) => {
              return <ColorButton key={key} button_text={prop}
                                  value={this.state.logicalValArray[key]}
                                  handleChange={e => {this.handleChange(key, e)}}
                      />;
            })}
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkbox_area: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
