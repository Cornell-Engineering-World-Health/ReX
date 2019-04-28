import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import Database from "../Database";
import SearchInput, { createFilter } from "react-native-search-filter";
import { LinearGradient } from "expo";
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";
import {
  getSource,
  IMAGES,
  BODY_PARTS,
  getColor,
  COLOR,
  MENU_HEIGHT
} from "../resources/constants";
const KEYS_TO_FILTERS = ["event_type_name", "event_type_category"];

let height = Dimensions.get("window").height;
let gradient_ratio = 0.7;

let gradient_frombottom = (height - MENU_HEIGHT) * gradient_ratio;

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
        <LinearGradient
          colors={COLOR.gradient}
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: gradient_frombottom
            },
            styles.darkShadow
          ]}
          start={[0, 1]}
          end={[1, 0]}
        />
        <View style={styles.backWrapper}>
          <NavigationHeader
            onPressBack={() => {
              this.props.navigation.goBack();
            }}
            title={"Pick a symptom"}
            textStyle={{ color: "white" }}
            imageStyle={{
              tintColor: "white"
            }}
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
        <View style={{ flex: 0.7 }}>
          <ScrollView>
            <View style={styles.log_container}>
              {filteredSymptoms.map((prop, key) => {
                if (filteredSymptoms[key].event_id != 4) {
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.log_button,
                        styles.lightShadow,
                        { backgroundColor: getColor(prop.event_type_name) }
                      ]}
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
        </View>
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
    flexWrap: "wrap"
  },
  scrollView: { flex: 1 },
  log_button: {
    width: 110,
    height: 110,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 5
  },
  log_button_text: {
    color: "#161616",
    fontSize: 15,
    textAlign: "center"
  },
  log_button_img: {
    height: 60,
    width: 60,
    tintColor: "#161616"
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
    paddingRight: 25,
    paddingLeft: 25,
    flex: 0.15,
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  backWrapper: {
    flex: 0.15,
    justifyContent: "flex-end"
  },
  lightShadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#808080",
    shadowOpacity: 0.2
  },
  darkShadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#808080",
    shadowOpacity: 0.3
  }
});
