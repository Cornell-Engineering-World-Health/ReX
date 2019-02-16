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
import medicine_data from "../../resources/drugs.json";
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
    let medicineData = medicine_data.drugs;
    const filteredMed = medicineData.filter(createFilter(this.state.text));
    return (
      <View style={[this.state.input_style]}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>

        <Autocomplete
          ref={t => {
            this.textInput = t;
          }}
          listStyle={{ backgroundColor: "pink", flex: 1 }}
          inputContainerStyle={{ borderWidth: 0 }}
          containerStyle={[styles.autocompleteContainer]}
          style={[styles.text, this.state.input_text_style]}
          value={this.state.text == "NONE" ? "" : this.state.text}
          onChangeText={text => {
            this.setState({ text: text });
            this.props.valueChange(this.props.val_label, text);
          }}
          autoCorrect={false}
          hideResults={
            this.state.text == 0 ||
            this.props.keyboardType == "number-pad" ||
            true
          }
          data={filteredMed}
          blurOnSubmit={this.props.blurOnSubmit}
          returnKeyType={this.props.returnKeyType}
          onSubmitEditing={() => {
            this.props.onSubmitEditing();
          }}
          placeholder={this.state.placeholder_text}
          keyboardType={this.props.keyboardType}
          renderItem={item => (
            <TouchableOpacity
              style={styles.dropItem}
              onPress={() => this.setState({ text: item })}
            >
              <Text style={styles.itemText}>{item}</Text>
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
    backgroundColor: "cyan",
    borderWidth: 0,
    margin: 5
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 18,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: "#F5FCFF",
    marginTop: 8
  }
});
