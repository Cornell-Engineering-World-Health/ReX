import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import Card from "../Card/Card.js";
import { COLOR, IMAGES } from "../../resources/constants";
import Modal from "react-native-modal";
import { asyncDeleteEvent } from "../../databaseUtil/databaseUtil";

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
]; //find 10 colors that show intensity

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
      changeToForceRender: 1,
      agendaInfo: [],
      currentCard: {},
      currentCardTitle: "",
      selected: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.agendaInfo != nextProps.agendaInfo) {
      this.setState({ agendaInfo: nextProps.agendaInfo });
    }
    return true;
  }

  _keyExtractor = (item, index) => item.id;

  /**
   * renders agenda
   */
  _renderAgenda() {
    if (this.state.agendaInfo && this.state.agendaInfo.length != 0) {
      return (
        <FlatList
          data={this.state.agendaInfo}
          keyExtractor={item => "" + item.id}
          extraData={this.state}
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
                      this.setState({ currentCardTitle: item.cardData.title, currentCard: item})
                      this.props.refreshCalendar();
                      this.setState({ editVisible: true })
                      this.setState({ state: this.state })
                      console.log("we have a functional edit button bois")
                    }
                  },
                  {
                    text: "Delete",
                    type: "delete",
                    onPress: () => {
                      asyncDeleteEvent(item.id);
                      let a_info = this.state.agendaInfo;

                      /* find object with correct id and delete it from agendaInfo */
                      for (var i = 0; i < a_info.length; i++) {
                        if (a_info[i].id === item.id) {
                          a_info.splice(i, 1);
                          break;
                        }
                      }
                      this.props.refreshCalendar();
                      this.setState({
                        changeToForceRender: this.state.changeToForceRender + 1
                      });
                      this.setState({ state: this.state });
                      this.setState({ agendaInfo: a_info });
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

  _renderIntensity() {
    let body = null;
    body = ([0,1,2,3,4,5,6,7,8,9,10]).map((option, i, arr) => {

      return (
        <View key={i} style={{paddingLeft: 2}}>
        <TouchableOpacity
          onPress={() => {
            console.log("wassup")
            console.log(i)
            this.setState({ selected: i });
            // this.change(i);
            // this.setState({ selected: i });
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
        {this._renderIntensity()}
        </View>
        <View style={{
          flex: 1,
          alignItems: "stretch",
        }}>
        {this._renderIntensity()}
        </View>
        <View style={{
          flex: 1,
          alignItems: "stretch",
        }}>
        {this._renderIntensity()}
        </View>
        <TouchableOpacity
            onPress={() => this.setState({ editVisible: false })}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1
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
  }
});

export default Agenda;
