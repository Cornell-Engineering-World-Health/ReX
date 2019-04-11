import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import DropdownAlert from "react-native-dropdownalert";
import { profile_icons } from "../resources/constants";
import { IMAGES, COLOR } from "../resources/constants";
import { HomeMedicineLogger } from "../components/HomeMedicineLogger";
import Modal from "react-native-modal";
import {
  pullMedicineFromDatabase,
  pullSettingsFromDatabase,
  databaseTakeMedicine,
  databaseTakeMedicines,
  pullAllSymptoms,
  pullAllMedicineData
} from "../databaseUtil/databaseUtil";
import {
  setOurNotification,
  cancelOurNotification,
  setNotificationList,
  cancelNotificationList
} from "../components/PushController/PushController";
import Moment from "moment";
const MEDICINE_BUTTON_BACKGROUND_COLOR = "#ff99ff";
const POSITIVE_MESSAGE_TIME_DIFF = 4.32 * Math.pow(10, 8); //3 days
const ENCOURAGEMENT_TEXT = [
  "Keep logging!",
  "Keep it going!",
  "You're doing great."
];

const time_index_map = {
  morning: 0,
  afternoon: 1,
  evening: 2,
  night: 3
};

const index_time_map = {
  0: "morning",
  1: "afternoon",
  2: "evening",
  3: "night"
};

import styles from "./styles";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      totalAmount: [0, 0, 0, 0],
      doneAmount: [0, 0, 0, 0],
      originalDoneAmount: [0, 0, 0, 0],
      name: "",
      iconDropDown: IMAGES.afternoonColorW,
      backgroundColorDropDown: COLOR.cyan,
      message: "Welcome to FIIH Health!",
      notTakenMeds: {},
      //fields for modal
      modalVisible: false,
      selectedPeriod: "",
      confirming: true //true if the user is confirming medicine logs, false if the user is undoing
    };
    this.generatePositiveMessage();
    //TODO: make one function that only pulls name from database
    pullSettingsFromDatabase(data => {
      this.setState({
        name: data.name,
        icon: data.icon
      });
    });

    this.didRevertAll = [false, false, false, false];
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
      };
    };

    pullMedicineFromDatabase(new Date(), function(formattedData) {
      let notTakenMeds = {
        morning: [],
        afternoon: [],
        evening: [],
        night: []
      };
      let takenMeds = {
        morning: [],
        afternoon: [],
        evening: [],
        night: []
      };
      let allMeds = {
        morning: [],
        afternoon: [],
        evening: [],
        night: []
      };
      Object.keys(formattedData).forEach(function(med) {
        let i = 0;
        formattedData[med].timeCategory.forEach(function(time) {
          switch (time) {
            case "Morning":
              totalAmount[0]++;
              allMeds.morning.push(extractInfo(formattedData, med, i));
              if (formattedData[med].taken[i]) {
                doneAmount[0]++;
                takenMeds.morning.push(extractInfo(formattedData, med, i));
              } else {
                notTakenMeds.morning.push(extractInfo(formattedData, med, i));
              }
              break;
            case "Afternoon":
              totalAmount[1]++;
              allMeds.afternoon.push(extractInfo(formattedData, med, i));
              if (formattedData[med].taken[i]) {
                doneAmount[1]++;
                takenMeds.afternoon.push(extractInfo(formattedData, med, i));
              } else {
                notTakenMeds.afternoon.push(extractInfo(formattedData, med, i));
              }
              break;
            case "Evening":
              totalAmount[2]++;
              allMeds.evening.push(extractInfo(formattedData, med, i));
              if (formattedData[med].taken[i]) {
                doneAmount[2]++;
                takenMeds.evening.push(extractInfo(formattedData, med, i));
              } else {
                notTakenMeds.evening.push(extractInfo(formattedData, med, i));
              }
              break;
            case "Night":
              totalAmount[3]++;
              allMeds.night.push(extractInfo(formattedData, med, i));
              if (formattedData[med].taken[i]) {
                doneAmount[3]++;
                takenMeds.night.push(extractInfo(formattedData, med, i));
              } else {
                notTakenMeds.night.push(extractInfo(formattedData, med, i));
              }
              break;
            default:
          }
          i++;
        });
      });

      thisRef.setState({
        totalAmount: totalAmount,
        doneAmount: doneAmount,
        originalDoneAmount: doneAmount.slice(), //copy by value, not reference
        data: formattedData,
        notTakenMeds: notTakenMeds,
        takenMeds: takenMeds,
        allMeds: allMeds
      });
    });
  }

  generateSymptomMessage(callback) {
    let that = this;
    pullAllSymptoms(logged_symptoms => {
      if (logged_symptoms.length == 0) {
        if (callback) callback();
        return;
      }

      let avoid_log_types_set = {};
      logged_symptoms.forEach(s => {
        if (Moment() - Moment(s["timestamp"]) < POSITIVE_MESSAGE_TIME_DIFF) {
          //symptoms is recent
          avoid_log_types_set["" + s["event_type_name"]] = true;
        }
      });

      let most_recent_log_per_type = {};
      logged_symptoms.forEach(s => {
        if (avoid_log_types_set[s["event_type_name"]] == undefined) {
          //avoid recent log types
          most_recent_log_per_type["" + s["event_type_name"]] = s["timestamp"];
        }
      });

      if (Object.keys(most_recent_log_per_type) == 0) {
        //Failed to find
        if (callback) callback();
      } else {
        let keys = Object.keys(most_recent_log_per_type);
        let choice = Math.floor(Math.random() * keys.length);
        let chosen_symptom_time = most_recent_log_per_type[keys[choice]];
        that.setState({
          message:
            ENCOURAGEMENT_TEXT[
              Math.floor(Math.random() * ENCOURAGEMENT_TEXT.length)
            ] +
            "\n" +
            "Your last occurance of " +
            keys[choice].toLowerCase() +
            " was\n" +
            Moment(chosen_symptom_time).fromNow() +
            "!"
        });
      }
    });
  }

  generateMedicationMessage(callback) {
    let that = this;
    pullAllMedicineData(medication_reminders => {
      if (medication_reminders.length == 0) {
        if (callback) callback();
        return;
      }

      let most_recent_missed_t = medication_reminders[0]["timestamp"];
      medication_reminders.forEach(med => {
        let fields = JSON.parse(med.fields);
        let contains_false = false;
        fields["Taken"].forEach(didTake => {
          if (didTake == false) contains_false = true;
        });
        if (contains_false && Moment() - Moment(med["timestamp"]) > 0) {
          //in the past
          most_recent_missed_t = med["timestamp"];
        }
      });

      if (
        Moment() - Moment(most_recent_missed_t) <
        POSITIVE_MESSAGE_TIME_DIFF
      ) {
        //Failed
        if (callback) callback();
        return;
      } else {
        let time_diff_str = Moment(most_recent_missed_t).fromNow();
        if (time_diff_str.indexOf("ago") == -1) {
          if (callback) callback();
          return;
        }
        time_diff_str = time_diff_str.substring(0, time_diff_str.length - 4);
        that.setState({
          message:
            ENCOURAGEMENT_TEXT[
              Math.floor(Math.random() * ENCOURAGEMENT_TEXT.length)
            ] +
            "\n" +
            "You have not missed any medications in\n" +
            time_diff_str +
            "!"
        });
      }
    });
  }

  generatePositiveMessage() {
    let symptom_or_medicine = Math.random() < 0.5;
    if (symptom_or_medicine) {
      this.generateSymptomMessage(() => this.generateMedicationMessage());
    } else {
      this.generateMedicationMessage(() => this.generateSymptomMessage());
    }
  }

  writeAllInTimeCategory(notTakenMeds, time, takenVal) {
    notTakenMeds[time].forEach(med => {
      databaseTakeMedicine(
        new Date(),
        med.name,
        med.dosage,
        med.time,
        takenVal,
        med.idx
      );
      //notifications:
      if (this.state.data[med.name].notificationStatus) {
        //if notificaiton on
        let date = new Date();
        date.setHours(med.time.substring(0, 2));
        date.setMinutes(med.time.substring(3));
        let date_time = Moment(date).format();
        if (takenVal) {
          cancelOurNotification(med.name, med.dosage, date_time);
        } else {
          setOurNotification(med.name, med.dosage, date_time);
        }
      }
    });
  }

  getAffectedMedicineInfo(state, index) {
    let data = state.data;
    let keys = Object.keys(data);

    let times_of_day = ["Morning", "Afternoon", "Evening", "Night"];

    let medName_lst = [];
    let dosage_lst = [];
    let date_time_lst = [];

    keys.forEach(k => {
      let rel_index = data[k].timeCategory.indexOf(times_of_day[index]);
      if (rel_index != -1) {
        if (data[k].notificationStatus) {
          //if notification feature is on
          medName_lst.push(k);
          dosage_lst.push(data[k].dosage);
          let hr = data[k].time[rel_index].substring(0, 2);
          let min = data[k].time[rel_index].substring(3);
          let d = new Date();
          d.setHours(hr);
          d.setMinutes(min);
          let d_t = Moment(d).format();
          date_time_lst.push(d_t);
        }
      }
    });

    return [medName_lst, dosage_lst, date_time_lst];
  }

  /**
  * checkValidPress(index) returns {canPress: bool, dropDownTitle: string,
  * dropDownMessage: string, iconDropDown: IMAGE, backgroundColorDropDown: COLOR}
  */
  checkValidPress(index){
    let time;
    let iconDropDown;
    let backgroundColorDropDown;
    let dropDownTitle = "";
    let dropDownMessage = "";
    let canTake = true;

    switch (index) {
      case 0:
        iconDropDown = IMAGES.morningColorW;
        backgroundColorDropDown = COLOR.red;
        time = "morning";
        break;
      case 2:
        iconDropDown = IMAGES.eveningColorW;
        backgroundColorDropDown = COLOR.purple;
        time = "evening";
        break;
      case 3:
        iconDropDown = IMAGES.nightColorW;
        backgroundColorDropDown = COLOR.blue;
        time = "night";
        break;
      default:
        iconDropDown = IMAGES.afternoonColorW;
        backgroundColorDropDown = COLOR.cyan;
        time = "afternoon";
    }

    dropDownTitle =
      time.charAt(0).toUpperCase() + time.substring(1) + " Medications";

    if (!this.checkTime(index)) {
      dropDownMessage =
        "Your " + time + " medications cannot be taken at this time of day!";
      canTake = false;
    } else if (this.state.totalAmount[index] == 0) {
      dropDownMessage = "No " + time + " medications to be taken!";
      canTake = false;
    }

    let res = {
      canPress: canTake,
      dropDownTitle: dropDownTitle,
      dropDownMessage: dropDownMessage,
      iconDropDown: iconDropDown,
      backgroundColorDropDown: backgroundColorDropDown
    }

    //to prevent visual bug
    this.dropdown.close();

    return res
  }

  /**
  * Either blocks attempt with a dropdown alert or opens modal to log
  */
  tryOpenModal(index) {
    canTakeInfo = this.checkValidPress(index)
    if(canTakeInfo.canPress){
      this.setState({
        modalVisible: true,
        selectedPeriod: index_time_map[index],
        confirming: true
      });
    }

    iconDropDown = canTakeInfo.iconDropDown
    backgroundColorDropDown = canTakeInfo.backgroundColorDropDown
    this.setState({ iconDropDown, backgroundColorDropDown }, () => {
      if(!canTakeInfo.canPress){
        this.dropdown.close();
        this.dropdown.alertWithType("custom", canTakeInfo.dropDownTitle, canTakeInfo.dropDownMessage);
      }
    });
  }

  /**
  * Writes to DB
  */
  logAll(index){
    if (this.state.doneAmount[index] == this.state.totalAmount[index]) {
      return
    }

    isSubset = !this.didRevertAll[index]
    doneAmount = this.state.doneAmount;
    doneAmount[index] = this.state.totalAmount[index];

    time = index_time_map[index]
    dropDownTitle =
      time.charAt(0).toUpperCase() + time.substring(1) + " Medications";
    dropDownMessage = "All remaining " + time + " medications are taken!";

    thisRef = this
    st = this.state
    this.setState({ doneAmount }, () => {
      this.dropdown.close();
      this.dropdown.alertWithType("custom", dropDownTitle, dropDownMessage);

      if (!isSubset) {
        databaseTakeMedicines(new Date(), index, true);
        let args = thisRef.getAffectedMedicineInfo(st, index);
        cancelNotificationList(args[0], args[1], args[2]);
      }
      else this.writeAllInTimeCategory(st.notTakenMeds, time, true);

    });
  }

  checkTime(index){
    var time = Moment().format('HH:MM')
    let tc = ["11:00", "16:00", "19:00", "24:00"]; //temp boundaries TODO: put on setting?
    switch(index){
      case 0: return (time < tc[0])
      case 1: return (time >= tc[0] && time < tc[1])
      case 2: return (time >= tc[1] && time < tc[2])
      default: return (time >= tc[2] && time < tc[3])
    }
  }

  revertAll(index) {
    if (this.state.doneAmount[index] == 0) {
      return
    }

    dropDownMessage = ""
    doneAmount = this.state.doneAmount


    time = index_time_map[index]
    dropDownTitle =
      time.charAt(0).toUpperCase() + time.substring(1) + " Medications";
    dropDownMessage = "ALL " + time + " medications logs have been reverted!";

    doneAmount[index] = 0;
    this.didRevertAll[index] = true;

    thisRef = this
    st = this.state
    this.setState({ doneAmount }, () => {
      this.dropdown.close();
      this.dropdown.alertWithType("custom", dropDownTitle, dropDownMessage);

      databaseTakeMedicines(new Date(), index, false);
      let args = thisRef.getAffectedMedicineInfo(st, index);
      setNotificationList(args[0], args[1], args[2]);
    });
  }


  /*
  Returns an array of card components that hold the medicine to be taken's name,
  dosage, and time. isConfirmCard is a boolean that if true, will use cardIsConfirm
  styles while if false will use cardIsUndo
  */
  _generateModalCards() {
    let index = time_index_map[this.state.selectedPeriod]
    let emptyData = {
      morning: [],
      afternoon: [],
      evening: [],
      night: []
    }
    data = {}

    if(this.state.confirming){
      if(this.state.doneAmount[index] == this.state.totalAmount[index]){//none
        data = emptyData
      } else if(this.state.doneAmount[index] == 0){ //all
        data = this.state.allMeds
      } else {//subset
        data = this.state.notTakenMeds
      }
    } else {
      if(this.state.doneAmount[index] == this.state.totalAmount[index]){//all
        data = this.state.allMeds
      } else if(this.state.doneAmount[index] == 0){ //none
        data = emptyData
      } else {//subset
        data = this.state.takenMeds
      }
    }

    if (
      !data ||
      !data[this.state.selectedPeriod] ||
      data[this.state.selectedPeriod].length == 0
    ) {
      msg = this.state.confirming ? '~ No medications to take ~' : '~ No medications to undo ~'

      return (
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}>
          <Text style={{fontSize: 16, color: COLOR.PrimaryGray}}>{msg}</Text>
        </View>
      )
    }
    let cards = [];
    data[this.state.selectedPeriod].forEach((med, index) => {
      cards.push(
        <Card
          key={med + "med" + index}
          name={med.name}
          dosage={med.dosage}
          time={med.time}
          style={
            this.state.confirming ? styles.cardIsConfirm : styles.cardIsUndo
          }
        />
      );
    });
    return (
      <ScrollView>{cards}</ScrollView>
    );
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
      <ImageBackground style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={styles.pageContainer}>
          <View>
            <View style={styles.topInfo}>
              <View
                style={{
                  paddingTop: 35,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.header}>
                  <Text style={styles.welcomeText}>Welcome</Text>
                  <Text style={styles.nameText}>{this.state.name}</Text>
                </View>
                <View style={{ marginRight: 20 }}>
                  <Image
                    source={profile_icons[Math.trunc(this.state.icon)]}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
              </View>
              <View style={styles.middleMessage}>
                <Text style={styles.middleMessageText}>
                  {this.state.message}
                </Text>
              </View>
              <View style={styles.subHeader}>
                <Text style={styles.subHeaderText}>
                  {constants.DAY[currentDate.getDay()]}
                </Text>
                <Text style={styles.subHeaderText}>
                  {constants.MONTH[currentDate.getMonth()]}{" "}
                  {currentDate.getDate()}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <HomeMedicineLogger
              done={done}
              onPress={button => {
                this._onPress(button);
              }}
              handlerMorning={(isLongPress) => {if(!isLongPress){this.tryOpenModal(0)} else{this.revertAll(0)}}}
              handlerAfternoon={(isLongPress) => {if(!isLongPress){this.tryOpenModal(1)}else{this.revertAll(1)}}}
              handlerEvening={(isLongPress) => {if(!isLongPress){this.tryOpenModal(2)}else{this.revertAll(2)}}}
              handlerNight={(isLongPress) => {if(!isLongPress){this.tryOpenModal(3)}else{this.revertAll(3)}}}
              amtArr={remaining}
            />
          </View>
        </View>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          closeInterval={4000}
          imageSrc={this.state.iconDropDown}
          containerStyle={{
            backgroundColor: this.state.backgroundColorDropDown
          }}
        />
        <Modal
          style={styles.modal}
          isVisible={this.state.modalVisible}
          onBackdropPress={() => {
            this.setState({ modalVisible: false, selectedPeriod: "" });
          }}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalHeader, styles.lightShadow]}>
              <Text style={styles.modalHeaderText}>
                {this.state.confirming
                  ? "Confirm taking these medications?"
                  : "Undo taking these medications?"}
              </Text>
              <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                <TouchableOpacity
                  style={[styles.modalTab, { backgroundColor:
                    (this.state.confirming ? COLOR.blue : (COLOR.blue + "50")) }]}
                  onPress={() => {
                    this.setState({confirming: true})
                  }}
                >
                  <Text style={[styles.modalTabText, { fontWeight:
                    (this.state.confirming ? "300" : "200") }]}>
                    Quick Log All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalTab, { backgroundColor:
                    (this.state.confirming ? (COLOR.blue + "50") : COLOR.blue) }]}
                  onPress={() => {
                    this.setState({confirming: false})
                  }}
                >
                  <Text style={[styles.modalTabText, { fontWeight:
                    (this.state.confirming ? "200" : "300")}]}>
                    Quick Undo All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalBody}>
              {this._generateModalCards()}
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLOR.white }]}
                onPress={() =>
                  this.setState({ modalVisible: false, selectedPeriod: "" })
                }
              >
                <Text style={[styles.ButtonText, { color: COLOR.blue }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLOR.blue }]}
                onPress={() => {
                  if (this.state.confirming) {
                    this.logAll(time_index_map[this.state.selectedPeriod]);
                  } else {
                    this.revertAll(time_index_map[this.state.selectedPeriod]);
                  }
                  this.setState({ modalVisible: false, selectedPeriod: "" });
                }}
              >
                <Text style={[styles.ButtonText, { color: COLOR.white }]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    );
  }
}

const Card = props => {
  //props should contain name, dosage, timeString to take
  timeParts = props.time.split(':')
  d = new Date()
  d.setHours(timeParts[0])
  d.setMinutes(timeParts[1])
  timeString = Moment(d).format("h:mm a")

  return (
    <View style={[styles.cardWrapper]}>
      <View style={[styles.cardContainer, styles.darkShadow]}>
        <View style={[styles.cardHeader, props.style]}>
          <Text style={styles.cardHeaderText}>
            {props.name + " " + props.dosage}
          </Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardBodyText}>{timeString}</Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
