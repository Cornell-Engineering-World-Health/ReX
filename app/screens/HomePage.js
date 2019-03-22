import React from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity,ScrollView } from "react-native";
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
import styles from "./styles";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      data: [],
      totalAmount: [0, 0, 0, 0],
      doneAmount: [0, 0, 0, 0],
      originalDoneAmount: [0, 0, 0, 0],
      name: "Navin",
      iconDropDown: IMAGES.afternoonColorW,
      backgroundColorDropDown: COLOR.cyan,
      message: "Welcome to FIIH Health!",
      selectedPeriod: "",
      notTakenMeds: {}
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
      Object.keys(formattedData).forEach(function(med) {
        let i = 0;
        formattedData[med].timeCategory.forEach(function(time) {
          switch (time) {
            case "Morning":
              totalAmount[0]++;
              if (formattedData[med].taken[i]) {
                doneAmount[0]++;
              } else {
                notTakenMeds.morning.push(extractInfo(formattedData, med, i));
              }
              break;
            case "Afternoon":
              totalAmount[1]++;
              if (formattedData[med].taken[i]) {
                doneAmount[1]++;
              } else {
                notTakenMeds.afternoon.push(extractInfo(formattedData, med, i));
              }
              break;
            case "Evening":
              totalAmount[2]++;
              if (formattedData[med].taken[i]) {
                doneAmount[2]++;
              } else {
                notTakenMeds.evening.push(extractInfo(formattedData, med, i));
              }
              break;
            case "Night":
              totalAmount[3]++;
              if (formattedData[med].taken[i]) {
                doneAmount[3]++;
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
        notTakenMeds: notTakenMeds
      });
      console.log("not taken meds", notTakenMeds);
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

  logAll(index) {
    let time;
    let iconDropDown;
    let backgroundColorDropDown;
    let dropDownTitle = "";
    let dropDownMessage = "";
    let takenVal = true;
    let forbidTake = false;

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

    doneAmount = this.state.doneAmount;
    dropDownTitle =
      time.charAt(0).toUpperCase() + time.substring(1) + " Medications";
    if (this.state.originalDoneAmount[index] == this.state.totalAmount[index]) {
      dropDownMessage = "No " + time + " medications to be taken!";
    } else if (!this.checkTime(index)) {
      dropDownMessage =
        "Your " + time + " medications cannot be taken at this time of day!";
      forbidTake = true;
    } else if (doneAmount[index] == this.state.totalAmount[index]) {
      doneAmount[index] = this.state.originalDoneAmount[index];
      backgroundColorDropDown = COLOR.PrimaryGray;
      dropDownTitle = "Undo for " + time + " medications";
      dropDownMessage =
        "Touch and hold to revert logs of ALL " + time + " medications.";
      takenVal = false;
    } else {
      doneAmount[index] = this.state.totalAmount[index];
      dropDownMessage = "All remaining " + time + " medications are taken!";
    }

    thisRef = this;
    let st = this.state;
    this.setState({ doneAmount, iconDropDown, backgroundColorDropDown }, () => {
      this.dropdown.close();
      this.dropdown.alertWithType("custom", dropDownTitle, dropDownMessage);
      if (!forbidTake) {
        if (this.didRevertAll[index]) {
          databaseTakeMedicines(new Date(), index, takenVal);
          let args = thisRef.getAffectedMedicineInfo(st, index);
          if (takenVal) cancelNotificationList(args[0], args[1], args[2]);
          else setNotificationList(args[0], args[1], args[2]);
        } else this.writeAllInTimeCategory(st.notTakenMeds, time, takenVal);
      }
    });
  }

  checkTime(index) {
    var time_date = new Date();
    let tc = ["11:00", "15:00", "19:00", "23:00"]; //temp boundaries TODO: put on setting?
    var time = time_date.getHours() + ":" + time_date.getMinutes();
    switch (index) {
      case 0:
        return time < tc[0];
      case 1:
        return time >= tc[0] && time < tc[1];
      case 2:
        return time >= tc[1] && time < tc[2];
      default:
        return time >= tc[2] && time < tc[3];
    }
  }
  revertAll(index) {
    let time;
    let iconDropDown;
    let backgroundColorDropDown;
    let dropDownTitle = "";
    let dropDownMessage = "";
    let forbidUndo = false;

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
    let doneAmount = this.state.doneAmount;
    let originalDoneAmount = this.state.originalDoneAmount;
    dropDownTitle =
      time.charAt(0).toUpperCase() + time.substring(1) + " Medications";

    if (this.state.totalAmount[index] == 0) {
      dropDownMessage = "No " + time + " medications are being tracked.";
    } else if (this.state.doneAmount[index] == 0) {
      dropDownMessage = "No " + time + " medications to revert.";
    } else if (!this.checkTime(index)) {
      dropDownMessage =
        "Your " + time + " medications cannot be reverted at this time of day!";
      forbidUndo = true;
    } else {
      doneAmount[index] = 0;
      originalDoneAmount[index] = 0;
      this.didRevertAll[index] = true;
      dropDownMessage = "ALL " + time + " medications logs have been reverted!";
    }

    let thisRef = this;
    let st = this.state;
    this.setState(
      { doneAmount, originalDoneAmount, iconDropDown, backgroundColorDropDown },
      () => {
        this.dropdown.alertWithType("custom", dropDownTitle, dropDownMessage);
        if (this.didRevertAll[index] && !forbidUndo) {
          databaseTakeMedicines(new Date(), index, false);
          let args = thisRef.getAffectedMedicineInfo(st, index);
          setNotificationList(args[0], args[1], args[2]);
        }
      }
    );
  }

  _generateModalCards() {
    if (
      !this.state.notTakenMeds ||
      !this.state.notTakenMeds[this.state.selectedPeriod]
    ) {
      return;
    }
    let cards = [];
    this.state.notTakenMeds[this.state.selectedPeriod].forEach((med, index) => {
      console.log("med", med);
      cards.push(
        <Card
          key={med + "med" + index}
          name={med.name}
          dosage={med.dosage}
          time={med.time}
        />
      );
    });
    return cards;
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
              handlerMorning={isLongPress => {
                this.setState({
                  modalVisible: true,
                  selectedPeriod: "morning"
                }); /*if(!isLongPress){this.logAll(0)} else{this.revertAll(0)}}*/
              }}
              handlerAfternoon={isLongPress => {
                if (!isLongPress) {
                  this.logAll(1);
                } else {
                  this.revertAll(1);
                }
              }}
              handlerEvening={isLongPress => {
                if (!isLongPress) {
                  this.logAll(2);
                } else {
                  this.revertAll(2);
                }
              }}
              handlerNight={isLongPress => {
                if (!isLongPress) {
                  this.logAll(3);
                } else {
                  this.revertAll(3);
                }
              }}
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
            this.setState({ modalVisible: false });
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader} />
            <View style={[styles.modalHeader, styles.lightShadow]}>
              <Text style={styles.modalHeaderText}>
                Confirm taking these medications?
              </Text>
            </View>
            <View style={styles.modalBody}>
              <ScrollView>{this._generateModalCards()}</ScrollView>
            </View>
            <View style={styles.modalFooter} >
              <TouchableOpacity style ={[styles.modalButton,{backgroundColor: COLOR.white}]} onPress = {() => this.setState({modalVisible:false})} >
                  <Text style = {[styles.ButtonText,{color:COLOR.blue}]}> Cancel </Text>
              </TouchableOpacity>
              <TouchableOpacity style ={[styles.modalButton,{backgroundColor: COLOR.blue}]} onPress = {() => this.setState({modalVisible:false})}>
                  <Text style = {[styles.ButtonText,{color:COLOR.white}]}> Submit </Text>
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
  return (
    <View style={[styles.cardWrapper]}>
      <View style={[styles.cardContainer, styles.darkShadow]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>
            {props.name + " " + props.dosage}
          </Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardBodyText}>{props.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
