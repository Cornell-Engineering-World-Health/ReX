import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import DoseCard from "../components/Card/DoseCard";
import {
  pullMedicineFromDatabase,
  pullAllMedicineData
} from "../databaseUtil/databaseUtil";

import Moment from "moment";
import {
  asyncCreateMedicineEvents,
  databaseTakeMedicine
} from "../databaseUtil/databaseUtil";
import DropdownAlert from "react-native-dropdownalert";
import { COLOR, IMAGES, timeFormatter } from "../resources/constants";
import { shouldBeTaken, shouldBeTakenNow } from "../resources/helpers";
import { setMassNotification } from "../components/PushController/PushController.js";
import MedicineAddForm from "../components/MedicineAddForm/MedicineAddForm.js";
import MedicineCalendar from "../components/Calendar/MedicineCalendar";
import {
  setOurNotification,
  cancelOurNotification
} from "../components/PushController/PushController";
class MedicineView extends React.Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      passed_index: 0,
      toggle_add: false,
      summaryVisible: false,
      selectedDate: null,
      medicine: {}
    };
  }

  /**
   * asyncDatabasePull populates [state.data] with medication data for the current day
   */
  asyncDatabasePull = () => {
    let that = this;
    pullMedicineFromDatabase(new Date(), function(formattedData) {
      var medicineData = [];
      Object.keys(formattedData).forEach(function(med) {
        var medObj = formattedData[med];
        var formattedTimes = medObj.time.map(
          t => Moment().format("MMMM DD YYYY") + " " + t
        );
        medicineData.push({
          title: med,
          time: formattedTimes,
          timeVal: medObj.time,
          dosage: medObj.dosage,
          statuses: medObj.taken,
          takenTime: medObj.takenTime,
          notificationStatus: medObj.notificationStatus
        });
      });
      that.setState({
        data: medicineData
      });
    });

    this.updateMedicineState();
  };

  updateMedicineState() {
    pullAllMedicineData(data => {
      let formattedData = {};
      data.forEach((element, index) => {
        let tempFormat = JSON.parse(element.fields);
        tempFormat.date = Moment(tempFormat["Start Date"]).format("YYYY-MM-DD");

        //check if the dict has this date already as a key
        if (!formattedData[tempFormat.date]) {
          formattedData[tempFormat.date] = {};

          formattedData[tempFormat.date].meds = [];
          formattedData[tempFormat.date].customStyles = {};
        }
        formattedData[tempFormat.date].meds.push(tempFormat); //add medicine to that date
      });

      this.setState({ medicine: this.initializeStyles(formattedData) });
    });
  }

  /*
  given an object where each key is a date in the form 1999-01-01, this adds a
  customStyle attribute to act as the styling for the Wix Calendar
*/
  initializeStyles(allMedicine) {
    let dates = Object.keys(allMedicine);
    //iterate through each date

    dates.forEach(dateKey => {
      let totalTaken = 0;
      let totalMeds = 0;
      allMedicine[dateKey].meds.forEach(singleMed => {
        let currTime = new Date(singleMed["Start Date"]);

        //need to check if the date is after curr date
        if (Moment(currTime).isAfter(new Date())) return;

        singleMed["Taken"].forEach((singleTime, timeIndex) => {
          if (
            !this.isAfterNow(
              singleMed["Start Date"],
              singleMed["Time"][timeIndex]
            )
          ) {
            totalTaken = totalTaken + (singleTime ? 1 : 0);
            totalMeds++;
          }
        });
      });
      let isToday = Moment(dateKey).isSame(new Date(), "day");

      allMedicine[dateKey].customStyles = {
        container: {
          backgroundColor: this.getColor(totalTaken / totalMeds),
          borderWidth: isToday ? 1 : 0,
          borderColor: "#e0e0e0",
          borderRadius: 0
        }
      };
    });
    return allMedicine;
  }

  /*
  Given a number between 0 and 1, returns the corresponding color from the
  global colorScale variable
*/
  getColor(num) {
    if (num > 1) console.warn("invalid domain.");

    if (num == 1) {
      return "#b7ffca";
    } else {
      return "rgba(255, 88, 66," + (1 - num) + " )";
    }
  }

  /**
   * error dropdown if user fails to complete the medicine add form and presses submit
   */
  errorOnSubmit() {
    this.dropdown.close();
    this.dropdown.alertWithType(
      "custom",
      "Form Incomplete",
      "Please add any missing information"
    );
  }

  /**
   * success dropdown if users succesfully submits the medicine add form
   */
  successOnSubmit() {
    this.dropdown_success.close();
    this.dropdown_success.alertWithType("custom", "New Medicine Added!", "");
  }

  /**
   * asyncDatabaseUpdate takes data for a new medication and writes to the database:
   * title (String): medicine name
   * dosage (String): dosage amount in mg
   * start (Moment date object): when to begin logging
   * end (Moment date object): when to stop logging
   * time (String array): array of times to start-> writes to the database
   * time_category (Integer): {1,2,3,4} correspond to morning, afternoon, evening, and night respectively
   */
  asyncDatabaseUpdate = (title, dosage, start, end, time, time_category) => {
    let thisRef = this;

    setMassNotification(start, end, title, dosage, time);
    asyncCreateMedicineEvents(title, dosage, start, end, time, time_category);
    endNew = Moment(end);
    endNew.date(endNew.date() + 1);
    if (Moment().isBetween(start, endNew)) {
      medicineData = thisRef.state.data;
      for (var i = 0; i < medicineData.length; i++) {
        if (medicineData[i].title == title) {
          medicineData.splice(i, 1);
        }
      }
      var formattedTimes = time.map(
        t => Moment().format("MMMM DD YYYY") + " " + t
      );
      var taken = time.map(t => false);
      var takenTime = time.map(t => "");
      medicineData.push({
        title: title,
        time: formattedTimes,
        timeVal: time,
        dosage: dosage,
        statuses: taken,
        takenTime: takenTime,
        notificationStatus: true
      });
      thisRef.setState({
        toggle_add: false,
        data: medicineData
      });
    }

    setTimeout(() => this.updateMedicineState(), 2000);
  };

  componentDidMount = () => {
    this.asyncDatabasePull();
  };

  // 0 is red, 1 is green, 2 is gray
  // returns tuple of [passed_index, color]
  getPassedIndex = a => {
    var passed_index = 0;
    if (a.statuses) {
      for (var x = a.statuses.length - 1; x >= 0; x--) {
        // hit a taken, next one
        if (a.statuses[x]) {
          passed_index = x + 1;
          break;
        }
        // first red we see (latest red)
        if (
          a.statuses[x] == false &&
          shouldBeTaken(new Date(a.time[x]), new Date()) &&
          !shouldBeTakenNow(new Date(a.time[x]))
        ) {
          return [x, 0];
        }
        // if no taken or red, means we havent missed any and have taken some
      }
    } else {
      passed_index = 0;
    }
    if (shouldBeTakenNow(new Date(a.time[passed_index]))) {
      return [passed_index, 1];
    } else {
      return [passed_index, 2];
    }
  };

  /**
   * custom sorting algorithm for medicine cards on the medicine view flatlist:
   * [Red] Missed Medications
   * [Green] Take Now Medications
   * [Grey] Complete/Future Medications
   * sorted in ascending time order within each category
   */
  compareCards = (a, b) => {
    var passed_a = this.getPassedIndex(a)[0];
    var color_a = this.getPassedIndex(a)[1];
    var passed_b = this.getPassedIndex(b)[0];
    var color_b = this.getPassedIndex(b)[1];

    if (color_a != color_b) {
      return color_a > color_b;
    } else {
      // Done for the Day must be last
      if (passed_a == a.statuses.length) {
        return 1;
        // Compare times if same color
      } else {
        return a.time[passed_a] > b.time[passed_b];
      }
    }
  };

  /**
   * returns DoseCard component populated with appropriate medicine data
   */
  _renderCard = ({ item }) => {
    return (
      <View>
        <DoseCard
          title={item.title}
          time={item.time}
          key={item.title}
          takenTime={item.takenTime}
          dosage={item.dosage}
          passed={item.statuses}
          imageData={this.updateData}
          notificationStatus={item.notificationStatus}
          buttonsRight={[
            {
              text: "Edit",
              type: "edit",
              onPress: () => {
                this.setState({
                  modalVisible: true
                });
              }
            }
          ]}
        />
      </View>
    );
  };

  toggleMedicine(medObj, time, taken) {
    /*
    databaseTakeMedicine(
      new Date(),
      this.props.title,
      this.props.dosage,
      hhmm_time,
      true,
      index
    );*/

    // first update state
    let allMedicine = this.state.medicine;
    let index = -1;
    //find index of this time in the medicine object
    for (let x = 0; x < medObj["Time"].length; x++) {
      if (medObj["Time"][x] === time) {
        index = x;
        break;
      }
    }

    let medIndex = -1;
    //find index of this medicine in the medicine object

    for (let x = 0; x < allMedicine[medObj["date"]].meds.length; x++) {
      let med = allMedicine[medObj["date"]].meds[x];
      if (med["Pill Name"] === medObj["Pill Name"]) {
        medIndex = x;
        break;
      }
    }

    let hhmm_time = taken ? "" : new Date().toTimeString().substring(0, 5);

    allMedicine[medObj["date"]].meds[medIndex]["Taken"][index] = !taken;
    allMedicine[medObj["date"]].meds[medIndex]["Taken Time"][index] = hhmm_time;

    this.setState({ medicine: this.initializeStyles(allMedicine) }, () =>
      console.log("")
    );

    //now update database and notification

    if (!taken) {
      //we are taking it now
      databaseTakeMedicine(
        new Date(),
        medObj["Pill Name"],
        medObj["Dosage"],
        time,
        true,
        index
      );
      cancelOurNotification(
        medObj["Pill Name"],
        medObj["Dosage"],
        Moment(new Date(Moment().format("MMMM DD YYYY") + " " + time)).format()
      );
    } else {
      databaseTakeMedicine(
        new Date(),
        medObj["Pill Name"],
        medObj["Dosage"],
        time,
        false,
        index
      );
      setOurNotification(
        medObj["Pill Name"],
        medObj["Dosage"],
        Moment(new Date(Moment().format("MMMM DD YYYY") + " " + time)).format()
      );
    }
  }

  _generateMedicineCards(date, filter) {
    let dayData = this.state.medicine[date];
    if (!dayData) return null;
    let cards = [];
    //iterate through the meds array
    dayData.meds.forEach((d, i) => {
      cards.push(
        <View
          style={[
            { paddingLeft: 30, paddingRight: 30, paddingBottom: 10 },
            styles.lightShadow
          ]}
          key={"i" + i + "gencards"}
        >
          <View style={[styles.modalCardWrapper]}>
            <Text style={[styles.modalCardHeaderText]}>{d["Pill Name"]}</Text>
            {this._generateMedicineCard(d, filter)}
          </View>
        </View>
      );
    });

    return cards;
  }

  generateDate(startdate, time) {
    let currTime = new Date(startdate);
    currTime.setHours(parseInt(time.slice(0, 2)));
    currTime.setMinutes(parseInt(time.slice(3, 5)));
    return currTime;
  }

  isAfterNow(startdate, time) {
    return Moment(this.generateDate(startdate, time)).isAfter(new Date());
  }

  /*
  Returns true if the given startdate & time is nearby tot he current time

  interval in minutes
  */
  isClose(startdate, time, interval) {
    let date = this.generateDate(startdate, time);

    let now = new Date();
    let start = new Date(date - interval * 60 * 1000);
    let end = new Date(interval * 60 * 1000 + (date - 0));
    return Moment(now).isAfter(start) && Moment(now).isBefore(end);
  }

  /*
if filter is true, don't show medication that has already been taken and
only show up to 1 medication in the future
  */
  _generateMedicineCard(medObj, filter) {
    let cards = [];
    let numInFuture = 0;
    medObj["Time"].forEach((d, i) => {
      let taken = medObj["Taken"][i];
      let takenText = taken ? "Taken at " : "Missed";

      if (filter && (taken || numInFuture >= 1)) return;

      let currTime = this.generateDate(medObj["Start Date"], d);

      let cardStyle = null;
      if (medObj["Taken"][i]) {
        cardStyle = {
          backgroundColor: "#ecfaf7",
          borderColor: "#7fdecb"
        };
      } else if (this.isClose(medObj["Start Date"], d, 15)) {
        cardStyle = {
          backgroundColor: "#42f4bf80",
          borderColor: "#42f4bf"
        };
        takenText = "Take now!";
        numInFuture++;
      } else if (this.isAfterNow(medObj["Start Date"], d)) {
        cardStyle = {
          backgroundColor: "#efefef",
          borderColor: "#e5e5e5"
        };
        takenText = "";
        numInFuture++;
      } else {
        cardStyle = {
          backgroundColor: "#fcf0f2",
          borderColor: "#f8ced5"
        };
      }

      cards.push(
        <TouchableOpacity
          disabled={takenText == ""}
          style={[styles.modalCardContainer, cardStyle]}
          onPress={() => this.toggleMedicine(medObj, d, taken)}
          key={i + "genmedcard" + d}
        >
          <Text style={styles.modalCardName}>
            {timeFormatter(medObj["Time"][i])}
          </Text>
          <Text style={styles.modalCardName}>
            {takenText}
            {timeFormatter(medObj["Taken Time"][i])}
          </Text>
        </TouchableOpacity>
      );
    });

    if (cards.length == 0) {
      return (
        <View>
          <Text style={[styles.modalCardHeaderText, { color: "#e0e0e0" }]}>
            Done for today!
          </Text>
        </View>
      );
    }

    return cards;
  }

  render() {
    const { navigate } = this.props.navigation;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    currentDate = new Date();
    currentMonths = monthNames[currentDate.getMonth()];
    currentYear = currentDate.getYear();
    currentDay = currentDate.getDay();
    console.log(this.state.medicine);
    return (
      <View style={styles.wrapper}>
        <View style={[styles.darkShadow, styles.calendarContainer]}>
          <MedicineCalendar
            style={styles.calendar}
            medicine={JSON.parse(JSON.stringify(this.state.medicine))}
            onDayPress={day => {
              if (this.state.medicine[day.dateString]) {
                this.setState({
                  summaryVisible: true,
                  selectedDate: day.dateString
                });
              }
            }}
          />
        </View>

        <ScrollView>
          {this._generateMedicineCards(
            Moment(new Date()).format("YYYY-MM-DD"),
            true
          )}
        </ScrollView>
        <Modal isVisible={this.state.toggle_add} style={styles.addFormWrapper}>
          <MedicineAddForm
            exitModal={() => {
              this.setState({ toggle_add: false });
            }}
            asyncDatabaseUpdate={(
              title,
              dosage,
              start,
              end,
              time,
              time_category
            ) => {
              this.asyncDatabaseUpdate(
                title,
                dosage,
                start,
                end,
                time,
                time_category
              );
            }}
            errorOnSubmit={() => {
              this.errorOnSubmit();
            }}
            successOnSubmit={() => {
              this.successOnSubmit();
            }}
          />
        </Modal>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          closeInterval={2000}
          imageSrc={IMAGES.close_white}
          containerStyle={{
            backgroundColor: COLOR.red
          }}
        />
        <DropdownAlert
          ref={ref => (this.dropdown_success = ref)}
          closeInterval={2000}
          imageSrc={IMAGES.checkmarkWhite}
          containerStyle={{
            backgroundColor: COLOR.cyan
          }}
        />
        {!this.state.data[0] && (
          <Text style={styles.defaultText}>
            No medicines scheduled for today!
          </Text>
        )}
        <Modal
          isVisible={this.state.summaryVisible}
          onBackdropPress={() => this.setState({ summaryVisible: false })}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>
                {this.state.selectedDate}
              </Text>
            </View>
            <View style={styles.modalBody}>
              <ScrollView>
                {this._generateMedicineCards(this.state.selectedDate, false)}
              </ScrollView>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            this.setState({
              toggle_add: true
            });
          }}
        >
          <Image
            style={{ height: 50, width: 50 }}
            source={require("../resources/images/plusSignMinimal.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    flexDirection: "row",
    padding: 15,
    paddingBottom: 0,
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    fontSize: 25,
    fontWeight: "700",
    alignItems: "center",
    justifyContent: "center",
    color: "#333333"
  },
  date: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#555555"
  },
  separator: {
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    color: "#555555",
    marginLeft: 5,
    marginRight: 5
  },
  addFormWrapper: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10
  },
  defaultText: {
    flex: 1,
    color: "#555555",
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  history: {
    alignItems: "center",
    padding: 10
  },
  modalContainer: {
    flex: 0.75,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "stretch"
  },
  modalCardContainer: {
    height: 50,
    borderWidth: 1,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalCardWrapper: {
    borderColor: "#e2e2e2",
    borderRadius: 3,
    marginTop: 9
  },
  modalHeader: {
    height: 75,
    justifyContent: "center"
  },
  modalBody: {
    flex: 1,
    alignItems: "stretch"
  },
  modalHeaderText: {
    fontWeight: "100",
    fontSize: 35,
    textAlign: "center"
  },
  modalCardHeaderText: {
    fontWeight: "100",
    fontSize: 18,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e5e5"
  },
  lightShadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#808080",
    shadowOpacity: 0.2
  },
  darkShadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#808080",
    shadowOpacity: 0.2
  },
  calendar: {},
  addButton: {
    position: "absolute",
    top: 30,
    right: 15
  },
  calendarContainer: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5"
  }
});

export default MedicineView;
