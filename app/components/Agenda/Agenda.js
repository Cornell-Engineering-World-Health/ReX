import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Picker,
  Image
} from "react-native";
import Card from "../Card/Card.js";
import { COLOR, IMAGES } from "../../resources/constants";
import Modal from "react-native-modal";
import { asyncDeleteEvent } from "../../databaseUtil/databaseUtil";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

const numericMetaInfo = [
  ["rgb(140, 234, 255)", "No Pain"],
  ["rgb(105, 183, 140)", "Minimal"],
  ["rgb(122, 208, 105)", "Mild"],
  ["rgb(155, 232, 77)", "Uncomfortable"],
  ["rgb(195, 237, 71)", "Moderate"],
  ["rgb(240, 196, 46)", "Distracting"],
  ["rgb(233, 161, 38)", "Distressing"],
  ["rgb(226, 114, 38)", "Unmanageable"],
  ["rgb(221, 63, 31)", "Intense"],
  ["rgb(187, 1, 1)", "Severe"],
  ["rgb(125, 1, 1)", "Unable to Move"]
];

class Agenda extends Component {
  static propTypes = {
    onPressAgenda: PropTypes.func,
    refreshCalendar: PropTypes.func,
    agendaInfo: PropTypes.array,
    date: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      expandVisible: false,
      editVisible: false,
      durationVisible: false,
      agendaInfo: [],
      currentCard: {note1: ":  0"},
      currentCardTitle: "",
      selected: 0,
      duration: "N/A",
      hourChoice: 0,
      minuteChoice: 0,
      other: "",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.agendaInfo != nextProps.agendaInfo) {
      this.setState({ agendaInfo: nextProps.agendaInfo });
    }
    return true;
  }

  _keyExtractor = (item, index) => item.id;

  // _onSubmit = () => {
  //   asyncCreateSymptomLogEvent(event_type_id, values, timestamp);
  // }

  /**
   * renders agenda
   */
  _renderAgenda() {
    if (this.props.agendaInfo && this.props.agendaInfo.length != 0) {
      return (
        <FlatList
          data={this.props.agendaInfo}
          keyExtractor={item => "" + item.id}
          renderItem={({ item, index }) => {
            return (
              <Card
                medicineNote={item.medicineNote}
                image={item.image}
                title={item.title}
                cardData={item.cardData}
                timeStamp={item.timeStamp}
                note1={item.note1}
                note2={item.note2}
                note3= {item.note3}
                backgroundColor={item.backgroundColor}
                swiperActive={true}
                buttonActive={!this.state.expandVisible}
                iconName={item.iconName}
                buttonsRight={[
                  {
                    text: "Edit",
                    type: "edit",
                    onPress: () => {
                      console.log(item)
                      let intense = item.note1
                      let duration = item.note2
                      let currentIntensity = intense.slice(intense.indexOf(":")+2)
                      let currentDuration = duration.slice(duration.indexOf(":")+2)

                      if (currentIntensity !== "N/A"){
                        this.setState({ selected: parseInt(currentIntensity) })
                      }
                      this.setState({ duration: currentDuration })
                      this.props.refreshCalendar();
                      this.setState({ editVisible: true })
                    }
                  },
                  {
                    text: "Delete",
                    type: "delete",
                    onPress: () => {
                      asyncDeleteEvent(item.id);
                      this.props.refreshCalendar();
                    }
                  }
                ]}
                buttonsLeft={item.buttonsLeft}
                onCloseSwipeout={this._onClose}
                onPress={this.props.onPressAgenda}
              />
            );
          }}
        />
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            No symptoms logged for today!
          </Text>
        </View>
      );
    }
  }

  _renderTimePicker() {
    const MAX_HOURS = 48;
    let hours_arr = [];
    let mins_arr = [];
    for (var x = 0; x < MAX_HOURS; x++) {
      hours_arr.push(<Picker.Item key={x} label={x + ''} value={x} />);
    }

    for (var y = 0; y < 60; y += 5) {
      mins_arr.push(<Picker.Item key={y} label={y + ''} value={y} />);
    }

    return (
      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.hourChoice}
          onValueChange={val => {
            this.setState({ hourChoice: val });
          }}
        >
          {hours_arr}
        </Picker>
        <Text>Hours</Text>
        <Picker
          style={styles.pickerStyle}
          selectedValue={this.state.minuteChoice}
          onValueChange={val => {
            this.setState({ minuteChoice: val });
          }}
        >
          {mins_arr}
        </Picker>
        <Text> Minutes </Text>
      </View>
    );
  }

  _renderDurationPicker() {
    return (
      <Modal
      isVisible={this.state.durationVisible}
      animationInTiming={500}
      animationOutTiming={500}
      onBackdropPress={() => {
        this.setState({ durationVisible: false });
      }}
      style={styles.smallModal}
    >
      <View
        style={{
          flex: 0.35,
          backgroundColor: '#ffffff'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.modalSubmitButton, { borderRightWidth: 1 }]}
            onPress={() => {
              this.setState({ durationVisible: false });
              // this.handleMoreSpecificChange();
            }}
            alignItems="center"
          >
            <Text style={styles.text}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalSubmitButton}
            onPress={() => {
              this.setState({ durationVisible: false });
            }}
            alignItems="center"
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {this._renderTimePicker()}
      </View>
    </Modal>
    )
  }

  _renderDuration() {
    return (
      <View>
      <View style = {{alignItems: "center", marginBottom: 10}}>
      <Text style={[styles.summaryText, {fontSize:20}]}>Duration</Text>
      </View>
      <TouchableOpacity
      onPress = {() => {
        this.setState({ durationVisible: true });
      }}
      style={{alignItems: "stretch"}}
      >
          <View
          style={[
            styles.intensityLabelContainer,
            {
              backgroundColor: "transparent",
              borderWidth: 5,
              borderColor: numericMetaInfo[0][0]
            }
          ]}
        >
          <Text style={styles.intensityLabel}>
            {this.state.duration}
          </Text>
        </View>
      </TouchableOpacity>
      {this._renderDurationPicker()}
      </View>
      )
  }

  _renderIntensity() {
    let body = null;
    body = ([0,1,2,3,4,5,6,7,8,9,10]).map((option, i, arr) => {

      return (
        <View key={i} style={{paddingLeft: 2}}>
        <TouchableOpacity
          onPress={() => {
            this.setState({ selected: i });
          }}
          style={[
            styles.button,
            {
              borderRadius: 2,
              backgroundColor: numericMetaInfo[i],
              height: 30,
              width: 30
            }
          ]}
        >
          <Text style={[styles.buttonText]}>{i}</Text>
        </TouchableOpacity>
        </View>
      );
    });

    return (
    <View>
    <View style = {{alignItems: "center", marginBottom: 10}}>
    <Text style={[styles.summaryText, {fontSize:20}]}>Intensity</Text>
    </View>
    <View style={{alignItems: "stretch"}}>
        <View style={styles.body}>{body}</View>
        {console.log(this.state.selected)}
        <View
        style={[
          styles.intensityLabelContainer,
          {
            backgroundColor: numericMetaInfo[this.state.selected][0]
          }
        ]}
      >
        <Text style={styles.intensityLabel}>
          {numericMetaInfo[this.state.selected][1]}
        </Text>
      </View>
    </View>
    </View>
    )
  }

  render() {
    let page = this._renderAgenda();
    let modalPage = page;
    let renderExpandButton = null;

    if (this.state.expandVisible) {
      page = null;
    }
    if (this.props.agendaInfo) {
      renderExpandButton = (
        <TouchableOpacity
          onPress={() => this.setState({ expandVisible: true })}
        >
          <Image source={IMAGES.expand} style={styles.expandStyle} />
        </TouchableOpacity>
      );
    }
    return (
      <View style={{ marginLeft: 5, flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text style={styles.summaryText}>Summary</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.dateText}>{this.props.date}</Text>
            {renderExpandButton}
          </View>
        </View>
        <View style={{ flex: 1 }}>{page}</View>
        <Modal
          onBackdropPress={() => this.setState({ expandVisible: false })}
          isVisible={this.state.expandVisible}
          style={styles.modalStyle}
          backdropOpacity={0.8}
          animationOutTiming={300}
          animationInTiming={300}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text style={styles.summaryText}>Summary</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", height: 50 }}
            >
              <Text style={styles.summaryText}>{this.props.date}</Text>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "stretch" }}>{modalPage}</View>
          <TouchableOpacity
            onPress={() => this.setState({ expandVisible: false })}
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              padding: 5,
              alignSelf: "center",
              transform: [{ rotate: "-90deg" }]
            }}
          >
            <Image
              source={IMAGES.headerBack}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </Modal>
        <Modal
          isVisible={this.state.editVisible}
          style={styles.modalStyle}
          backdropOpacity={0.8}
          animationOutTiming={300}
          animationInTiming={300}
        >
        <View style={{
              justifyContent: "center",
              flexDirection: "row",
              flex: 1,
            }}>
        <Text style={styles.summaryText}>Edit: {this.state.currentCardTitle}</Text>
        </View>
        <View style={{
          flex: 1,
          alignItems: "stretch",
        }}>
        {this._renderDuration()}
        </View>
        <View style={{
          flex: 1,
          alignItems: "stretch",
        }}>
        {this._renderIntensity()}
        </View>
          <View style={styles.submitWrapper}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.setState({ editVisible: false })}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalStyle: {
    flex: 1
  },
  modalSubmitButton: {
    width: viewportWidth / 2,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aedfe1'
  },
  expandStyle: {
    width: 25,
    height: 25,
    resizeMode: "cover"
  },
  summaryText: {
    fontSize: 25,
    fontWeight: "400",
    letterSpacing: 1.0,
    color: COLOR.summaryGray,
    marginLeft: 10
  },
  dateText: {
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 1.0,
    color: COLOR.cardNotes,
    marginRight: 3
  },
  body: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch"
  },
  button: {
    padding: 0,
    borderRadius: 50,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  intensityLabelContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  intensityLabel: {
    fontSize: 25,
    fontWeight: "200",
    color: "white"
  },
  text: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 15
  },
  pickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  pickerStyle: {
    flex: 1
  },
  submitButton: {
    width: 200,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aedfe1"
  },
  submitWrapper: {
    padding: 20,
    alignItems: "center"
  },
});

export default Agenda;
