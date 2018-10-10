import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Header,
  ScrollView,
  TouchableOpacity,
  DatePickerIOS,
  Picker,
  Button
} from 'react-native'
import ScaleSlideInputType from '../LogInputTypes/ScaleSlideInputType'
import TextInputType from '../LogInputTypes/TextInputType'
import PickerInputType from '../LogInputTypes/PickerInputType'
import NumericalPickerInputType from '../LogInputTypes/NumericalPickerInputType'
import ChecklistInputType from '../LogInputTypes/ChecklistInputType'
import DatePicker from '../LogInputTypes/DatePicker'
import TimePicker from '../LogInputTypes/TimePicker'
import { StackNavigator } from 'react-navigation'
import Database from '../../Database'
import {asyncCreateMedicineEvents} from '../../databaseUtil/databaseUtil'
import moment from 'moment'
import survey from '../../survey/questions.json'

mapTypeToComponent = {
  scale: "ScaleSlideInputType",
  checklist: "ChecklistInputType",
  numerical: "NumericalPickerInputType",
  text: "TextInputType",
  date: "DatePicker",
  time: "TimeCategoryInputType"
}
mapTypeToInitVal = {
  scale: 0,
  checklist: [],
  numerical: 0,
  text: "",
  date: new Date(),
  time: new Date(),
}
event_id_count = 600
event_details_id_count = 600
keyStart = 200

export default class SurveyScreen extends React.Component {
  constructor (props) {
    super(props)
    let keysArray = survey["Questions"].map((q) => q["QuestionType"])
    let titles = survey["Questions"].map((q) => q["Title"])
    let inputTypes = keysArray.map((t) => mapTypeToComponent[t])
    let valOptions = {};
    survey["Questions"].forEach((q, i) => {
      if(q["Values"]) {valOptions[q["Title"]] = q["Values"]}}
    )
    let valArray = survey["Questions"].map((q) => {
      if(q["QuestionType"] == "scale" && q["Values"]){
        return Math.floor((q["Values"].length-1) / 2)
      } else if(q["QuestionType"] == "checklist" && q["Values"]){
          return q["Values"].map(e => false)
      }
      else{
        return mapTypeToInitVal[q["QuestionType"]]
      }
    })
    let submit_vals = {};
    survey["Questions"].forEach((q, i) => {
      if(q["QuestionType"] == "scale" && q["Values"]){
        submit_vals[q["Title"]] =
          q["Values"][Math.floor((q["Values"].length-1) / 2)]
      } else if(q["QuestionType"] == "checklist" && q["Values"]){
        let submit_map = {}
        q["Values"].forEach(e => {
          submit_map[e] = false
        })
        submit_vals[q["Title"]] =submit_map
      } else {
        submit_vals[q["Title"]] = valArray[i]
      }
    })

    this.state = {
      input_type_array: inputTypes, //types compoment - NumericalPickerInputType
      value_labels: titles, //my type labels - question
      values: valArray, //current value - 0
      submit_vals: submit_vals, //pairs of question: value {q: a}
      valOptions: valOptions, //for questions with params, gives bounds
      surveyId: survey["SurveyName"]//survey name
    }
  }

  valueChange (label, value) {
      console.log(this.state.submit_vals)
    this.state.submit_vals[label] = value
  }

  submit () {
    if (this.state.nav) {
      // Log new symptoms
      this.props.navigation.state.params.onLog()
      this.props.navigation.pop()
      let event_type_id = this.state.event_type_id
      let values = JSON.stringify(this.state.submit_vals)
      let timestamp = moment().format('YYYY-MM-DD HH:mm:00')

      // console.log(timestamp)

      Database.transaction(
        tx => {
          tx.executeSql(
            'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (?, ?)',
            [event_details_id_count, values]
          )
          tx.executeSql(
            'INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (?, ?, ?, ?)',
            [event_id_count, event_type_id, timestamp, event_details_id_count]
          )
        },
        err => console.log(err)
      )

      event_id_count++
      event_details_id_count++
    } else {
      this.props.on_finish()
      if (this.props.timestamp) {
        // Edit symptom log
        console.log('edit symptom log')
      } else {
        // Add new medication
        asyncCreateMedicineEvents(this.state.submit_vals['Pill Name'], this.state.submit_vals['Dosage'], new Date(this.state.submit_vals['Start Date']),
        new Date(this.state.submit_vals['End Date']), this.state.submit_vals['Time'], this.state.submit_vals['Time Category'], event_id_count, event_details_id_count)
      }
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.main_container}>
          {this.state.input_type_array.map((prop, key) => {
            if (prop == 'ScaleSlideInputType') {
              let numOfOptions = (this.state.valOptions[this.state.value_labels[key]]) ?
              (this.state.valOptions[this.state.value_labels[key]]).length : 1;
              return (
                <ScaleSlideInputType
                  key={key}
                  input_style={styles.input_container_blue}
                  title_text_style={styles.title_text}
                  max_val={numOfOptions - 1}
                  value={this.state.values[key]}
                  scale_labels={this.state.valOptions[this.state.value_labels[key]] || []}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  valueChange={(label, value) => {
                    this.valueChange(label,
                       this.state.valOptions[this.state.value_labels[key]][value])
                     }
                  }
                />
              )
            } else if (prop == 'NumericalPickerInputType') {
              return (
                <NumericalPickerInputType
                  key={key}
                  input_style={styles.input_container_blue}
                  title_text_style={styles.title_text}
                  value={this.state.values[key]}
                  min={0}
                  max={100}
                  inc_scale={1}
                  unit={''}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)}
                />
              )
            } else if (prop == 'TextInputType') {
              return (
                <TextInputType
                  key={key}
                  input_style={styles.input_container_green}
                  title_text_style={styles.title_text}
                  text={this.state.values[key]}
                  placeholder_text={'Type here...'}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)}
                />
              )
            } else if (prop == 'DatePicker') {
              return (
                <DatePicker
                  key={key}
                  input_style={styles.input_container_transparent_green}
                  title_text_style={styles.title_text_green}
                  value={this.state.values[key]}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  valueChange={this.valueChange.bind(this)}
                />
              )
            } else if (prop == 'ChecklistInputType') {
              return (
                <ChecklistInputType
                  key={key}
                  list_values={this.state.valOptions[this.state.value_labels[key]]}
                  input_style={styles.input_container_green}
                  title_text_style={styles.title_text}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  value={this.state.values[key]}
                  valueChange={this.valueChange.bind(this)}
                />
              )
            }
          })}
          <TouchableOpacity
            style={styles.submit_button}
            onPress={this.submit.bind(this)}
          >
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
