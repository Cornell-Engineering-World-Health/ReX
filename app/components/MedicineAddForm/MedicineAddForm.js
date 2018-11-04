import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import moment from 'moment'
import Modal from 'react-native-modal'
import DropdownAlert from 'react-native-dropdownalert';
import TextInputType from '../LogInputTypes/TextInputType'
import TimePicker from '../LogInputTypes/TimePicker'
import Button from '../Button/Button'
import ListViewer from '../HorizontalVariableListViewer/ListViewer'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);
import { asyncCreateMedicineEvents } from '../../databaseUtil/databaseUtil';
import { Calendar } from 'react-native-calendars';
import { COLOR, IMAGES} from '../Resources/constants';


event_id_count = 600;
event_details_id_count = 600;
const CALENDAR_ID = 'CALENDAR'
const TIME_ID = 'TIME'


export default class MedicineAddForm extends React.Component {
  constructor (props) {
    super(props)

    this.name;
    this.dosage;
    this.state = {
      startDate:'',
      endDate:'',
      markedDates : {}, //for UI
      selectingStart : true,
      timeArray: [(new Date).toTimeString().split(':',2).join(':')],
      timeArrayIdx: 0,
      modalID: '',
      submit_vals: {} //object for final submit
    }
  }

  valueChange(label, value){
    temp_vals = this.state.submit_vals
    temp_vals[label] = value
    this.setState({ submit_vals: temp_vals })
  }

  checkIfIncomplete(){
      if(Object.keys(this.state.submit_vals).length < 6 ||
          this.state.submit_vals['Pill Name'] == '' ||
          this.state.submit_vals['Dosage'] == '' ||
          this.state.submit_vals['Start Date'] == '' ||
          this.state.submit_vals['End Date'] == '' ||
          this.state.submit_vals['Time'] == [] ||
          this.state.submit_vals['Time Category'] == []){
        return true
      }
      return false
  }

  submit (){
    if(this.checkIfIncomplete()){
      this.dropdown.close(); this.dropdown.alertWithType('custom', 'Form Incomplete',
       'Please add any missing information')
    } else {
      asyncCreateMedicineEvents(
        this.state.submit_vals['Pill Name'],
        this.state.submit_vals['Dosage'],
         new Date(this.state.submit_vals['Start Date']),
        new Date(this.state.submit_vals['End Date']),
        this.state.submit_vals['Time'],
        this.state.submit_vals['Time Category'],
        event_id_count,
        event_details_id_count
      );
    }
  }
  nextFocus(){
    this.dosage.textInput.focus()
  }

  fill_between(startDate, endDate){
    let new_marked_date = {}
    new_marked_date[startDate] =  {startingDay: true, color: COLOR.cyan, textColor: 'white'}
    new_marked_date[endDate] = {endingDay: true, color: COLOR.cyan, textColor: 'white'}
    let start = moment(startDate)
    let end = moment(endDate)
    if(end <= start) return {}
    start.add(1, 'days')
    while(start.format('YYYY-MM-DD') != end.format('YYYY-MM-DD')){
      let key = start.format('YYYY-MM-DD')
      new_marked_date[key] =  {color: COLOR.cyan, textColor: 'white'}
      start.add(1, 'days');
    }
    return new_marked_date
  }

  onDayPress(day){
    let ds = day.dateString
    if(this.state.selectingStart){
      let new_marked_date = {}
      new_marked_date[ds] =  {startingDay: true, endingDay: true, color: COLOR.cyan, textColor: 'white'}
      this.setState({
        startDate: ds,
        endDate: '',
        markedDates: new_marked_date,
        selectingStart: false
      })
    } else {
      let marked_dates = this.fill_between(this.state.startDate ,ds)
      this.setState({
        markedDates: marked_dates,
        selectingStart: true,
        endDate: ds
      })
    }
  }

  confirmSubmit(){
    if(this.state.modalID == CALENDAR_ID){
      this.valueChange('Start Date', this.state.startDate)
      this.valueChange('End Date', this.state.endDate)
    } else if(this.state.modalID == TIME_ID){
      this.setState({ timeArray: this.state.timeArray.sort()})
      this.valueChange('Time', this.state.timeArray.sort())
    }
  }

  render () {
    let timeViewer = (
      <ListViewer
        list={this.state.timeArray.map((v) => {
          let time_split = v.split(':')
          let h = time_split[0]
          let m = time_split[1]
          if(parseInt(h) > 12) return ((parseInt(h)-12)+':'+m+' PM')
          else if (parseInt(h) == 0) return ('12:'+m+' AM')
          else return (v+' AM')
        })}
      />
    )

    let modalContent = (this.state.modalID == CALENDAR_ID) ? (
      <Calendar
        markedDates={this.state.markedDates}
        markingType={'period'}
        onDayPress={(d) => {this.onDayPress(d)}}
        style={{width: viewportWidth}}
      />) : (
        <View
          style={{ flex: 1, width: viewportWidth}}
        >
        {timeViewer}
        <TimePicker
          valueChange={(label, value) => {
            let t = this.state.timeArray
            t[this.state.timeArrayIdx] = value
            this.setState({timeArray: t})
          }}
          title_text={''}
          chosen_date={(new Date).toTimeString()}
          addPressed={() => {
            let arr = this.state.timeArray
            arr.push(arr[arr.length-1])
            this.setState({
              timeArrayIdx: this.state.timeArrayIdx+1,
              timeArray: arr
            })
          }}
          deletePressed={() => {
            if(this.state.timeArrayIdx == 0) return
            let arr = this.state.timeArray
            arr.pop()
            this.setState({
              timeArrayIdx: this.state.timeArrayIdx-1,
              timeArray: arr
            })
          }}
        />
        </View>
      )
    let modalTitle = (this.state.modalID == CALENDAR_ID) ?
     'Select Date Range' : 'Select Prescription Time'
    let modalHeight = (this.state.modalID == CALENDAR_ID) ? .65 : .6
    let dateText = ''
    if(this.state.submit_vals['Start Date']){
      dateText = moment(this.state.submit_vals['Start Date']).format('MM/DD/YYYY') +
      ' ~ '
      + moment(this.state.submit_vals['End Date']).format('MM/DD/YYYY')
    } else {
      dateText = 'Enter Your Prescription Schedule'
    }
    let timeText = ''
    let timeContent = null
    if(this.state.submit_vals['Time']){
      timeContent = timeViewer
    } else {
      timeText = 'Enter Your Prescription Time'
    }

    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.headerTitle}>{'Add a New Medicine!'}</Text>
          </View>
          <TextInputType
            ref={(t) => {this.name = t}}
            input_style={styles.name_input}
            title_text_style={styles.title_text}
            input_text_style={styles.input_text}
            text={''}
            placeholder_text={'Tap to type'}
            title_text={'Medicine Name'}
            val_label={'Pill Name'}
            valueChange={this.valueChange.bind(this)}
            blurOnSubmit={false}
            returnKeyType = { 'next' }
            onSubmitEditing={() => {this.nextFocus()}}
          />
          <TextInputType
            ref={(t) => {this.dosage = t}}
            input_style={styles.dosage_input}
            title_text_style={styles.title_text}
            input_text_style={styles.input_text}
            text={''}
            placeholder_text={'Tap to type'}
            title_text={'Dosage (mg)'}
            val_label={'Dosage'}
            valueChange={this.valueChange.bind(this)}
            blurOnSubmit={false}
            returnKeyType = { 'next' }
            onSubmitEditing={() => {Keyboard.dismiss()}}
            keyboardType={'number-pad'}
          />
          <Button
            text={dateText}
            rounded={true}
            width={viewportWidth - 30}
            borderColor={COLOR.purple}
            onPress={() => {this.setState({ modalID: CALENDAR_ID })}}
          />
          <Button
            text={timeText}
            rounded={true}
            width={viewportWidth - 30}
            borderColor={COLOR.purple}
            onPress={() => {this.setState({ modalID: TIME_ID })}}
            innerComponent={timeContent}
          />
          <Button
            text={'Submit'}
            backgroundColor={COLOR.purple}
            color={'white'}
            rounded={true}
            onPress={() => {this.submit()}}
          />
          <Modal
            isVisible={this.state.modalID != ''}
            animationInTiming={500}
            animationOutTiming={500}
            onBackdropPress={() => {
              this.setState({ modalID: '' });
            }}
            onSwipe={() => {
              this.setState({ modalID: '' });
            }}
            swipDirection={'down'}
            style={styles.modal}
          >
            <View style={[styles.modalWrapper, {flex: modalHeight}]}>
              <View
                style={styles.modalTitle}
              >
                <Text>{modalTitle}</Text>
                <View
                  style={styles.modalTitleButtons}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.confirmSubmit();
                      this.setState({ modalID: '' });
                    }}
                  >
                    <Text style={styles.modalButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ modalID: '' });
                    }}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.innerWrapper}>
                {modalContent}
              </View>
            </View>
          </Modal>
          <DropdownAlert
            ref={ref => this.dropdown = ref}
            closeInterval={4000}
            imageSrc={IMAGES.close_white}
            containerStyle={{
              backgroundColor: COLOR.red,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  headerView: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: viewportWidth
  },
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '300',
    color: 'black'
  },
  title_text: {
    fontSize: 20,
    color: '#404040',
    paddingBottom: 10
  },
  input_text: {
    color: '#404040'
  },
  name_input: {
    width: viewportWidth - 30,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLOR.purple
  },
  dosage_input: {
    width: viewportWidth - 30,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLOR.purple
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalWrapper: {
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  modalTitle: {
    width: Dimensions.get('window').width,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aedfe1'
  },
  modalButtonText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 15
  },
  innerWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  modalTitleButtons: {
    paddingTop: 10,
    flexDirection: 'row',
    width: viewportWidth/2,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
