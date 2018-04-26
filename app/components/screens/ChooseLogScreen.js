import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Header,
  ScrollView,
  TouchableOpacity,
  Picker,
  Button,
  ImageBackground
} from 'react-native';
import ScaleSlideInputType from '../LogInputTypes/ScaleSlideInputType';
import TextInputType from '../LogInputTypes/TextInputType';
import PickerInputType from '../LogInputTypes/PickerInputType';
import NumericalPickerInputType from '../LogInputTypes/NumericalPickerInputType';
import ChecklistInputType from '../LogInputTypes/ChecklistInputType';
import LogFormScreen from './LogFormScreen';
import { StackNavigator } from 'react-navigation';
import Database from '../../Database';
import { getSource, IMAGES } from '../Resources/constants';

export default class ChooseLogScreen extends React.Component {
  constructor(props) {
    super(props);

    log_types_array = [];
    event_ids_array = [];
    images_array = [];

    Database.transaction(
      tx =>
        tx.executeSql('SELECT * FROM event_type_tbl', [], (tx, { rows }) => {
          json_rows = rows._array;
          for (let i = 0; i < json_rows.length; i++) {
            log_types_array[i] = json_rows[i].event_type_name;
            event_ids_array[i] = json_rows[i].event_type_id;
          }

          this.setState({
            log_types: log_types_array,
            event_ids: event_ids_array
          });
        }),
      err => console.log(err)
    );

    this.state = {
      navigate: this.props.navigation,
      log_types: log_types_array,
      event_ids: event_ids_array
    };
  }

  onSubmit(value) {}

  returnToCal() {}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.log_container}>
            {this.state.log_types.map((prop, key) => {
              if (this.state.event_ids[key] != 4) {
                return (
                  <TouchableOpacity
                    key={key}
                    style={styles.log_button}
                    onPress={() =>
                      navigate('Form', {
                        onLog: this.returnToCal.bind(this),
                        log_type: this.state.event_ids[key]
                      })
                    }
                  >
                    <Text style={styles.log_button_text}>{prop}</Text>
                    <Image
                      style={styles.log_button_img}
                      source={getSource(prop)}
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
  log_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 50
  },
  log_button: {
    margin: 10,
    alignItems: 'bottom',
    width: 150,
    height: 150,
    alignItems: 'center',
    backgroundColor: '#bf5252',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#bf5252'
  },
  log_button_text: {
    color: 'white',
    fontSize: 15
  },
  log_button_img: {
    marginTop: 15,
    height: 75,
    width: 75,
    tintColor: 'white'
  }
});
