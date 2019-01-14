import * as React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
} from "react-native";
import ButtonWithImage from "../Button/ButtonWithImage";
import { IMAGES } from "../../resources/constants";
import Home from "../../screens/HomePage";
import MedicineView from "../../screens/MedicinePage";
import Settings from "../../screens/Settings";
import Calendar from "../../screens/Calendar";
import ChooseLogScreen from "../../screens/Log";
import PushController from "../PushController/PushController";
import SurveyModal from "../../screens/SurveyModal";

const MEDICINE_PAGE = "medicine";
const SETTINGS_PAGE = "settings";
const HOME_PAGE = "home";
const CALENDAR_PAGE = "calendar";
const SYMPTOMS_LIST = "flatlistcard";
const SYMPTOM_LOG_CHOOSER = "symptomlog";

const SELECTED_BACKGROUND_COLOR = "#cc99ff";
const DEFAULT_BACKGROUND_COLOR = "#ffffff";
const QUICK_LOG_COLOR = "#cc99ff";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  inputButtonContainer: {
    height: 200
  },
  addButton: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    alignItems: "flex-end"
  },
  menuButtons: {
    height: 150,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff"
  },
  bottomModal: {
    justifyContent: "flex-end"
  },
  menuStyle: {
    justifyContent: "space-around",
    height: 100,
    flexDirection: "row"
  }
});

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: HOME_PAGE
    };

    var startdate = new Date("2018-12-01");
    var enddate = new Date("2018-12-10");
  }

  onLog() {
    this.setState({
      selectedID: CALENDAR_PAGE
    });
  }
  _renderScreen() {
    switch (this.state.selectedID) {
      case HOME_PAGE:
        return <Home />;
        break;
      case CALENDAR_PAGE:
        return <Calendar />;
        break;
      case MEDICINE_PAGE:
        return <MedicineView />;
        break;
      case SETTINGS_PAGE:
        return <Settings />;
        break;
      case SYMPTOM_LOG_CHOOSER:
        return <ChooseLogScreen onLog={this.onLog.bind(this)} />;
        break;
    }
  }

  render() {
    let page = this._renderScreen();

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {page}
        <View
          style={styles.addButton}
          onPress={() => {
            this.setState({
              selectedID: SYMPTOM_LOG_CHOOSER
            });
          }}
        >
          <ButtonWithImage
            imageSource={IMAGES.homeIcon}
            width={50}
            height={50}
            rounded
            defaultBackgroundColor={DEFAULT_BACKGROUND_COLOR}
            selectedBackgroundColor={SELECTED_BACKGROUND_COLOR}
            selected={this.state.selectedID == HOME_PAGE}
            onPress={() => {
              this.setState({
                selectedID: HOME_PAGE
              });
            }}
          />

          <ButtonWithImage
            imageSource={IMAGES.calendar}
            selectedImageSource={IMAGES.calendar2}
            width={50}
            height={50}
            rounded
            defaultBackgroundColor={DEFAULT_BACKGROUND_COLOR}
            selectedBackgroundColor={SELECTED_BACKGROUND_COLOR}
            selected={this.state.selectedID == CALENDAR_PAGE}
            onPress={() => {
              this.setState({
                selectedID: CALENDAR_PAGE
              });
            }}
          />
          <ButtonWithImage
            shadow
            rounded
            imageSource={IMAGES.plusSign}
            width={50}
            height={50}
            onPress={() => {
              this.setState({
                selectedID: SYMPTOM_LOG_CHOOSER
              });
            }}
          />
          <ButtonWithImage
            imageSource={IMAGES.pillBottle}
            width={50}
            height={50}
            rounded
            defaultBackgroundColor={DEFAULT_BACKGROUND_COLOR}
            selectedBackgroundColor={SELECTED_BACKGROUND_COLOR}
            selected={this.state.selectedID == MEDICINE_PAGE}
            onPress={() => {
              this.setState({
                selectedID: MEDICINE_PAGE
              });
            }}
          />
          <ButtonWithImage
            imageSource={IMAGES.settings}
            width={50}
            height={50}
            rounded
            defaultBackgroundColor={DEFAULT_BACKGROUND_COLOR}
            selectedBackgroundColor={SELECTED_BACKGROUND_COLOR}
            selected={this.state.selectedID == SETTINGS_PAGE}
            onPress={() => {
              this.setState({
                selectedID: SETTINGS_PAGE
              });
            }}
          />
        </View>
        <PushController />
        <SurveyModal />
      </View>
    );
  }
}

export default MenuBar;
