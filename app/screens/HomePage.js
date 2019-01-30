import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { profile_icons } from '../resources/constants';
import {IMAGES, COLOR} from '../resources/constants';
import { HomeMedicineLogger } from '../components/HomeMedicineLogger';
import {
  pullMedicineFromDatabase,
  pullSettingsFromDatabase,
  databaseTakeMedicine,
  databaseTakeMedicines,
  pullAllSymptoms,
  pullAllMedicineData
} from '../databaseUtil/databaseUtil';
import Moment from 'moment'
const MEDICINE_BUTTON_BACKGROUND_COLOR = '#ff99ff';
const POSITIVE_MESSAGE_TIME_DIFF = 4.32 * Math.pow(10, 8); //3 days
const ENCOURAGEMENT_TEXT = [
  "Keep logging!",
  "Keep it going!",
  "You're doing great."
]
import styles from './styles';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: null,
      data: [],
      totalAmount: [0, 0, 0, 0],
      doneAmount: [0, 0, 0, 0],
      originalDoneAmount: [0,0,0,0],
      name: "Navin",
      iconDropDown: IMAGES.afternoonColorW,
      backgroundColorDropDown: COLOR.cyan,
      message: 'No symptoms are currently logged.'
    };
    this.generatePositiveMessage()
    //TODO: make one function that only pulls name from database
    pullSettingsFromDatabase((data) => {
        this.setState({
            name: data.name,
            icon: data.icon
        })
    })
    this.didRevert = [false, false, false, false]
  }

  componentDidMount() {
    let totalAmount = this.state.totalAmount;
    let doneAmount = this.state.doneAmount;
    let thisRef = this;

    let extractInfo = (data, medName, idx) => {
      return {
        name: medName,
        dosage: data[medName].dosage,
        time: data[medName].time[idx],
        idx: idx
      }
    }

    pullMedicineFromDatabase(new Date(), function(formattedData){
      console.log(formattedData)
      let notTakenMeds = {
        morning: [],
        afternoon: [],
        evening: [],
        night: []
      }
      Object.keys(formattedData).forEach(function(med){
        let i = 0;
        formattedData[med].timeCategory.forEach(function(time) {
          switch (time) {
            case 'Morning':
              totalAmount[0]++;
              if (formattedData[med].taken[i]) {
                doneAmount[0]++;
              } else {
                notTakenMeds.morning.push(extractInfo(formattedData, med, i))
              }
              break;
            case 'Afternoon':
              totalAmount[1]++;
              if (formattedData[med].taken[i]) {
                doneAmount[1]++;
              } else {
                notTakenMeds.afternoon.push(extractInfo(formattedData, med, i))
              }
              break;
            case 'Evening':
              totalAmount[2]++;
              if (formattedData[med].taken[i]) {
                doneAmount[2]++;
              } else {
                notTakenMeds.evening.push(extractInfo(formattedData, med, i))
              }
              break;
            case 'Night':
              totalAmount[3]++;
              if (formattedData[med].taken[i]) {
                doneAmount[3]++;
              } else {
                notTakenMeds.night.push(extractInfo(formattedData, med, i))
              }
              break;
            default:
          }
          i++;
        })
      })

      thisRef.setState({
        totalAmount: totalAmount,
        doneAmount: doneAmount,
        originalDoneAmount: doneAmount.slice(), //copy by value, not reference
        data: formattedData,
        notTakenMeds: notTakenMeds
      })
    });
  }

  generateSymptomMessage(callback){
    let that = this
    pullAllSymptoms((logged_symptoms) => {
      if(logged_symptoms.length == 0){
        if(callback) callback()
        return
      }

      let avoid_log_types_set = {}
      logged_symptoms.forEach((s) => {
        if(Moment() - Moment(s["timestamp"]) < POSITIVE_MESSAGE_TIME_DIFF){ //symptoms is recent
          avoid_log_types_set[""+s["event_type_name"]] = true
        }
      })

      let most_recent_log_per_type = {}
      logged_symptoms.forEach((s) => {
        if(avoid_log_types_set[s["event_type_name"]] == undefined){ //avoid recent log types
          most_recent_log_per_type[""+s["event_type_name"]] = s["timestamp"]
        }
      })

      if(Object.keys(most_recent_log_per_type) == 0){//Failed to find
        if(callback) callback()
      } else {
        let keys = Object.keys(most_recent_log_per_type)
        let choice = Math.floor(Math.random() * keys.length)
        let chosen_symptom_time = most_recent_log_per_type[keys[choice]]
        that.setState({message:
          ENCOURAGEMENT_TEXT[Math.floor(Math.random() * ENCOURAGEMENT_TEXT.length)] +
          "\n"+
          "Your last occurance of " +
          keys[choice].toLowerCase() +
          " was\n" +
          Moment(chosen_symptom_time).fromNow() +
          "!"
        })
      }
    })
  }

  generateMedicationMessage(callback){
    let that = this
    pullAllMedicineData((medication_reminders) => {
      if(medication_reminders.length == 0){
        if(callback) callback()
        return
      }

      let most_recent_missed_t = medication_reminders[0]["timestamp"]
      medication_reminders.forEach((med) => {
        let fields = JSON.parse(med.fields);
        let contains_false = false
        fields['Taken'].forEach((didTake) => {
          if(didTake == false) contains_false = true
        })
        if(contains_false && (Moment() - Moment(med["timestamp"]) > 0)){//in the past
          most_recent_missed_t = med["timestamp"]
        }
      })

      if(Moment() - Moment(most_recent_missed_t) < POSITIVE_MESSAGE_TIME_DIFF){//Failed
        if(callback) callback()
        return
      } else {
        let time_diff_str = Moment(most_recent_missed_t).fromNow()
        if(time_diff_str.indexOf('ago') == -1){
          if(callback) callback()
          return
        }
        time_diff_str = time_diff_str.substring(0, time_diff_str.length-4)
        that.setState({message:
          ENCOURAGEMENT_TEXT[Math.floor(Math.random() * ENCOURAGEMENT_TEXT.length)] +
          "\n"+
          "You have not missed any medications in\n" +
          time_diff_str+
          "!"
        })
      }
    })
  }

  generatePositiveMessage(){
    let symptom_or_medicine = Math.random() < .5
    if(symptom_or_medicine){
      this.generateSymptomMessage(() => this.generateMedicationMessage())
    } else {
      this.generateMedicationMessage(() => this.generateSymptomMessage())
    }
  }

  writeAllInTimeCategory(notTakenMeds, time, takenVal){
      notTakenMeds[time].forEach((med) => {
        //console.log(new Date(), med.name, med.dosage, med.time, takenVal, med.idx)
        databaseTakeMedicine(new Date(), med.name, med.dosage, med.time, takenVal, med.idx)
      })
  }

  logAll(index){
    let time
    let iconDropDown
    let backgroundColorDropDown
    let dropDownTitle = ''
    let dropDownMessage = ''
    let takenVal = true

    switch(index){
      case 0: iconDropDown = IMAGES.morningColorW; backgroundColorDropDown = COLOR.red; time = 'morning'; break;
      case 2: iconDropDown = IMAGES.eveningColorW; backgroundColorDropDown = COLOR.purple; time = 'evening'; break;
      case 3: iconDropDown = IMAGES.nightColorW; backgroundColorDropDown = COLOR.blue; time = 'night'; break;
      default: iconDropDown = IMAGES.afternoonColorW; backgroundColorDropDown = COLOR.cyan; time = 'afternoon'
    }

    doneAmount = this.state.doneAmount
    dropDownTitle = time.charAt(0).toUpperCase() + time.substring(1) + ' Medications'
    if(this.state.originalDoneAmount[index] == this.state.totalAmount[index]){
      dropDownMessage = 'No '+time+' medications to be taken!'
    }else if(doneAmount[index] == this.state.totalAmount[index]){
      doneAmount[index] = this.state.originalDoneAmount[index];
      backgroundColorDropDown = COLOR.PrimaryGray
      dropDownTitle = 'Undo for '+time+' medications'
      dropDownMessage = 'Touch and hold to revert logs of ALL '+time+' medications.'
      takenVal = false
    } else {
      doneAmount[index] = this.state.totalAmount[index];
      dropDownMessage = 'All remaining '+time+' medications are taken!'
    }
    thisRef = this;
    let st = this.state
    this.setState({ doneAmount, iconDropDown, backgroundColorDropDown }, () => {this.dropdown.close(); this.dropdown.alertWithType('custom', dropDownTitle, dropDownMessage)},
      this.writeAllInTimeCategory(st.notTakenMeds, time, takenVal)
    )
  }

  revertAll(index){
    let time
    let iconDropDown
    let backgroundColorDropDown
    let dropDownTitle = ''
    let dropDownMessage = ''

    switch(index){
      case 0: iconDropDown = IMAGES.morningColorW; backgroundColorDropDown = COLOR.red; time = 'morning'; break;
      case 2: iconDropDown = IMAGES.eveningColorW; backgroundColorDropDown = COLOR.purple; time = 'evening'; break;
      case 3: iconDropDown = IMAGES.nightColorW; backgroundColorDropDown = COLOR.blue; time = 'night'; break;
      default: iconDropDown = IMAGES.afternoonColorW; backgroundColorDropDown = COLOR.cyan; time = 'afternoon'
    }
    let doneAmount = this.state.doneAmount
    let originalDoneAmount = this.state.originalDoneAmount
    dropDownTitle = time.charAt(0).toUpperCase() + time.substring(1) + ' Medications'
    if(this.state.totalAmount[index] == 0){
      dropDownMessage = 'No '+time+' medications are being tracked.'
    } else if(this.state.doneAmount[index] == 0){
      dropDownMessage = 'No '+time+ ' medications to revert.'
    } else {
      doneAmount[index] = 0
      originalDoneAmount[index] = 0
      this.didRevert[index] = true;
      dropDownMessage = 'ALL '+time+' medications logs have been reverted!'
    }
    let st = this.state
    this.setState({ doneAmount, originalDoneAmount, iconDropDown, backgroundColorDropDown }, () => {this.dropdown.alertWithType('custom', dropDownTitle, dropDownMessage)},
      databaseTakeMedicines(new Date(), index, false)
    )
  }

  render() {
    let currentDate = new Date();

    let done = [];
    let remaining = [];
    for (let i = 0; i < this.state.doneAmount.length; i++) {
      done[i] =
        this.state.doneAmount[i] == this.state.totalAmount[i] ? true : false;
      remaining[i] = this.state.totalAmount[i] - this.state.doneAmount[i];
    }

    return (
      <ImageBackground style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={styles.pageContainer}>
          <View>
            <View style={styles.topInfo}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.welcomeText}>Welcome</Text>
                  <Text style={styles.nameText}>{this.state.name}</Text>
                </View>
                <View style={{ marginTop: 25, marginRight: 20 }}>
                  <Image
                    source={profile_icons[Math.trunc(this.state.icon)]}
                    style={{ width: 100, height: 100, resizeMode: 'contain' }}
                  />
                </View>
              </View>
              <View style={styles.middleMessage}>
                <Text style={styles.middleMessageText}>{this.state.message}</Text>
              </View>
              <View style={styles.subHeader}>
                <Text style={styles.subHeaderText}>
                  {constants.DAY[currentDate.getDay()]}
                </Text>
                <Text style={styles.subHeaderText}>
                  {constants.MONTH[currentDate.getMonth()]}{' '}
                  {currentDate.getDate()}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <HomeMedicineLogger
              done={done}
              onPress={button => {
                this._onPress(button);
              }}
              handlerMorning={(isLongPress) => {if(!isLongPress){this.logAll(0)} else{this.revertAll(0)}}}
              handlerAfternoon={(isLongPress) => {if(!isLongPress){this.logAll(1)}else{this.revertAll(1)}}}
              handlerEvening={(isLongPress) => {if(!isLongPress){this.logAll(2)}else{this.revertAll(2)}}}
              handlerNight={(isLongPress) => {if(!isLongPress){this.logAll(3)}else{this.revertAll(3)}}}
              amtArr={remaining}
            />
          </View>
        </View>
        <DropdownAlert
          ref={ref => this.dropdown = ref}
          closeInterval={4000}
          imageSrc={this.state.iconDropDown}
          containerStyle={{
            backgroundColor: this.state.backgroundColorDropDown,
          }}
        />
      </ImageBackground>
    );
  }
}
export default Home;
