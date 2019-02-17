import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import SurveyForm from "../components/Survey/SurveyForm";
import { IMAGES } from "../resources/constants";
import ButtonWithImage from "../components/Button/ButtonWithImage";
import {databaseGetSurveyIsOn} from "../databaseUtil/databaseUtil.js";

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
    databaseGetSurveyIsOn((isOn) => {
      that.setState(
        {surveyModalVisible: isOn}
      )
  }
    )}

  render() {
    return (
      <Modal
        animationInTiming={500}
        isVisible={this.state.surveyModalVisible}
        onBackdropPress={() => {
          this._toggleSurveyModal();
        }}
      >
        <View style={{ flex: 0.9 }}>
          <View style={styles.topSpace} />
          <SurveyForm
            onSubmit={() => {
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
            styles={{ position: "absolute", right: 0 }}
          />
        </View>
      </Modal>
    );
  }
}

export default SurveyModal;
