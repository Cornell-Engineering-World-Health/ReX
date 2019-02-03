import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Database from "../Database";
import SearchInput, { createFilter } from "react-native-search-filter";
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";
import { getSource, IMAGES, BODY_PARTS } from "../resources/constants";
const KEYS_TO_FILTERS = ["event_type_name", "event_type_category"];

export default class ChooseLogScreen extends React.Component {
  constructor(props) {
    super(props);

    types_events_array = [];
    images_array = [];

    Database.transaction(
      tx =>
        tx.executeSql("SELECT * FROM event_type_tbl", [], (tx, { rows }) => {
          json_rows = rows._array;
          let j = 0;
          for (let i = 0; i < json_rows.length; i++) {
            let category = json_rows[i].event_type_category;
            let bodyLabel = this.props.navigation.state.params.bodyLabel;

            if (category == bodyLabel || bodyLabel == BODY_PARTS.ALL) {
              types_events_array[j] = {
                event_type_name: json_rows[i].event_type_name,
                event_type_category: json_rows[i].event_type_category,
                event_id: json_rows[i].event_type_id
              };
              j++;
            }
          }
          this.setState({
            type_and_events: types_events_array
          });
        }),
      err => console.log(err)
    );

    this.state = {
      navigate: this.props.navigation,
      bodyLabel: this.props.navigation.state.params.bodyLabel,
      types_and_events: types_events_array,
      searchTerm: ""
    };
  }

  onSubmit(value) {}

  returnToCal() {}

  render() {
    const { navigate } = this.props.navigation;

    const filteredSymptoms = this.state.types_and_events.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    return (
      <ImageBackground style={styles.container}>
        <View style={styles.backWrapper}>
          <NavigationHeader
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
            title={"Pick a symptom"}
          />
        </View>
        <View style={styles.searchWrapper}>
          <SearchInput
            onChangeText={term => {
              this.setState({ searchTerm: term });
            }}
            style={[styles.searchInput, styles.darkShadow]}
            placeholder="Search"
            autoCorrect={false}
            returnKeyType={"search"}
            icon={{
              color: "#3B6693",
              style: styles.searchIcon,
              name: "search"
            }}
            inputViewStyles={{
              justifyContent: "center",
              flex: 1
            }}
            fuzzy={true}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.log_container}>
            {filteredSymptoms.map((prop, key) => {
              if (filteredSymptoms[key].event_id != 4) {
                return (
                  <TouchableOpacity
                    key={key}
                    style={styles.log_button}
                    onPress={() => {
                      navigate("Form", {
                        log_name: filteredSymptoms[key].event_type_name,
                        onLog: this.returnToCal.bind(this),
                        log_type: filteredSymptoms[key].event_id
                      });
                    }}
                  >
                    <Text style={styles.log_button_text}>
                      {prop.event_type_name}
                    </Text>
                    <Image
                      style={styles.log_button_img}
                      source={getSource(prop.event_type_name)}
                    />
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  },
  log_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  scrollView: {
    flex: 0.7
  },
  log_button: {
    margin: 10,
    alignItems: "bottom",
    width: 150,
    height: 150,
    alignItems: "center",
    backgroundColor: "#bf5252",
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#bf5252"
  },
  log_button_text: {
    color: "white",
    fontSize: 15
  },
  log_button_img: {
    marginTop: 15,
    height: 75,
    width: 75,
    tintColor: "white"
  },
  searchInput: {
    padding: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    borderWidth: 0,
    backgroundColor: "white",
    fontWeight: "200",
    color: "black"
  },
  searchWrapper: {
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 25,
    paddingLeft: 25,
    flex: 0.15,
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "row"
  },
  backWrapper: {
    flex: 0.15,
    paddingTop: 25
  },
  lightShadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#808080",
    shadowOpacity: 0.2
  },
  darkShadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#808080",
    shadowOpacity: 0.3
  }
});
