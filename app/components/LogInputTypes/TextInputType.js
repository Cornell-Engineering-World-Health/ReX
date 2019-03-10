import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import SearchInput, { createFilter } from "react-native-search-filter";
import medicine_data from "../../resources/drugs.json";

const OPEN_HEIGHT = 150;
var counter = 0;
export default class TextInputType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title_text: props.title_text,
      placeholder_text: props.placeholder_text,
      input_style: props.input_style,
      title_text_style: props.title_text_style,
      input_text_style: props.input_text_style,
      text: props.text,
      isTyping: false,
      height: new Animated.Value(0)
    };
    this.textInput;
  }

  expand() {
    Animated.timing(this.state.height, {
      toValue: OPEN_HEIGHT,
      duration: 300
    }).start();
  }

  contract() {
    Animated.timing(this.state.height, {
      toValue: 0,
      duration: 300
    }).start();
  }

  render() {
    let medicineData = medicine_data.drugs;
    const filteredMed = medicineData.filter(createFilter(this.state.text));
    let shouldExpand = this.state.isTyping && this.props.autocomplete;
    console.log(this.state.text, "TEXXT" + this.props.title_text);
    return (
      <View style={[this.state.input_style]}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        <TextInput
          ref={t => {
            this.textInput = t;
          }}
          autoCorrect={false}
          style={[styles.text, this.state.input_text_style]}
          value={this.state.text == "NONE" ? "" : this.state.text}
          onChangeText={text => {
            this.setState({ text: text }, () => console.log(this.state.text));
            this.props.valueChange(this.props.val_label, text);
            let temp_f = medicineData.filter(createFilter(text));
            if (shouldExpand && text.length > 0 && temp_f.length > 0) {
              this.expand();
            } else {
              this.contract();
            }
          }}
          onFocus={() => {
            let func =
              shouldExpand && filteredMed.length > 0 && this.state.text > 0
                ? func
                : null;
            this.setState({ isTyping: true }, func);
          }}
          onBlur={() => {
            this.setState({ isTyping: false }, this.contract);
          }}
          blurOnSubmit={this.props.blurOnSubmit}
          returnKeyType={this.props.returnKeyType}
          onSubmitEditing={() => {
            this.props.onSubmitEditing();
          }}
          placeholder={this.state.placeholder_text}
          keyboardType={this.props.keyboardType}
        />
        <Animated.View
          style={[
            styles.suggestionsContainer,
            {
              height: this.state.height
            }
          ]}
        >
          <FlatList
            keyboardShouldPersistTaps={"handled"}
            data={filteredMed}
            keyExtractor={(item, index) => item}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.acButton}
                  onPress={() => {
                    this.props.valueChange(this.props.val_label, item);
                    this.setState({ isTyping: false, text: item }, () => {
                      this.contract();
                      console.log(this.state.text);
                    });
                    this.textInput.blur();
                  }}
                >
                  <Text style={styles.acButtonText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </Animated.View>
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
  suggestionsContainer: {
    paddingTop: 5
  },
  acButton: {
    padding: 10,
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: "#e8e8e8",
    alignItems: "stretch"
  },
  acButtonText: {
    fontSize: 18
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
