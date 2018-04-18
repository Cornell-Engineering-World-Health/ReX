import React from 'react'
import {StyleSheet, Text, View, Image, Header, ScrollView, TouchableOpacity, Picker, Button} from 'react-native'
import ScaleSlideInputType from '../LogInputTypes/ScaleSlideInputType'
import TextInputType from '../LogInputTypes/TextInputType'
import PickerInputType from '../LogInputTypes/PickerInputType'
import NumericalPickerInputType from '../LogInputTypes/NumericalPickerInputType'
import ChecklistInputType from '../LogInputTypes/ChecklistInputType'
import LogFormScreen from './LogFormScreen'
import { StackNavigator } from 'react-navigation'
import Database from '../../Database'
import { getSource } from '../Resources/constants'

export default class ChooseLogScreen extends React.Component {






  createTables = function () {
    Database.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS `event_details_tbl` (`event_details_id` \
                    INTEGER NOT NULL PRIMARY KEY UNIQUE, `fields` TEXT NOT NULL);')
      tx.executeSql('CREATE TABLE IF NOT EXISTS `event_type_tbl` (`event_type_id` \
                    INTEGER NOT NULL PRIMARY KEY UNIQUE,`event_type_name` \
                    TEXT NOT NULL UNIQUE,`event_type_icon` TEXT NOT NULL);')
      tx.executeSql('CREATE TABLE IF NOT EXISTS `event_tbl` (`event_id` \
                    INTEGER NOT NULL PRIMARY KEY,`event_type_id` \
                    INTEGER NOT NULL, `timestamp` TEXT NOT NULL, `event_details_id` \
                    INTEGER NOT NULL UNIQUE, FOREIGN KEY(`event_details_id`) \
                    REFERENCES `event_details_tbl`(`event_details_id`), \
                    FOREIGN KEY(`event_type_id`) REFERENCES `event_type_tbl`(`event_type_id`));')
      tx.executeSql('CREATE TABLE IF NOT EXISTS `field_to_view_tbl` (`field_id` \
                    INTEGER NOT NULL PRIMARY KEY UNIQUE,`field_name` \
                    TEXT NOT NULL UNIQUE,`view_name` TEXT NOT NULL);')
    }, err => console.log(err))
  }
  intializeDatabase = function () {
    Database.transaction(tx => {
      tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (1, \'Headache\', \'image.png\')')
      tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (2, \'Dizziness\', \'image.png\')')
      tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (1, \'Intensity\', \'ScaleSlideInputType\')')
      tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (2, \'Duration\', \'NumericalPickerInputType\')')
      tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (3, \'Other\', \'TextInputType\')')
      tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1,\'{"Intensity": "Medium","Duration": "40"}\' )')
      tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (2,\'{"Duration": "40","Intensity": "Medium","Other": "NONE"}\' )')
      tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (1, 1,\'1950-01-01 00:00:00\', 1)')
      tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (2, 2,\'1950-01-01 00:00:00\', 2)')
    }, err => console.log(err))
  }

  constructor (props) {
    super(props)
    this.createTables()
    this.intializeDatabase()

    log_types_array = []
    event_ids_array = []
    images_array = []

    Database.transaction(tx => (tx.executeSql('SELECT * FROM event_type_tbl',[], (tx, { rows }) => {
      json_rows = rows._array
      for (let i = 0; i < json_rows.length; i++) {
        log_types_array[i] = json_rows[i].event_type_name
        event_ids_array[i] = json_rows[i].event_type_id
      }

      this.setState({
        log_types: log_types_array,
        event_ids: event_ids_array
      })
    })), err => console.log(err))

    this.state = {
      navigate: this.props.navigation,
      log_types: log_types_array,
      event_ids: event_ids_array
    }
  }

  onSubmit(value) {}

  returnToCal(){
  }

  render () {

    const { navigate } = this.props.navigation
    return (
      <ScrollView>
      <View style={styles.log_container}>
      {this.state.log_types.map((prop, key) => {
        return (
          <TouchableOpacity
            key = {key}
            style={styles.log_button}
            onPress={() => navigate('Form', { onLog: this.returnToCal.bind(this), log_type: this.state.event_ids[key] })}>
            <Text style={styles.log_button_text}>{prop}</Text>
            <Image
              style={styles.log_button_img}
              source={getSource(prop)} />
          </TouchableOpacity>)
      })}
        </View>
      </ScrollView>
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
