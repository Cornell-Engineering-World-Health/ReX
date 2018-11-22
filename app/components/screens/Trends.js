import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Image
} from 'react-native';
import Modal from 'react-native-modal';
import BarChart from '../Charts/BarChart';
import constants, { symptoms, IMAGES, COLOR } from '../Resources/constants.js';
import moment from 'moment';
import { pullSymptomForGraphs } from '../../databaseUtil/databaseUtil';
import { LinearGradient } from 'expo';
//MONTHS allows for indices to map to month values
const MONTHS = constants.MONTH;

//Gives months in the form 'JAN', 'FEB' etc
const SHORTENED_MONTHS = constants.SHORTENED_MONTH;

/*
List of potential symptoms. symptoms is an object with keys of image,
background color, and title
*/
const SYMPTOMS = symptoms;

/*
List of potential modes.

Modes are defined as data that can be graphed over time.

For now, only Frequency and Intensity are allowed.
*/
const MODES = ['Frequency', 'Intensity'];

/*
Used as identifying which Modal is visisble.
*/
const MODALS = ['SYMPTOM', 'TIME', 'MODE'];

/*
Used to distinguish month view and year view
*/
const VIEWS = ['MONTH_VIEW', 'YEAR_VIEW'];

export default class Trends extends React.Component {
  constructor(props) {
    super(props);

    /*
      Get current month and year, and default to month view.
    */
    let currDate = new Date();
    let currMonth = currDate.getMonth();
    let currYear = currDate.getFullYear();

    this.state = {
      selectedMonth: currMonth /*index of the current month where 0 corresponds to January.
                                 [int where 0 <= selectedMonth < 12] */,
      selectedYear: currYear,
      selectedSymptom: this.getSymptoms()[0], //start with first symptom
      selectedMode: MODES[0], // start with 'Frequency'
      modalVisible: '', //string
      selectedView: VIEWS[0], // string corresponding to which view to use (month / year)
      formattedData: [0], //array of int
      averageIntensity: 0,
      noData: true // boolean, true if all datapoints are 0
    };
  }

  componentDidMount() {
    this._setData();
  }

  /*
    Based on selectedMonth and selectedYear (values in state),
    returns a date of the form: Jan '18
  */
  getShortenedDate() {
    let prefix = "'";
    let shortYear = this.state.selectedYear % 100;

    return (
      SHORTENED_MONTHS[this.state.selectedMonth] + ' ' + prefix + shortYear
    );
  }

  /*
  Based on selectedMonth and selectedYear (values in state),
   returns a date of the form: January 2018
  */
  getFullDate() {
    return MONTHS[this.state.selectedMonth] + ' ' + this.state.selectedYear;
  }

  /*
  Return title in the form of
  '<Mode> of <Selected Symptom> <shortened date>'

  Mode and Selected symptoms are from state, and shortened date
  is full when month is -1, and just the last two digits when month is defined.
  */
  getTitle() {
    let date = '';
    let month = this.state.selectedMonth;
    let year = this.state.selectedYear;
    if (this.state.selectedMonth > -1) {
      date = '' + month + '/' + year % 1000;
    } else {
      date = '' + year;
    }

    return this.state.selectedSymptom + ' ' + this.state.selectedMode;
  }

  /*
    Returns an array of symptoms that the user has logged in the past month.
    Returns 'None' if no symptoms were ever logged.

    FOR TESTING PURPOSES
      Returns all symptoms in the constants file

  */
  getSymptoms() {
    let s = [];
    for (var x = 0; x < SYMPTOMS.length; x++) {
      s.push(SYMPTOMS[x].title);
    }

    return s;
  }

  _exitModal() {
    this.setState({ modalVisible: '' });
    this._setData();
  }
  _enterModal(chosenModal) {
    this.setState({ modalVisible: chosenModal });
  }

  _setData() {
    // //Test
    // this._setFakeData();
    // return;
    // //End Test
    if (this.state.selectedView == VIEWS[0]) {
      /*need month, symptom, and callback*/
      let month = new Date(this.state.selectedYear, this.state.selectedMonth);
      pullSymptomForGraphs(
        month,
        this.state.selectedSymptom,
        unformattedData => {
          this._setDataHelperMonth(unformattedData);
        }
      );
    } else if (this.state.selectedView == VIEWS[1]) {
    }
  }

  _setFakeData() {
    //TEMPORARY TEST
    if (this.state.selectedView == VIEWS[0]) {
      let daysInMonth = moment(
        this.state.selectedYear + '-' + (this.state.selectedMonth + 1),
        'YYYY-MM'
      ).daysInMonth();
      console.log('days in month trends', daysInMonth);
      let d = [];
      for (var x = 0; x < daysInMonth; x++) {
        d.push(Math.random() * 10);
      }
      this.setState({ formattedData: d });

      //END OF TEMPORARY TEST
    } else if (this.state.selectedView == VIEWS[1]) {
      //VIEWS[1] == year view
      //get data from database based on selected year

      let d = [];
      for (var x = 0; x < 12; x++) {
        d.push(Math.floor(Math.random() * 10));
      }
      this.setState({ formattedData: d });
    }
  }

  /*
    Formats the data retrieved from the database into a data array of ints, adding 0
    for days that have no symptoms
  */
  _setDataHelperMonth(unformattedData) {
    //console.log(unformattedData, 'UNFORMATTED DATA');

    //we want to loop over the number of days in the month and add 0 to empty days
    let daysInMonth = moment(
      this.state.selectedYear + '-' + (this.state.selectedMonth + 1),
      'YYYY-MM'
    ).daysInMonth();

    let hasData = false;
    let formattedData = [];

    //add a padding 0 to the month if needed
    let month =
      this.state.selectedMonth < 9
        ? '0' + (this.state.selectedMonth + 1)
        : this.state.selectedMonth + 1;

    let year = this.state.selectedYear;

    let totalIntensity = 0;
    let totalDays = 0;

    for (var x = 1; x <= daysInMonth; x++) {
      //add padding 0 to day
      let day = x < 10 ? '0' + x : x;

      let dayData = unformattedData[year + '-' + month + '-' + day];
      if (dayData != undefined) {
        hasData = true;
        totalDays += 1;
        totalIntensity += dayData.total_intensity / dayData.frequency;

        let value = 0;
        if (this.state.selectedMode == MODES[0]) {
          //frequency
          value = dayData.frequency;
        } else if (this.state.selectedMode == MODES[1]) {
          //average intensity
          value = dayData.total_intensity / dayData.frequency;
        }
        formattedData.push(value);
      } else {
        formattedData.push(0);
      }
    }
    console.log(formattedData, 'FORMATTED DATA');
    this.setState({
      formattedData: formattedData,
      averageIntensity: totalIntensity / totalDays,
      noData: !hasData
    });
  }

  /*
  Renders the body for the date picker
  */
  _renderDateModalBody() {
    //generate year picker items
    let pickerItems = [];
    for (var x = 1970; x < 2100; x++) {
      pickerItems.push(<Picker.Item label={x + ''} value={x} key={x} />);
    }

    let yearPicker = (
      <Picker
        selectedValue={this.state.selectedYear}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ selectedYear: itemValue })
        }
        itemStyle={{
          color: 'black',
          fontSize: 18,
          fontWeight: '100'
        }}
      >
        {pickerItems}
      </Picker>
    );

    if (this.state.selectedView == VIEWS[0]) {
      // if month is selected
      let monthPicker = SHORTENED_MONTHS.map((month, index) => {
        return (
          <TouchableOpacity
            key={month}
            style={[
              styles.monthButton,
              month == SHORTENED_MONTHS[this.state.selectedMonth]
                ? styles.monthButtonSelected
                : null
            ]}
            onPress={() => {
              this.setState({ selectedMonth: index });
            }}
          >
            <Text style={styles.monthButtonText}>{month}</Text>
          </TouchableOpacity>
        );
      });

      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <View style={styles.monthPickerRow}>{monthPicker.slice(0, 3)}</View>
            <View style={styles.monthPickerRow}>{monthPicker.slice(3, 6)}</View>
            <View style={styles.monthPickerRow}>{monthPicker.slice(6, 9)}</View>
            <View style={styles.monthPickerRow}>
              {monthPicker.slice(9, 12)}
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {yearPicker}
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>{yearPicker}</View>
    );
  }

  _changeView(view) {
    this.setState({ selectedView: view });
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[COLOR.purple + '80', 'white']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>{this.getTitle()}</Text>
          <TouchableOpacity style={styles.menuButtonWrapper} onPress={() => {}}>
            <Image
              source={IMAGES.export}
              style={styles.menuImageStyle}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {/*<Text style={styles.headerDateText}>{this.getFullDate()}</Text>*/}
        </View>
        <View style={styles.footer}>
          <PickerButton
            title={this.state.selectedSymptom}
            onPress={() => this._enterModal(MODALS[0])}
          />
          <PickerButton
            title={
              this.state.selectedView == VIEWS[0]
                ? this.getShortenedDate()
                : this.state.selectedYear
            }
            onPress={() => this._enterModal(MODALS[1])}
          />
          <PickerButton
            title={this.state.selectedMode}
            onPress={() => this._enterModal(MODALS[2])}
          />
          <ModalPicker
            isVisible={this.state.modalVisible == MODALS[0] /* SYMPTOMS */}
            exitModal={() => this._exitModal()}
            flex={0.35}
          >
            <View style={styles.modalChildWrapper}>
              <View style={styles.modalChildTitleWrapper}>
                <Text style={styles.modalChildTitleText}>Symptoms</Text>
              </View>
              <View style={{ flex: 0.6, justifyContent: 'center' }}>
                <Picker
                  selectedValue={this.state.selectedSymptom}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedSymptom: itemValue })
                  }
                  itemStyle={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: '100'
                  }}
                >
                  {this.getSymptoms().map(item => (
                    <Picker.Item label={item} value={item} key={item} />
                  ))}
                </Picker>
              </View>
            </View>
          </ModalPicker>
          <ModalPicker
            isVisible={this.state.modalVisible == MODALS[1] /* DATE */}
            exitModal={() => this._exitModal()}
            flex={0.4}
          >
            <View style={styles.modalChildWrapper}>
              <View style={[styles.modalDateHeader, styles.darkShadow]}>
                <TouchableOpacity
                  onPress={() => {
                    this._changeView(VIEWS[0]);
                  }}
                  style={[
                    styles.modalDateButton,
                    this.state.selectedView == VIEWS[0]
                      ? styles.modalSelectedDateButton
                      : null
                  ]}
                >
                  <Text style={styles.modalChildTitleText}>Month</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this._changeView(VIEWS[1]);
                  }}
                  style={[
                    styles.modalDateButton,
                    this.state.selectedView == VIEWS[1]
                      ? styles.modalSelectedDateButton
                      : null
                  ]}
                >
                  <Text style={styles.modalChildTitleText}>Year</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }} />
              <View style={styles.modalDateBody}>
                {this._renderDateModalBody()}
              </View>
            </View>
          </ModalPicker>
          <ModalPicker
            isVisible={this.state.modalVisible == MODALS[2] /* MODE */}
            exitModal={() => this._exitModal()}
            flex={0.4}
          >
            <View style={styles.modalChildWrapper}>
              <Picker
                selectedValue={this.state.selectedMode}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ selectedMode: itemValue })
                }
                itemStyle={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '100'
                }}
              >
                {MODES.map(item => (
                  <Picker.Item label={item} value={item} key={item} />
                ))}
              </Picker>
            </View>
          </ModalPicker>
        </View>
        <View style={styles.graphContainer}>
          <BarChart
            view={this.state.selectedView}
            month={this.state.selectedMonth}
            year={this.state.selectedYear}
            data={this.state.formattedData}
            noData={this.state.noData}
          />
        </View>
        <View style={styles.extraInfo}>
          <Info title={'Average Duration'} body={2 + ''} footer={'Hours'} />
          <Info
            title={'Average Intensity'}
            body={
              this.state.averageIntensity
                ? Math.round(this.state.averageIntensity)
                : 0
            }
            footer={'/10'}
          />
        </View>
      </View>
    );
  }
}

/*
Info Card

Props:
title (String)
body (String)
*/
const Info = props => {
  return (
    <View style={styles.infoCardWrapper}>
      <View style={[styles.infoCardContainer, styles.darkShadow]}>
        <Text style={styles.infoCardTitle}>{props.title}</Text>
        <View>
          <Text style={styles.infoCardBody}>{props.body}</Text>
          {props.footer ? (
            <Text style={styles.infoCardFooter}>{props.footer}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

/*
Props:
title (String)
onPress (func)
*/
const PickerButton = props => {
  return (
    <View style={styles.pickerButtonWrapper}>
      <TouchableOpacity
        style={[styles.pickerButtonContainer, styles.darkShadow]}
        onPress={props.onPress}
      >
        <Text style={styles.pickerButtonText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

/*
Props:
isVisible: boolean that says whether or not this modal is visible
exitModal: function to get out of the modal (set isVisible to false)
flex: determines how much of the screen the modal should take up
Component takes children and renders them in the body of the modal
*/
const ModalPicker = props => {
  return (
    <Modal
      isVisible={props.isVisible}
      animationInTiming={500}
      animationOutTiming={500}
      onBackdropPress={props.exitModal}
      style={[styles.modalWrapper]}
    >
      <View style={[styles.modalContainer, { flex: props.flex }]}>
        <TouchableOpacity
          style={styles.modalSubmitButton}
          onPress={props.exitModal}
          alignItems="center"
        >
          <Text style={styles.modalSubmitText}>Submit</Text>
        </TouchableOpacity>
        {props.children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  header: {
    flex: 0.14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  graphContainer: {
    flex: 0.56
  },
  extraInfo: {
    flex: 0.2,
    flexDirection: 'row'
  },
  footer: {
    flex: 0.09,
    flexDirection: 'row'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '200',
    color: '#000'
  },
  headerDateText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '300'
  },
  infoCardWrapper: {
    padding: 12,
    flex: 1
  },
  infoCardContainer: {
    backgroundColor: 'white', //temporary
    borderRadius: 5,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flex: 1,
    padding: 5
  },
  infoCardTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '100'
  },
  infoCardBody: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: '100'
  },
  infoCardFooter: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '100'
  },
  pickerButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  pickerButtonContainer: {
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#e8e8e8',
    padding: 15,
    flex: 1
  },
  pickerButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    color: 'black'
  },
  modalWrapper: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'stretch'
  },
  modalSubmitButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aedfe1'
  },
  modalSubmitText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 15
  },
  modalChildWrapper: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  modalChildTitleText: {
    fontSize: 25,
    fontWeight: '100',
    textAlign: 'center'
  },
  modalSelectedDateButton: {
    backgroundColor: '#eaeaea'
  },
  modalDateButton: {
    flex: 1,
    padding: 10
  },
  pickerItemStyle: {
    fontWeight: '100'
  },
  lightShadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#808080',
    shadowOpacity: 0.2
  },
  darkShadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#808080',
    shadowOpacity: 0.3
  },
  monthButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  monthButtonText: {
    fontWeight: '100'
  },
  monthPickerRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  modalDateBody: { flex: 1 },
  modalDateHeader: {
    flexDirection: 'row'
  },
  monthButtonSelected: {
    borderRadius: 5,
    backgroundColor: '#eaeaea'
  },
  modalChildTitleWrapper: {
    flex: 0.2,
    justifyContent: 'center',
    paddingTop: 15
  },
  menuImageStyle: {
    width: 30,
    height: 30
  },
  menuButtonWrapper: {
    padding: 10,
    position: 'absolute',
    right: 0
  }
});
