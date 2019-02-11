import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  Image,
  NavigatorIOS,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Modal from "react-native-modal";
import SettingsList from "react-native-settings-list";
import Profile from "./EditProfile";
import Trends from "./Trends";
import MedicineSettings from "./MedicineSettings";
import { sendMail } from "../components/Mail/MailController";
import {
  exportSymptomsMailFunc,
  exportMedicationsMailFunc
} from "../mailUtil/mailUtil.js";
import {
  asyncSettingUpdate,
  pullSettingsFromDatabase
} from "../databaseUtil/databaseUtil";
import { profile_icons, IMAGES, COLOR } from "../resources/constants";

let modal_ids = ["edit", "export"];

class Settings extends Component {
  static propTypes = {
    navigator: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      switchValue: false,
      name: "Name unknown",
      weight: "Weight unknown",
      birthday: new Date(),
      height_feet: "",
      height_inches: "",
      height: "Height unknown",
      icon: "0",
      email: "Doctor's email unkown",
      modalVisible: ""
    };
  }

  settingsUpdate(setting, value) {
    switch (setting) {
      case "name":
        this.setState({ name: value });
        break;
      case "weight":
        this.setState({ weight: value });
        break;
      case "birthday":
        this.setState({ birthday: value });
        break;
      case "height_feet":
        this.setState({
          height_feet: value,
          height: value + " ft " + this.state.height_inches + " in"
        });
        break;
      case "height_inches":
        this.setState({
          height_inches: value,
          height: this.state.height_feet + " ft " + value + " in"
        });
        break;
      case "icon":
        this.setState({ icon: value });
        break;
      case "email":
        this.setState({ email: value });
        break;
    }

    asyncSettingUpdate(setting, value);
  }

  componentDidMount() {
    pullSettingsFromDatabase(data => {
      this.setState({
        weight: data.weight,
        birthday: new Date(data.birthday),
        name: data.name,
        height_feet: data.height_feet,
        height_inches: data.height_inches,
        height: data.height_feet + "' " + data.height_inches + '" ',
        icon: data.icon,
        email: data.email
      });
    });
  }

  render() {
    var bgColor = "#DCE3F4";

    return (
      <View style={styles.container}>
        <View
          style={{
            borderBottomWidth: 1,
            backgroundColor: "#f7f7f8",
            borderColor: "#c8c7cc"
          }}
        >
          <Text
            style={{
              alignSelf: "flex-start",
              marginTop: 35,
              marginLeft: 20,
              marginBottom: 10,
              fontWeight: "bold",
              fontSize: 35
            }}
          >
            Settings
          </Text>
        </View>
        <View style={styles.container}>
          <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={100}
                  width={100}
                  resizeMode="cover"
                  source={profile_icons[this.state.icon]}
                />
              }
              hasNavArrow={false}
              title={this.state.name}
              titleInfo={"Edit" + "\n" + "Profile"}
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
              onPress={() => {
                this.setState({ modalVisible: modal_ids[0] });
              }}
            />
            <SettingsList.Header headerStyle={{ marginTop: 10 }} />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={50}
                  resizeMode="contain"
                  source={IMAGES.view}
                />
              }
              title="View History"
              hasNavArrow={true}
              onPress={() => {}}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => {
                this.props.navigator.push(TrendsRoute);
              }}
            />

            <SettingsList.Item
              title="Contact"
              onPress={() => {
                sendMail(
                  ["fiih.developers@gmail.com"],
                  "Comments on Your App",
                  "Dear Engineering World Health Body, \n",
                  null,
                  null
                );
              }}
              icon={
                <Image
                  style={styles.imageStyle}
                  height={60}
                  resizeMode="contain"
                  source={IMAGES.addressBook}
                />
              }
            />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={60}
                  resizeMode="contain"
                  source={IMAGES.exportcsv}
                />
              }
              title="Export Data"
              onPress={() => {
                this.setState({ modalVisible: modal_ids[1] });
              }}
            />
            <SettingsList.Item
              icon={
                <Image
                  style={styles.imageStyle}
                  height={60}
                  resizeMode="contain"
                  source={IMAGES.medicine}
                />
              }
              title="Edit Medicine Settings"
              onPress={() => {
                this.props.navigator.push(MedicineSettingsPage);
              }}
            />
          </SettingsList>
        </View>
        <Modal
          isVisible={this.state.modalVisible == modal_ids[0]}
          style={styles.editProfileWrapper}
        >
          <Profile
            exitModal={() => {
              this.setState({ modalVisible: "" });
            }}
            settingsUpdate={(setting, value) => {
              this.settingsUpdate(setting, value);
            }}
            icon={this.state.icon}
            name={this.state.name}
            email={this.state.email}
            birthday={this.state.birthday}
            height_feet={this.state.height_feet}
            height_inches={this.state.height_inches}
            height={this.state.height}
            weight={this.state.weight}
            isInModal={true}
            baseColor={COLOR.black}
          />
        </Modal>
        <Modal
          isVisible={this.state.modalVisible == modal_ids[1]}
          animationInTiming={500}
          animationOutTiming={500}
          onBackdropPress={() => {
            this.setState({ modalVisible: "" });
          }}
          onSwipe={() => {
            this.setState({ modalVisible: "" });
          }}
          swipDirection={"down"}
          style={styles.modal}
        >
          <View style={styles.modalWrapper}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: COLOR.purple }]}
              onPress={() => {
                this.setState({ modalVisible: "" }, () =>
                  exportMedicationsMailFunc(
                    this.state.email,
                    this.state.name + "'s medicine history"
                  )
                );
              }}
            >
              <Text style={styles.modalSubmitText}>Medicine History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: COLOR.cyan }]}
              onPress={() => {
                this.setState({ modalVisible: "" });
                exportSymptomsMailFunc(
                  this.state.email,
                  this.state.name + "'s symptom history"
                );
              }}
            >
              <Text style={styles.modalSubmitText}>Symptom History</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
  onValueChange(value) {
    this.setState({ switchValue: value });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFF4",
    flex: 1
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 7
  },
  editProfileWrapper: {
    borderRadius: 10
  },
  imageStyle: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: "center",
    height: 55,
    width: 55
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
    flex: 0.2,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white"
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#aedfe1",
    flex: 1
  },
  modalSubmitText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    fontSize: 15
  }
});
const ProfileRoute = {
  component: Profile,
  passProps: { myProp: "foo" }
};
const MedicineSettingsPage = {
  component: MedicineSettings
};
const TrendsRoute = {
  component: Trends
};
export default class settingsList extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Settings,
          title: "Settings"
        }}
        style={{ flex: 1 }}
        navigationBarHidden={true}
      />
    );
  }
}
