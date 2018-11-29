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
import { FileSystem } from 'expo';
import ScaleSlideInputType from '../LogInputTypes/ScaleSlideInputType'
import TextInputType from '../LogInputTypes/TextInputType'
import PickerInputType from '../LogInputTypes/PickerInputType'
import NumericalPickerInputType from '../LogInputTypes/NumericalPickerInputType'
import ChecklistInputType from '../LogInputTypes/ChecklistInputType'
import DatePicker from '../LogInputTypes/DatePicker'
import TimePicker from '../LogInputTypes/TimePicker'
import Database from '../../Database'
import {asyncCreateMedicineEvents} from '../../databaseUtil/databaseUtil'
import moment from 'moment'
import Form from '../LogInputTypes/Form'
import survey from '../../survey/questions.json'

const mapTypeToComponent = {
  scale: "ScaleSlideInputType",
  checklist: "ChecklistInputType",
  numerical: "NumericalPickerInputType",
  text: "TextInputType",
  date: "DatePicker",
  time: "TimeCategoryInputType"
}
const mapTypeToInitVal = {
  scale: 0,
  checklist: [],
  numerical: 0,
  text: "",
  date: new Date(),
  time: new Date(),
}

const SURVEY_DIR = FileSystem.documentDirectory + "test11"
const FILE_NAME = "survey.csv"

export default class SurveyForm extends React.Component {
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
      } else{
        return mapTypeToInitVal[q["QuestionType"]]
      }
    })
    let submit_vals = {};
    survey["Questions"].forEach((q, i) => {
      if(q["QuestionType"] == "scale" && q["Values"]){
        submit_vals[q["Title"]] = 'N/A'
      } else if(q["QuestionType"] == "checklist" && q["Values"]){
        let submit_map = {}
        q["Values"].forEach(e => {
          submit_map[e] = false
        })
        submit_vals[q["Title"]] =submit_map
      } else if(q["QuestionType"] == "date"){
        submit_vals[q["Title"]] =
         moment((new Date()).toLocaleDateString(), 'MM/DD/YYYY').format('YYYY-MM-DD')
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
    let new_state = this.state.submit_vals
    new_state[label] = value
    this.setState({submit_vals: new_state});
  }

  submit () {
    console.log(this.state.submit_vals)
    this.props.onSubmit();
    FileSystem.getInfoAsync(SURVEY_DIR, {}).then( e => {
        if(!e.exists || !e.isDirectory){
          console.log("making dir")
          return FileSystem.makeDirectoryAsync(SURVEY_DIR);
        }
      }
    ).then( e => {
      return FileSystem.getInfoAsync(SURVEY_DIR+"/"+FILE_NAME, {}).then( e => {
          if(e.exists && !e.isDirectory){
            console.log("append")
              return FileSystem.readAsStringAsync(SURVEY_DIR + "/" + FILE_NAME)
          } else {
            console.log("new!")
            return ""
          }
      })
    }).then((content) => {
      content += this.state_to_csv()
      console.log("writing")
      return FileSystem.writeAsStringAsync(SURVEY_DIR + "/" +FILE_NAME, content)
    }).then(() => {
      console.log("reading")
      return FileSystem.readAsStringAsync(SURVEY_DIR + "/" + FILE_NAME)
    }).then((content) => {
      console.log(content)
    }).catch(e => console.log(e))
  }

  state_to_csv () {
    let content = 'Survey Name,' +this.state.surveyId + '\n'
    let keys = Object.keys(this.state.submit_vals)
    keys.forEach((k) => {
      if(this.state.submit_vals[k] instanceof Object &&
        !(this.state.submit_vals[k] instanceof Date)){
          let checklist_key = Object.keys(this.state.submit_vals[k])
          content += k
          checklist_key.forEach((opt) => {
            if(this.state.submit_vals[k][opt]){
              content += ',' + opt
            }
          })
          content += '\n'
        } else {
          content += k + ',' + this.state.submit_vals[k] + '\n'
        }
    })
    return content
  }

  render () {
      let component_array = this.state.input_type_array.map((prop, key) => {
            if (prop == 'ScaleSlideInputType') {
              let numOfOptions = (this.state.valOptions[this.state.value_labels[key]]) ?
              (this.state.valOptions[this.state.value_labels[key]]).length : 1;
              return (
                <ScaleSlideInputType
                  key={key}
                  isSlider={false}
                  question={this.state.value_labels[key]}
                  input_style={styles.input_container_blue}
                  title_text_style={styles.title_text}
                  max_val={numOfOptions - 1}
                  value={this.state.values[key]}
                  scale_labels={this.state.valOptions[this.state.value_labels[key]] || []}
                  title_text={this.state.value_labels[key]}
                  val_label={this.state.value_labels[key]}
                  valueChange={(label, value) => {
                    this._form.valueChange(label, value);
                  }}
                  label_left={'Fully Disagree'}
                  label_right={'Fully Agree'}
                  onStart={() => {this._form.disable_swipe()}}
                  onComplete={() => {this._form.enable_swipe()}}
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
          })

          return (
            <Form
              ref={ f => {
                this._form = f;
              }}
              data={component_array}
              valueChange={this.valueChange.bind(this)}
              submit={this.submit.bind(this)}
              isModal={true}
            >
            </Form>
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
