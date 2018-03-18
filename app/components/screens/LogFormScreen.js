import React from 'react'
import {StyleSheet, Text, View, Image, Header, ScrollView, TouchableOpacity, Picker, Button} from 'react-native'
import ScaleSlideInputType from '../LogInputTypes/ScaleSlideInputType'
import TextInputType from '../LogInputTypes/TextInputType'
import PickerInputType from '../LogInputTypes/PickerInputType'
import NumericalPickerInputType from '../LogInputTypes/NumericalPickerInputType'
import ChecklistInputType from '../LogInputTypes/ChecklistInputType'
import { StackNavigator } from 'react-navigation'
import Database from './Database'
import Moment from 'moment'

event_id_count = 100
event_details_id_count = 100

export default class ChooseLogScreen extends React.Component {

  constructor (props) {
    super(props)
    let log_type = this.props.navigation.state.params.log_type
    var keysArray = []

    Database.transaction(tx => (tx.executeSql('SELECT fields FROM event_tbl \
          INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
          WHERE timestamp = \'1950-01-01 00:00:00\' \
          AND event_type_id = ?;', [log_type], (tx, { rows }) => {
            json_rows = JSON.parse(rows._array[0].fields)
            keysArray = Object.keys(json_rows)

            var valArray = []

            for (let i = 0; i < keysArray.length; i++) {
              var input_types = []
              valArray[i] = json_rows[keysArray[i]]

              Database.transaction(tx => (tx.executeSql('SELECT view_name FROM field_to_view_tbl \
                    WHERE field_name = ?;', [keysArray[i]], (tx, { rows }) => {
                      input_types[i] = rows._array[0].view_name
                      this.setState({
                        input_type_array: input_types,
                        value_labels: keysArray,
                        values: valArray,
                        submit_vals: {},
                        event_type_id: log_type
                      })
                    })), err => console.log(err))
            }
          })), err => console.log(err))

    var input_types = []

    this.state = {
      input_type_array: input_types
    }
  }

  valueChange (label, value) {
    this.state.submit_vals[label] = value
  }

  submit () {
    let event_type_id = this.state.event_type_id
    let values = JSON.stringify(this.state.submit_vals)
    let timestamp = Moment().format('YYYY-MM-DD HH:mm:ss')

    Database.transaction(tx => {
      tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (?, ?)', [event_details_id_count, values])
      tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (?, ?, ?, ?)', [event_id_count, event_type_id, timestamp, event_details_id_count])
    }, err => console.log(err), () => console.log('added'))

    event_id_count++
    event_details_id_count++

    this.props.navigation.state.params.onLog()
    this.props.navigation.pop()
  }

  render () {
    var SCALE_LABELS = ['None', 'A Little', 'Medium', 'A Lot', 'Horrible']
    return (
      <ScrollView>
        <View style={styles.main_container}>
          {this.state.input_type_array.map((prop, key) => {
            if (prop == 'ScaleSlideInputType') {
              return (
                <ScaleSlideInputType
                  key={key}
                  input_style={styles.input_container_blue}
                  title_text_style={styles.title_text}
                  max_val={4}
                  value={SCALE_LABELS.indexOf(this.state.values[key])}
                  scale_labels={SCALE_LABELS}
                  title_text={'Intensity'}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)} />)
            } else if (prop == 'NumericalPickerInputType') {
              return (
                <NumericalPickerInputType
                  key={key}
                  input_style={styles.input_container_blue}
                  title_text_style={styles.title_text}
                  value={this.state.values[key]}
                  min={0}
                  max={60}
                  unit={'minutes'}
                  title_text={'Duration of Pain'}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)} />)
            } else if (prop == 'TextInputType') {
              return (
                <TextInputType
                  key={key}
                  input_style={styles.input_container_green}
                  title_text_style={styles.title_text}
                  placeholder_text={'Type here...'}
                  title_text={'Other Symptoms'}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)} />)
            }
          })}
          {  /*    <ChecklistInputType
            list_values={['Light sensitivity', 'Sound sensitivity', 'Nausea', 'Pulsatile tinnitus', 'Scalp pain (allodynia)', 'Back pain', 'Neck pain']}
            input_style={styles.input_container_green}
            title_text_style={styles.title_text}
            title_text={'Associated Symptoms'} />
          <PickerInputType
            input_style={styles.input_container_green}
            title_text_style={styles.title_text}
            value={'Sharp'}
            picker_values={['Pressure-like', 'Sharp', 'Throbbing']}
            title_text={'Type of Headache'} />
          <ScaleSlideInputType
            input_style={styles.input_container_blue}
            title_text_style={styles.title_text}
            max_val={4}
            value={2}
            scale_labels={['None', 'A Little', 'Medium', 'A Lot', 'Horrible']}
            title_text={'Intensity'} />
          <PickerInputType
            input_style={styles.input_container_green}
            title_text_style={styles.title_text}
            value={'Top of Head'}
            picker_values={['Back of Head', 'Top of Head', 'Forehead']}
            title_text={'Location of Pain'} />
          <PickerInputType
            input_style={styles.input_container_blue}
            title_text_style={styles.title_text}
            value={'Naproxen'}
            picker_values={['Tylenol', 'Ibuprofen', 'Naproxen', 'Excedrin', 'Fioricet']}
            title_text={'Medication Needed'} />
          <TextInputType
            input_style={styles.input_container_green}
            title_text_style={styles.title_text}
            placeholder_text={'Type here...'}
            title_text={'Other Symptoms'} />
          <NumericalPickerInputType
            input_style={styles.input_container_blue}
            title_text_style={styles.title_text}
            value={3}
            min={0}
            max={6}
            unit={'hours'}
            title_text={'Duration of Pain'} />
          <TouchableOpacity style={styles.submit_button}>
            <Text style={styles.submit_text}>Submit</Text>
          </TouchableOpacity> */ }
          <TouchableOpacity
            style={styles.submit_button}
            onPress={this.submit.bind(this)}>
            <Text style={styles.submit_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title_text: {
    fontSize: 20,
    color: '#e5e5e5',
    paddingBottom: 10
  },
  input_container_blue: {
    width: 320,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#2D6D84',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2D6D84'
  },
  input_container_green: {
    width: 320,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#2D8464',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2D8464'
  },
  submit_button: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'bottom',
    width: 320,
    alignItems: 'center',
    backgroundColor: '#bf5252',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#bf5252'
  },
  submit_text: {
    color: 'white',
    fontSize: 25
  }
})
