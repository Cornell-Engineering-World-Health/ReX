import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  FlatList,
  Alert
} from "react-native";
import Moment from "moment";
import { LinearGradient } from 'expo-linear-gradient';
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";
import Modal from "react-native-modal";

import {
  pullAllMedicineData,
  asyncDeleteMedicine
} from "../databaseUtil/databaseUtil";
import { COLOR } from "../resources/constants.js";
import {
  setMassNotification,
  cancelMassNotification
} from "../components/PushController/PushController.js";
/*
Allows users to edit medicine
*/
export default class MedicineSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      medicine: [], // array of medicine objects from the database
      modalOpen: false,
      selectedMedicineIndex: -1
    };
  }

  componentDidMount() {
    let medicineData = [];
    let seen = {};
    //fill medicine state with those from the database
    pullAllMedicineData(formattedData => {
      formattedData.forEach(function (med) {
        var medObj = JSON.parse(med.fields);

        if (seen[medObj["Pill Name"]]) {
          return;
        }

        console.log("med obj", medObj);

        var formattedTimes = medObj["Time"].map(
          t => Moment().format("MMMM DD YYYY") + " " + t
        );
        console.log(medObj);
        medicineData.push({
          name: medObj["Pill Name"],
          time: formattedTimes,
          timeVal: medObj["Time"].join(", "),
          dosage: medObj["Dosage"],
          statuses: medObj["Taken"],
          status: medObj["Notification On"],
          startDate: medObj["Start Date"],
          endDate: medObj["End Date"]
        });
        seen[medObj["Pill Name"]] = true;
      });
      this.setState({ medicine: medicineData });
    });
  }

  _keyExtractor = (item, index) => "" + index;

  /*
    Handles turning on/off notifications for each medicineData
  */
  _handleToggle(index) {
    let data = this.state.medicine;
    data[index].status = !data[index].status;
    let name = data[index].name;
    let dosage = data[index].dosage;
    let times = data[index].time.map(t => Moment(new Date(t)).format("HH:mm"));
    if (data[index].status) {
      //turned ON
      //console.log("ON!");

      setMassNotification(
        new Date(data[index].startDate),
        new Date(data[index].endDate),
        name,
        dosage,
        times
      );
    } else {
      cancelMassNotification(
        new Date(data[index].startDate),
        new Date(data[index].endDate),
        name,
        dosage,
        times
      );
    }
    this.setState({ medicine: data });
  }

  /*
    Exit modal after submitting the form
  */
  _modalSubmit() {
    this.setState({ modalOpen: false });
  }

  //must include index of item to delete
  _deleteMedicine() {
    data = this.state.medicine;
    let [med] = data.splice(this.state.selectedMedicineIndex, 1);

    let times = med.time.map(t => Moment(new Date(t)).format("HH:mm"));

    asyncDeleteMedicine(med.name);
    cancelMassNotification(
      new Date(med.startDate),
      new Date(med.endDate),
      med.name,
      med.dosage,
      times
    );

    this.setState({ modalOpen: false, medicine: data });
  }

  //renders card for flatlist
  _renderCard({ item, index }) {
    return (
      <Card
        title={item.name}
        status={item.status}
        onSwitch={() => {
          this._handleToggle(index);
        }}
        key={index}
        onPress={() =>
          this.setState({ modalOpen: true, selectedMedicineIndex: index })
        }
      />
    );
  }

  /*
    If there are no medicines in the database, log a friendly message
    Ex)
    "You haven't set up any medication reminders! Go to the medicine page add one."
  */
  _renderBody() {
    if (this.state.medicine && this.state.medicine.length == 0) {
      //there are no medications in the db
      return (
        <View style={styles.noMedicineBody}>
          <Text style={styles.noMedicineWarning1}>
            You haven't set up any medication reminders!
          </Text>
          <Text style={styles.noMedicineWarning2}>
            Go to the medicine page and add one.
          </Text>
        </View>
      );
    } else {
      //there are medications to render
      return (
        <View style={styles.body}>
          <Text style={styles.notificationText}>Allow Notifications</Text>
          <FlatList
            data={this.state.medicine}
            extraData={this.state}
            renderItem={data => this._renderCard(data)}
            keyExtractor={this._keyExtractor}
          />
          <ModalCard
            data={this.state.medicine[this.state.selectedMedicineIndex]}
            index={this.state.selectedMedicineIndex}
            isOpen={this.state.modalOpen}
            onDelete={() => {
              this._deleteMedicine();
            }}
            exitModal={() => this.setState({ modalOpen: false })}
            modalSubmit={() => this._modalSubmit()}
            onChangeDosage={dose => this._onChangeDosage(dose)}
            onNotificationToggle={() =>
              this._handleToggle(this.state.selectedMedicineIndex)
            }
          />
        </View>
      );
    }
  }

  render() {
    return (
      <LinearGradient
        colors={[COLOR.purple + "80", "white"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }}
        style={styles.container}
      >
        <View style={styles.header}>
          <NavigationHeader
            title={"Medicine Settings"}
            onPressBack={() => this.props.goBack()}
          />
        </View>
        {this._renderBody()}
      </LinearGradient>
    );
  }
}
/*
Creates a card that has a toggle button and cardTitle

Props:
title --> string
status --> boolean
onPress --> function
*/
const Card = props => {
  return (
    <View style={[styles.cardWrapper]}>
      <View style={[styles.cardContainer, styles.darkShadow]}>
        <TouchableOpacity onPress={props.onPress} style={styles.cardButton}>
          <Text style={styles.cardTitle}>{props.title}</Text>
        </TouchableOpacity>
        <View style={styles.cardSwitch}>
          <Switch value={props.status} onValueChange={props.onSwitch} />
        </View>
      </View>
    </View>
  );
};
/*
Props
isOpen --> function
title --> String
onDelete --> function
*/
const ModalCard = props => {
  return (
    <Modal
      isVisible={props.isOpen}
      style={styles.modal}
      onBackdropPress={() => {
        props.exitModal();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>
            {props.data ? props.data.name : null}
          </Text>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.modalDosageContainer}>
            <Text style={styles.modalDosage}>Dosage:</Text>
            <Text style={styles.modalDosage}>
              {props.data ? props.data.dosage.toString() : null}
            </Text>
          </View>
          <ModalBody
            title={"Start Date"}
            data={
              props.data
                ? Moment(props.data.startDate).format("MM/DD/YY")
                : null
            }
          />
          <ModalBody
            title={"End Date"}
            data={
              props.data ? Moment(props.data.endDate).format("MM/DD/YY") : null
            }
          />
          <ModalBody
            title={"Set times"}
            data={props.data ? props.data.timeVal : null}
          />
          <View style={styles.modalNotificationContainer}>
            <View>
              <Text style={styles.modalNotification}>Allow Notifications:</Text>
            </View>
            <View>
              <Switch
                value={props.data ? props.data.status : null}
                onValueChange={props.onNotificationToggle}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.modalSubmitButtonWrapper}>
            <TouchableOpacity
              onPress={props.modalSubmit}
              style={[styles.modalButton, { backgroundColor: "#34ace7" }]}
            >
              <Text style={styles.modalButtonText}>Return</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalDeleteButtonWrapper}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Watch out!",
                  "Are you sure you want to delete this medicine?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => props.onDelete() }
                  ],
                  { cancelable: false }
                )
              }
              style={[styles.modalButton, { backgroundColor: "#fa4b12" }]}
            >
              <Text style={[styles.modalButtonText, { color: "white" }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ModalBody = props => {
  return (
    <View style={styles.modalDosageContainer}>
      <Text style={styles.modalDosage}>{props.title}</Text>
      <Text style={styles.modalDosage}>{props.data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 5
  },
  body: {
    flex: 1
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
  header: {
    flex: 0.25,
    justifyContent: "center"
  },
  headerText: {
    fontSize: 40,
    fontWeight: "200"
  },
  cardWrapper: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  cardContainer: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    alignItems: "center"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "200",
    padding: 10
  },
  notificationText: {
    textAlign: "right",
    paddingRight: 10,
    paddingBottom: 10
  },
  cardButton: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  modal: {
    flex: 1,
    justifyContent: "center"
  },
  modalContainer: {
    flex: 0.6,
    backgroundColor: "white",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10
  },
  modalHeaderText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "200"
  },
  modalButton: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  modalDeleteButtonWrapper: {
    padding: 5,
    borderRadius: 10,
    flex: 1
  },
  modalButtonText: {
    fontSize: 25,
    fontWeight: "200"
  },
  modalSubmitButtonWrapper: {
    padding: 5,
    borderRadius: 10,
    flex: 1
  },
  modalHeader: {
    flex: 0.2
  },
  footer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalBody: {
    flex: 0.6,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  modalDosageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalNotificationContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  modalDosage: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "200"
  },
  modalNotification: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "200"
  },
  textInputWrapper: {
    flex: 1
  },
  noMedicineWarning1: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "100",
    paddingBottom: 20
  },
  noMedicineWarning2: {
    paddingTop: 10,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "300"
  },
  noMedicineBody: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  }
});
