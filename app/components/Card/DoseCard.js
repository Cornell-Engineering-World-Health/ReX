import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { databaseTakeMedicine } from "../../databaseUtil/databaseUtil";
import Timeline from "react-native-timeline-listview";

var background = ["#ffffff", "#ecfaf7", "#fcf0f2"];
var border = ["#ffffff", "#7fdecb", "#f8ced5"];
var text = ["#aaaaaa", "#373737", "#373737"];

class Card extends PureComponent {
  static propTypes = {
    time: PropTypes.array,
    takenTime: PropTypes.array,
    dosage: PropTypes.string,
    timeStamp: PropTypes.string,
    title: PropTypes.string,
    passed: PropTypes.array,
    buttonsRight: PropTypes.array,
    updateData: PropTypes.func
  };

  constructor(props) {
    super(props);
    // if none are taken or red, will be 0.
    var passed_index = 0;
    if (this.props.passed) {
      for (var x = this.props.passed.length - 1; x >= 0; x--) {
        // hit a taken, next one
        if (this.props.passed[x]) {
          passed_index = x + 1;
          break;
        }
        // first red we see (latest red)
        if (
          this.props.passed[x] == false &&
          this.shouldBeTaken(new Date(this.props.time[x]), new Date()) &&
          !this.shouldBeTakenNow(new Date(this.props.time[x]))
        ) {
          passed_index = x;
          break;
        }
        // if no taken or red, means we havent missed any and have taken some
      }
    }
    this.state = {
      time: this.props.time,
      takenTime: this.props.takenTime,
      passed: this.props.passed,
      passed_index: passed_index,
      backgroundColor: background[passed_index],
      borderColor: border[passed_index],
      textColor: text[passed_index],
      newhours: "hello",
      init_passed: passed_index,
      modalVisible: false,
      data: this.render_timeline()
      // taken: false,
      // hhmm_time: "",
      // newPassed: this.props.passed,
    };
  }

  componentDidMount = () => {
    this._handleRenderText();
  };

  /**
   * Renders the appropriate text, border color, and background color for the DoseCard component given its status"
   * 1) [[x] "hours ago", red, red] -> missed medication
   * 2) ["Take Now", green, green] -> take now medication
   * 3) ["Take in" [x], grey, grey] -> future medication
   * 4) ["Done for the day", grey, grey] -> completed medication
   */
  _handleRenderText = () => {
    var current = new Date(this.state.time[this.state.passed_index]);
    var timeString;
    if (this.state.passed_index >= this.state.passed.length) {
      ind = 0;
      timeString = "Done for the day";
    } else if (this.shouldBeTakenNow(current)) {
      timeString = "Take Now";
      ind = 1;
    } else if (this.shouldBeTaken(current, new Date())) {
      timeString = this.createAgoString(current);
      ind = 2;
    } else {
      timeString = this.createTakeAtString(current);
      ind = 0;
    }
    this.forceUpdate();
    this.setState({
      backgroundColor: background[ind],
      borderColor: border[ind],
      textColor: text[ind],
      newhours: timeString
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  /**
   * Update visual properties and write to database when medication is logged or unlogged from medicine view
   */
  _handleClick = () => {
    that = this;

    var thisMed = new Date(this.state.time[this.state.passed_index]);
    var newPassed = this.state.passed;
    var newInd = 0;
    var tempData = this.state.data;

    // can click forward, it you are clicking a red time that you need to take, must go forward
    if (this.shouldBeTaken(thisMed, new Date())) {
      newPassed[this.state.passed_index] = true;
      newInd = this.state.passed_index + 1;

      var taken_string = this.createTakenString(new Date());
      tempData[this.state.passed_index].title = taken_string;
      tempData[this.state.passed_index].circleColor = border[1];

      let hhmm_time = new Date(this.props.time[this.state.passed_index])
        .toTimeString()
        .substring(0, 5);
      databaseTakeMedicine(
        new Date(),
        this.props.title,
        this.props.dosage,
        hhmm_time,
        true,
        this.state.passed_index
      );
      this.setState(
        {
          passed_index: newInd,
          passed: newPassed,
          data: tempData
        },
        () => {
          that._handleRenderText();
        }
      );

      // can click backward
    } else if (
      newPassed.length > 0 &&
      this.state.passed_index > this.state.init_passed
    ) {
      var taken_string = "Not taken";
      newPassed[this.state.passed_index - 1] = false;
      var circleColor = border[1];
      let hhmm_time = new Date(this.props.time[this.state.passed_index - 1])
        .toTimeString()
        .substring(0, 5);
      databaseTakeMedicine(
        new Date(),
        this.props.title,
        this.props.dosage,
        hhmm_time,
        false,
        this.state.passed_index - 1
      );

      if (
        this.shouldBeTaken(
          new Date(this.state.time[this.state.passed_index - 1]),
          new Date()
        )
      ) {
        circleColor = "#fa8b89";
        taken_string = "Missed";
      } else {
        circleColor = "#cccccc";
      }
      tempData[this.state.passed_index - 1].title = taken_string;
      tempData[this.state.passed_index - 1].circleColor = circleColor;
      this.setState(
        {
          passed_index: this.state.passed_index - 1,
          passed: newPassed,
          data: tempData
        },
        () => {
          that._handleRenderText();
        }
      );
    } else {
      this._handleRenderText();
    }
  };

  /**
   * Update visual properties and write to database when medication is logged from the modal view for each DoseCard component
   * Requirement: medicine cannot be unlogged from the modal view
   */
  _handleModalPress = data => {
    index = data.index;
    var tempData = this.state.data;
    // if green or red
    if (
      this.shouldBeTaken(new Date(this.state.time[index]), new Date()) &&
      !this.state.passed[index]
    ) {
      // checks green for taken

      tempData[index].circleColor = border[1];
      tempData[index].title = this.createTakenString(new Date());

      var tempPassed = this.state.passed;
      tempPassed[index] = true;

      // only need to change card shown if take the one its currently on
      var tempPassedIndex = this.state.passed_index;
      if (index == this.state.passed_index) {
        tempPassedIndex = this.state.passed_index + 1;
      }
      // record that you took this medicine in the database
      let hhmm_time = new Date(this.props.time[index])
        .toTimeString()
        .substring(0, 5);
      databaseTakeMedicine(
        new Date(),
        this.props.title,
        this.props.dosage,
        hhmm_time,
        true,
        index
      );
      this.setState(
        {
          data: tempData,
          passed: tempPassed,
          passed_index: tempPassedIndex
        },
        () => {
          this._handleRenderText();
        }
      );
    }
  };

  createTimeString = Date => {
    var taken_hours = Date.getHours();
    var taken_mins = Date.getMinutes();
    var am_pm = "AM";
    var min_string = taken_mins.toString();
    if (taken_hours >= 12 && taken_hours != 24) {
      am_pm = "PM";
      if (taken_hours != 12) {
        taken_hours = taken_hours - 12;
      }
    } else if (taken_hours == 0) {
      taken_hours = 12;
    }
    if (taken_mins <= 9) {
      min_string = "0" + min_string;
    }
    return taken_hours.toString() + ":" + min_string + " " + am_pm;
  };

  createTakenString = Date => {
    var taken_hours = Date.getHours();
    var taken_mins = Date.getMinutes();
    var am_pm = "AM";
    var min_string = taken_mins.toString();
    if (taken_hours >= 12 && taken_hours != 24) {
      am_pm = "PM";
      if (taken_hours != 12) {
        taken_hours = taken_hours - 12;
      }
    } else if (taken_hours == 0) {
      taken_hours = 12;
    }

    if (taken_mins <= 9) {
      min_string = "0" + min_string;
    }
    return (
      "Taken at " + taken_hours.toString() + ":" + min_string + " " + am_pm
    );
  };

  createTakeAtString = Date => {
    var curHour = Date.getHours();
    var curMin = Date.getMinutes();
    var numHours;
    if (curHour >= 12) {
      if (curHour == 12) {
        numHours = "Take at " + 12;
      } else {
        numHours = "Take at " + (curHour - 12);
      }
      if (curMin != 0) {
        numHours = numHours + ":" + curMin + " PM";
      } else {
        numHours = numHours + " PM";
      }
    } else {
      if (curHour == 1) {
        numHours = "Take at " + 1;
      } else {
        numHours = "Take at " + (curHour % 12);
      }
      if (curMin != 0) {
        numHours = numHours + ":" + curMin + " AM";
      } else {
        numHours = numHours + " AM";
      }
    }
    return numHours;
  };

  createAgoString = Date1 => {
    var curHour = Date1.getHours();
    var curMin = Date1.getMinutes();
    var today = new Date();
    if (today.getHours() - curHour == 1) {
      numHours = "1 Hour Ago";
    } else if (today.getHours() == curHour) {
      numHours = today.getMinutes() - curMin + " Minutes Ago";
    } else {
      numHours = today.getHours() - curHour + " Hours Ago";
    }
    return numHours;
  };

  shouldBeTaken = (Date1, Date2) => {
    var Date1Sum = Date1.getHours() * 60 + Date1.getMinutes();
    var Date2Sum = Date2.getHours() * 60 + Date2.getMinutes();
    return Date1Sum < Date2Sum + 15;
  };

  shouldBeTakenNow = Date1 => {
    var Date1Sum = Date1.getHours() * 60 + Date1.getMinutes();
    var Date2 = new Date();
    var Date2Sum = Date2.getHours() * 60 + Date2.getMinutes();
    var now = Math.abs(Date1Sum - Date2Sum) < 15;
    return now;
  };

  /**
   * Render Timeline component from within a single DoseCard's modal to display all logging times for single medication
   */
  render_timeline = () => {
    return this.props.time.map((val, i) => {
      var d = new Date();
      d.setHours(this.props.takenTime[i].substring(0, 2));
      d.setMinutes(this.props.takenTime[i].substring(3, 5));
      var hour_string = this.createTimeString(new Date(val));
      var circol;
      var taken_string = "Not taken";
      if (this.props.takenTime[i] != "") {
        taken_string = this.createTakenString(d);
      }
      if (this.props.passed[i]) {
        circol = border[1];
        taken_string = this.createTakenString(d);
      } else if (
        !this.props.passed[i] &&
        this.shouldBeTaken(new Date(val), new Date())
      ) {
        circol = "#fa8b89";
        taken_string = "Missed";
      } else {
        circol = "#cccccc";
        taken_string = "Not taken";
      }
      return {
        time: hour_string,
        description: hour_string,
        title: taken_string,
        circleColor: circol,
        index: i
      };
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          disabled={!this.props.buttonActive}
          onPress={() => this.props.onPress(time)}
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                flex: 1
              }
            ]}
          >
            <View style={styles.descriptionContainer}>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={[styles.titleText, { color: this.state.textColor }]}
                >
                  {this.props.title}
                </Text>
                <Text style={{ color: this.state.textColor }}>
                  {this.props.dosage}
                </Text>
              </View>
              <TouchableOpacity
                onPress={this._handleClick}
                style={{ flex: 1, alignItems: "flex-end" }}
              >
                <View flexDirection="row" marginTop={7}>
                  <Text style={{ fontSize: 14, color: this.state.textColor }}>
                    {" "}
                    {this.state.newhours}{" "}
                  </Text>
                  <TouchableOpacity
                    style={styles.more}
                    onPress={() => {
                      this.setState({
                        modalVisible: true
                      });
                    }}
                  >
                    <Image
                      source={require("../../resources/images/smalldot.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15 }} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.modalVisible}
          style={styles.modalWrapper}
          onBackdropPress={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 5,
              flex: this.state.passed.length * 0.15
            }}
          >
            <Text
              style={[styles.titleText, { color: text[2], paddingBottom: 15 }]}
            >
              {this.props.title}
            </Text>
            <Timeline
              lineColor="#575757"
              data={this.state.data}
              lineWidth={1}
              circleSize={18}
              showTime={false}
              // columnFormat = 'single-column-format'
              // descriptionStyle = {{color: 'gray'}}
              titleStyle={{ color: "#aaaaaa", fontSize: 12 }}
              detailContainerStyle={{ paddingTop: 0 }}
              onEventPress={this._handleModalPress}
              // renderDetail = {() => this.rerender_detail}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderRadius: 5
  },
  modalwrapper: {
    flexDirection: "row"
  },
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ecfaf7",
    borderColor: "#7fdecb",
    borderWidth: 2
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  titleText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#373737"
  },
  modaltitleText: {
    fontWeight: "600",
    fontSize: 22,
    color: "#373737",
    marginBottom: 10
  },
  timeContainer: {
    marginTop: 1.5,
    paddingTop: 15,
    flex: 0.6,
    marginRight: 10,
    alignItems: "flex-end",
    backgroundColor: "transparent"
  },
  timeStamp: {
    fontSize: 16,
    color: "#373737",
    fontWeight: "600",
    letterSpacing: 0.6
  },
  image_style: {
    height: 20,
    width: 20
  },
  note: {
    flexDirection: "row",
    alignItems: "center"
  },
  noteText: {
    color: "#373737",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 1.0
  },
  check: {
    backgroundColor: "#00000000",
    borderRadius: 0,
    borderColor: "white",
    marginLeft: 0,
    marginRight: 0,
    padding: 0
  },
  swipe: {
    borderRadius: 10
  },
  modalButton: {
    backgroundColor: "#A0A0A0",
    fontSize: 20,
    marginLeft: 30,
    marginRight: 30
  },
  modalWrapper: {
    flex: 1.0,
    alignItems: "stretch",
    justifyContent: "center"
  },
  more: {
    width: 30,
    padding: 0,
    margin: 0
  }
});
