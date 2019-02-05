import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
  Picker,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { TextField } from "react-native-material-textfield";
import Modal from "react-native-modal";
import moment from "moment";
import { profile_icons, IMAGES, COLOR } from "../resources/constants";

const AVATAR_ID = "avatarID";
const HEIGHT_ID = "heightID";
const WEIGHT_ID = "weightID";
const EDIT_ID = "editID";
const BIRTHDAY_ID = "birthdayID";

export default class Profile extends Component {
  static propTypes = {
    navigator: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);

    this.state = {
      choosingAvatar: false,
      modalID: "",
      tempBirthday: props.birthday ? props.birthday : new Date()
    };
  }

  _renderHeader() {
    if (!this.state.choosingAvatar) {
      return (
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ choosingAvatar: true });
            }}
          >
            <Image
              style={styles.profileImageStyle}
              source={profile_icons[this.props.icon]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ choosingAvatar: true });
            }}
          >
            <Text style={styles.profileHeaderSubText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={{
            alignItems: "center"
          }}
        >
          <FlatList
            style={{ height: 100, overflow: "hidden" }}
            horizontal={true}
            data={profile_icons}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.settingsUpdate("icon", Math.trunc(index) + "");
                    this.setState({
                      choosingAvatar: false
                    });
                  }}
                  style={{ height: 100 }}
                >
                  <Image
                    style={styles.profileImageStyle}
                    source={profile_icons[index]}
                  />
                </TouchableOpacity>
              );
            }}
          />
          <Text style={styles.profileHeaderSubText}>Pick your Avatar!</Text>
        </View>
      );
    }
  }

  render() {
    let header = this._renderHeader();
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          {!this.state.choosingAvatar && this.props.isInModal ? (
            <TouchableOpacity
              style={styles.menuButtonWrapper}
              onPress={this.props.exitModal}
            >
              <Image
                source={IMAGES.headerBack}
                style={styles.menuImageStyle}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          ) : null}
          {header}
        </View>
        <View style={styles.form}>
          <ScrollView>
            <View style={styles.profileBody}>
              <TextField
                label={"Name"}
                value={this.props.name}
                onChangeText={name => {
                  this.props.settingsUpdate("name", name);
                }}
                baseColor={this.props.baseColor}
                textColor={this.props.textColor}
              />
              <TextField
                label={"Doctor's Email"}
                value={this.props.email}
                autoCapitalize={"none"}
                onChangeText={email => {
                  this.props.settingsUpdate("email", email);
                }}
                baseColor={this.props.baseColor}
                textColor={this.props.textColor}
                ref={function(emailRef) {
                  this.emailRef = emailRef;
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalID: BIRTHDAY_ID });
                  if (this.emailRef) {
                    this.emailRef.blur();
                  }
                }}
              >
                <TextField
                  editable={false}
                  pointerEvents={"none"}
                  label={"Birthday"}
                  value={
                    !this.props.birthday
                      ? ""
                      : this.props.birthday.toLocaleDateString()
                  }
                  baseColor={this.props.baseColor}
                  textColor={this.props.textColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalID: HEIGHT_ID });
                  this.props.settingsUpdate("height_feet", 4);
                  this.props.settingsUpdate("height_inches", 1);
                }}
              >
                <TextField
                  editable={false}
                  pointerEvents={"none"}
                  label={"Height"}
                  value={
                    this.props.height_feet != "" &&
                    this.props.height_inches != ""
                      ? this.props.height_feet +
                        " ft " +
                        this.props.height_inches +
                        " in"
                      : ""
                  }
                  baseColor={this.props.baseColor}
                  textColor={this.props.textColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalID: WEIGHT_ID });
                }}
              >
                <TextField
                  editable={false}
                  pointerEvents={"none"}
                  label={"Weight"}
                  value={
                    this.props.weight != "" ? this.props.weight + " lbs" : ""
                  }
                  baseColor={this.props.baseColor}
                  textColor={this.props.textColor}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {this.props.isInModal ? (
          <View style={styles.submitWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.exitModal();
              }}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <Modal
          isVisible={this.state.modalID == HEIGHT_ID}
          animationInTiming={500}
          animationOutTiming={500}
          onBackdropPress={() => {
            this.setState({ modalID: "" });
          }}
          onSwipe={() => {
            this.setState({ modalID: "" });
          }}
          swipDirection={"down"}
          style={styles.modal}
        >
          <View style={styles.modalWrapper}>
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={() => {
                this.setState({ modalID: "" });
              }}
            >
              <Text style={styles.text}>Enter Your Height</Text>
            </TouchableOpacity>
            <View style={styles.pickerWrapper}>
              <Picker
                style={styles.picker}
                selectedValue={this.props.height_feet}
                onValueChange={itemValue => {
                  this.props.settingsUpdate("height_feet", itemValue);
                }}
              >
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
              </Picker>
              <Text style={styles.pickerLabel}> feet</Text>
              <View style={{ marginLeft: 40 }} />
              <Picker
                style={styles.picker}
                selectedValue={this.props.height_inches}
                onValueChange={itemValue => {
                  this.props.settingsUpdate("height_inches", itemValue);
                }}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
              </Picker>
              <Text style={styles.pickerLabel}>in</Text>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.modalID == BIRTHDAY_ID}
          animationInTiming={500}
          animationOutTiming={500}
          onBackdropPress={() => {
            this.setState({ modalID: "" });
            this.props.settingsUpdate("birthday", this.state.tempBirthday);
          }}
          swipDirection={"down"}
          style={styles.modal}
        >
          <View
            style={{
              flex: 0.35,
              backgroundColor: "#ffffff"
            }}
          >
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={() => {
                this.setState({ modalID: "" });
                this.props.settingsUpdate("birthday", this.state.tempBirthday);
              }}
              alignItems="center"
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            <DatePickerIOS
              style={{ height: 44 }}
              itemStyle={{ height: 44 }}
              mode="date"
              date={this.state.tempBirthday}
              onDateChange={value => {
                this.setState({ tempBirthday: value });
              }}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.modalID == WEIGHT_ID}
          onBackdropPress={() => {
            this.setState({ modalID: "" });
          }}
          onSwipe={() => {
            this.setState({ modalID: "" });
          }}
          swipDirection={"down"}
          animationInTiming={500}
          animationOutTiming={500}
          style={{
            justifyContent: "flex-end",
            margin: 0
          }}
          style={styles.modal}
        >
          <KeyboardAvoidingView
            behavior={"padding"}
            style={styles.modalWrapper}
          >
            <TouchableOpacity
              style={styles.modalSubmitButton}
              onPress={() => {
                this.setState({ modalID: "" });
              }}
              alignItems="center"
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            <TextInput
              keyboardType="numeric"
              textAlign="center"
              style={{ fontSize: 35 }}
              placeholder="Enter Weight in lbs"
              onChangeText={weight => {
                this.props.settingsUpdate("weight", weight);
              }}
            />
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 0.75
  },
  headerWrapper: {
    flex: 0.25,
    justifyContent: "center",
    alignItems: "center"
  },
  pickerLabel: {
    fontSize: 23
  },
  profileHeaderSubText: {
    fontSize: 15,
    color: "#71d7fc"
  },
  profileBody: {
    marginLeft: 25,
    marginRight: 25
  },
  container: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    borderRadius: 20
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 7
  },
  imageStyle: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "center",
    height: 55,
    width: 55
  },
  placeholder: {
    color: "#bbbbbb"
  },
  picker: {
    width: 100
  },
  pickerWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  titleInfoStyle: {
    fontSize: 16,
    color: "#8e8e93"
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalWrapper: {
    flex: 0.35,
    backgroundColor: "#ffffff",
    alignItems: "center"
  },
  contain: {
    flex: 1,
    justifyContent: "center"
  },
  modalSubmitButton: {
    width: Dimensions.get("window").width,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aedfe1"
  },
  text: {
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontSize: 15
  },
  button: {
    width: 200,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aedfe1"
  },
  profileContainerStyles: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  submitWrapper: {
    padding: 20,
    alignItems: "center"
  },
  menuImageStyle: {
    width: 30,
    height: 30
  },
  menuButtonWrapper: {
    padding: 15,
    position: "absolute",
    left: 0
  },
  profileImageStyle: {
    width: 90,
    height: 90,
    margin: 8
  }
});
