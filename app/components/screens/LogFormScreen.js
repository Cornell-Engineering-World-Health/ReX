import React from 'react'
import {StyleSheet, Text, View, Image, Header, ScrollView, TouchableOpacity, DatePickerIOS, Picker, Button} from 'react-native'
import ScaleSlideInputType from '../LogInputTypes/ScaleSlideInputType'
import TextInputType from '../LogInputTypes/TextInputType'
import PickerInputType from '../LogInputTypes/PickerInputType'
import NumericalPickerInputType from '../LogInputTypes/NumericalPickerInputType'
import ChecklistInputType from '../LogInputTypes/ChecklistInputType'
import DatePicker from '../LogInputTypes/DatePicker'
import TimePicker from '../LogInputTypes/TimePicker'
import { StackNavigator } from 'react-navigation'
import Database from '../../Database'
import moment from 'moment'

event_id_count = 100
event_details_id_count = 100

export default class ChooseLogScreen extends React.Component {

  constructor (props) {
    super(props)
    var log_type = 0
    var nav = true
    if (this.props.log_type) {
      log_type = this.props.log_type
      nav = false
    } else {
      log_type = this.props.navigation.state.params.log_type
    }
    console.log('log type----')
    console.log(log_type)
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

              // console.log(keysArray[i])

              Database.transaction(tx => (tx.executeSql('SELECT view_name FROM field_to_view_tbl \
                    WHERE field_name = ?;', [keysArray[i]], (tx, { rows }) => {
                      input_types[i] = rows._array[0].view_name
                      console.log(input_types[i])
                      this.setState({
                        input_type_array: input_types,
                        value_labels: keysArray,
                        values: valArray,
                        submit_vals: json_rows,
                        event_type_id: log_type
                      })
                    })), err => console.log(err))
            }
          })), err => console.log(err))

    var input_types = []

    this.state = {
      input_type_array: input_types,
      nav: nav
    }
  }

  valueChange (label, value) {
    this.state.submit_vals[label] = value
  }

  submit () {
    if (this.state.nav) {
      console.log('HEHHHLSHGKEHGLWKEHGLWKGHLWEKHGLWEKHGLEWKHGWLEKGHWLEKGH')
      this.props.navigation.state.params.onLog()
      this.props.navigation.pop()
      let event_type_id = this.state.event_type_id
      let values = JSON.stringify(this.state.submit_vals)
      let timestamp = moment().format('YYYY-MM-DD HH:mm:ss')

      console.log(values)

      Database.transaction(tx => {
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (?, ?)', [event_details_id_count, values])
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (?, ?, ?, ?)', [event_id_count, event_type_id, timestamp, event_details_id_count])
      }, err => console.log(err))

      event_id_count++
      event_details_id_count++
    } else {
      this.props.on_finish()
    }
  }

  render () {
    var SCALE_LABELS = ['None', 'A Little', 'Medium', 'A Lot', 'Horrible']
    var MEDICATION_SCALE_LABELS = ['Morning', 'Afternoon', 'Evening']
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
                  value={parseInt(this.state.values[key])}
                  scale_labels={SCALE_LABELS}
                  title_text={this.state.value_labels[key]}
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
                  inc_scale={1}
                  unit={'minutes'}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)} />)
            } else if (prop == 'DosagePickerInputType') {
              return (
                <NumericalPickerInputType
                  key={key}
                  input_style={styles.input_container_blue}
                  title_text_style={styles.title_text}
                  value={this.state.values[key]}
                  min={0}
                  max={40}
                  inc_scale={10}
                  unit={'mg'}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)} />)
            } else if (prop == 'TextInputType') {
              return (
                <TextInputType
                  key={key}
                  input_style={styles.input_container_green}
                  title_text_style={styles.title_text}
                  placeholder_text={'Type here...'}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)} />)
            } else if (prop == 'DatePicker') {
              return (
                <DatePicker
                  key={key}
                  input_style={styles.input_container_transparent_green}
                  title_text_style={styles.title_text_green}
                  value={this.state.values[key]}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)} />)
            } else if (prop == 'DayChooserInputType') {
              return (
                <ChecklistInputType
                  key={key}
                  list_values={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}
                  input_style={styles.input_container_green}
                  title_text_style={styles.title_text}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  value={this.state.values[key]}
                  valueChange={this.valueChange.bind(this)} />)
            } else if (prop == 'TimeCategoryInputType') {
              return (
                <View
                  key={key}>
                  {this.state.values[key].map((prop, timeKey) => {
                    return (
                      <TimePicker
                        key={timeKey}
                        input_style={styles.input_container_transparent_blue}
                        title_text_style={styles.title_text_blue}
                        value={this.state.values[key][timeKey]}
                        title_text={'Reminder Time ' + (timeKey + 1)}
                        val_label={this.state.value_labels[key]}
                        chosen_date={this.state.values[key][timeKey]}
                        valueChange={(label, val) => {
                          this.state.values[key][timeKey] = val
                          this.valueChange(this.state.value_labels[key], this.state.values[key])
                        }} />)
                  })}
                  <TouchableOpacity
                    style={styles.add_button}
                    onPress={() => {
                      this.state.values[key].push(moment().format('HH:mm'))
                      this.setState({
                        values: this.state.values
                      })
                    }}>
                    <Text style={styles.submit_text}>Add Another Time</Text>
                  </TouchableOpacity>
                </View>)
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
  title_text_green: {
    fontSize: 20,
    color: '#2D8464',
    paddingBottom: 10
  },
  title_text_blue: {
    fontSize: 20,
    color: '#2D6D84',
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
  input_container_transparent_green: {
    width: 320,
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2D8464'
  },
  input_container_transparent_blue: {
    width: 320,
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2D6D84'
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
  add_button: {
    marginBottom: 20,
    alignItems: 'bottom',
    width: 320,
    alignItems: 'center',
    backgroundColor: '#bf5252',
    padding: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#bf5252'
  },
  submit_text: {
    color: 'white',
    fontSize: 25
  }
})
