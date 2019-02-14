import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import SearchInput, { createFilter } from "react-native-search-filter";
export default class TextInputType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title_text: props.title_text,
      placeholder_text: props.placeholder_text,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      input_text_style: props.input_text_style,
      text: props.text
    };
    this.textInput;
  }

  render() {
    let fakeData = ["hello", "world", "not", "helloworld"];
    const filteredMed = fakeData.filter(createFilter(this.state.text));
    console.log(filteredMed);
    return (
      <View style={[this.state.input_style]}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <Autocomplete
          ref={t => {
            this.textInput = t;
          }}
          style={[styles.text, this.state.input_text_style]}
          value={this.state.text == "NONE" ? "" : this.state.text}
          onChangeText={text => {
            this.setState({ text: text });
            this.props.valueChange(this.props.val_label, text);
          }}
          autoCorrect={false}
          hideResults={this.state.text == 0}
          data={filteredMed}
          inputContainerStyle={{ borderWidth: 0 }}
          blurOnSubmit={this.props.blurOnSubmit}
          returnKeyType={this.props.returnKeyType}
          onSubmitEditing={() => {
            this.props.onSubmitEditing();
          }}
          placeholder={this.state.placeholder_text}
          keyboardType={this.props.keyboardType}
          listStyle={{ backgroundColor: "white" }}
          renderItem={item => (
            <TouchableOpacity
              style={styles.dropItem}
              onPress={() => this.setState({ text: item })}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "white",
    borderWidth: 0
  },
  dropItem: {
    backgroundColor: "white",
    borderWidth: 0
  }
});
