import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import SurveyForm from "../components/Survey/SurveyForm";
import { IMAGES } from "../resources/constants";
import ButtonWithImage from "../components/Button/ButtonWithImage";
import Moment from 'moment'
import {
  databaseGetSurveyIsOn,
  databaseGetSurveyDate
} from "../databaseUtil/databaseUtil.js";

const styles = StyleSheet.create({
  topSpace: {
    height: 40,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  }
});

class SurveyModal extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      surveyModalVisible: false
    };
  }

  _toggleSurveyModal() {
    this.setState({ surveyModalVisible: !this.state.surveyModalVisible });
  }

  componentDidMount = () => {
    that = this
    databaseGetSurveyDate((date) => {
      let today = new Date(Moment().format('MM/DD/YYYY'))
      if (date == undefined || today > (new Date(date))) {
        databaseGetSurveyIsOn((isOn) => {
          that.setState({ surveyModalVisible: isOn })
        })
      } else {
        that.setState({ surveyModalVisible: false })
      }
    })
  }

  render() {
    return (
      <Modal
        animationInTiming={500}
        isVisible={this.state.surveyModalVisible}
        onBackdropPress={() => {
          this._toggleSurveyModal();
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.topSpace} />
          <SurveyForm
            close={() => {
              this._toggleSurveyModal();
            }}
          />
          <ButtonWithImage
            onPress={() => {
              this._toggleSurveyModal();
            }}
            rounded={true}
            width={30}
            height={30}
            imageSource={IMAGES.close}
            styles={{ position: 'absolute', right: 0 }}
          />
        </View>
      </Modal>
    );
  }
}

export default SurveyModal;
