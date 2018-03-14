import React from 'react'
import PainForm from './components/screens/PainForm'
import FlatListCard from './components/screens/FlatListCard'
import MenuBar from './components/MenuBar/MenuBar'
import { StackNavigator } from 'react-navigation'
import { View, NavigatorIOS, StatusBar } from 'react-native'
import Database from './Database'

class main extends React.Component {
  constructor (props) {
    super(props)
    createTables()
    intializeDatabase()
  }

  componentDidMount () {

  }
  render () {
    return <MenuBar />
  }
}

createTables = function () {
  console.log('creating tables')
  Database.transaction(tx => {
    tx.executeSql(
             'CREATE TABLE IF NOT EXISTS `event_details_tbl` (`event_details_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `fields` TEXT NOT NULL);'
          )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS `field_to_view_tbl` (`field_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `field_name` TEXT NOT NULL UNIQUE, `view_name` TEXT NOT NULL);'
          )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS `event_type_tbl` (`event_type_id` INTEGER NOT NULL PRIMARY KEY UNIQUE,`event_type_name` TEXT NOT NULL UNIQUE, `event_type_icon` TEXT NOT NULL, `card_field_id1` INTEGER, `card_field_id2` INTEGER,FOREIGN KEY(card_field_id1) REFERENCES `field_to_view_tbl`(`field_id`), FOREIGN KEY(`card_field_id2`) REFERENCES `field_to_view_tbl` (`field_id`));'
            )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS `event_tbl` (`event_id` INTEGER NOT NULL PRIMARY KEY,`event_type_id` INTEGER NOT NULL, `timestamp` TEXT NOT NULL, `event_details_id` INTEGER NOT NULL UNIQUE, FOREIGN KEY(`event_details_id`) REFERENCES `event_details_tbl`(`event_details_id`), FOREIGN KEY(`event_type_id`) REFERENCES `event_type_tbl`(`event_type_id`));'
          )
          /* tx.executeSql(
           'CREATE TABLE IF NOT EXISTS view_to_component_tbl ( view_id INTEGER NOT NULL PRIMARY KEY UNIQUE, view_name TEXT NOT NULL UNIQUE, component` TEXT NOT NULL)'
          ); */
  }, err => console.log(err), () => console.log('done!!!'))
}
intializeDatabase = function () {
  console.log('intializing database')
  Database.transaction(tx => {
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2) values (1, \'headache\', \'image.png\', \'Intensity\',\'Duration\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (2, \'Dizziness\', \'image.png\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (1, \'Intensity\', \'ScaleSlideInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (2, \'Duration\', \'NumericalPickerInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (3, \'Other\', \'TextInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1,\'{"Intensity": "Medium","Duration": "40"}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (2,\'{"Duration": "40","Intensity": "Medium","Other": "NONE"}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (1, 1,\'1950-01-01 00:00:00\', 1)')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (2, 2,\'1950-01-01 00:00:00\', 2)')
  }, err => console.log(err),() => console.log('intitialization complete'))

  Database.transaction(tx => {
    tx.executeSql('Select * from event_tbl;', [], (tx, {rows}) => console.log(JSON.stringify(rows)))
  }, err => console.log(err))
  //console.log(Database)
}

export default main
