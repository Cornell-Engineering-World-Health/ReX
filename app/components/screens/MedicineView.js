import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import DoseCard from '../Card/DoseCard';
import { LinearGradient } from 'expo';
import { StackNavigator } from 'react-navigation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {pullMedicineFromDatabase} from '../../databaseUtil/databaseUtil';
import Moment from 'moment';
import LogFormScreen from "../screens/LogFormScreen"
import { asyncCreateMedicineEvents } from '../../databaseUtil/databaseUtil';
import DropdownAlert from 'react-native-dropdownalert';
import { COLOR, IMAGES} from '../Resources/constants';
import MedicineAddForm from '../MedicineAddForm/MedicineAddForm.js';

var dummy_data = [
  {
    title: 'Dinonuggies',
    dosage: '489mg',
    time: ["January 31 1980 12:00", "January 31 1980 13:10","January 31 1980 20:30"],
    takenTime: ["January 31 1980 12:10", "", ""],
    timeval: [1200, 1310, 2030],
    statuses: [true, false, false]
  },
  {
    title: 'KT',
    dosage: '4344348mg',
    time: ["January 31 1980 9:30"],
    takenTime: [""],
    timeval: [930],
    statuses: [false]
  },
  {
    title: 'Beanz',
    dosage: '430mg',
    time: ["January 31 1980 12:30"],
    takenTime: [""],
    timeval: [1230],
    statuses: [false]
  },
  {
    title: 'Oliviera',
    dosage: '233mg',
    time: ["January 31 1980 13:30"],
    takenTime: [""],
    timeval: [1330],
    statuses: [false]
  },
  {
    title: 'Splash',
    dosage: '3mg',
    time: ["January 31 1980 15:10"],
    takenTime: [""],
    timeval: [1510],
    statuses: [false]
  }
]

class CoolerMedicineView extends React.Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);

    // updateData = (newData) => {
    //   this.setState({
    //     data: newData
    //   })
    // }

    this.state = {
      data: [],
      passed_index: 0,
      toggle_add: false,
    };
  }

  asyncDatabasePull = () => {
    let that = this
  //new Date() for current date
    pullMedicineFromDatabase(new Date(), function(formattedData) {
      console.log("getting data")
      var medicineData= []
      // console.log("READING DATA", formattedData)
      Object.keys(formattedData).forEach(function(med) {
          var medObj = formattedData[med]
          var formattedTimes = medObj.time.map(t=> Moment().format("MMMM DD YYYY") + ' ' + t)
          medicineData.push({title: med, time:formattedTimes, timeVal:medObj.time, dosage:medObj.dosage, statuses: medObj.taken, takenTime: medObj.takenTime})
          // for(var i =0; i <medObj.timeCategory.length; i++){
          //     console.log(medObj.time[i])
          //     var formattedTime = Moment(medObj.time[i],'HH:mm').format('H:mm A')
          //     data.push({title: med, time:medObj.time[i], dosage:medObj.dosage, status: medObj.taken[i]})
          // }
      });

      that.setState ({
          data: medicineData
      })
      // {console.log("old data")}
      // {console.log(this.state.data)}
    });

  }

  errorOnSubmit(){
    this.dropdown.close(); this.dropdown.alertWithType('custom', 'Form Incomplete',
    'Please add any missing information')
  }

  successOnSubmit(){
    this.dropdown_success.close(); this.dropdown_success.alertWithType('custom',
    'New Medicine Added!', '')
  }

  asyncDatabaseUpdate = (title, dosage, start, end, time, time_category) => {
    asyncCreateMedicineEvents(
      title,
      dosage,
      start,
      end,
      time,
      time_category
    );
    endNew = Moment(end)
    endNew.date(endNew.date() + 1)
    if (Moment().isBetween(start, endNew)) {
      medicineData = this.state.data
      for (var i = 0; i < medicineData.length; i++){
        if (medicineData[i].title == title){
          medicineData.splice(i, 1)
        }
      }
      var formattedTimes = time.map(t => Moment().format("MMMM DD YYYY") + ' ' + t)
      var taken = time.map(t => false)
      var takenTime = time.map(t => '')
      medicineData.push({title: title, time: formattedTimes, timeVal: time, dosage: dosage, statuses: taken, takenTime: takenTime})
      this.setState({
        toggle_add: false,
        data: medicineData
      })
    }
  }

  componentDidMount = () => {

  //   let that = this
  // //new Date() for current date
  //   pullMedicineFromDatabase(new Date(), function(formattedData) {
  //     console.log("getting data")
  //     var medicineData= []
  //     // console.log("READING DATA", formattedData)
  //     Object.keys(formattedData).forEach(function(med) {
  //         var medObj = formattedData[med]
  //         var formattedTimes = medObj.time.map(t=> Moment().format("MMMM DD YYYY") + ' ' + t)

  //         medicineData.push({title: med, time:formattedTimes, timeVal:medObj.time, dosage:medObj.dosage, statuses: medObj.taken, takenTime: medObj.takenTime})
  //         // for(var i =0; i <medObj.timeCategory.length; i++){
  //         //     console.log(medObj.time[i])
  //         //     var formattedTime = Moment(medObj.time[i],'HH:mm').format('H:mm A')
  //         //     data.push({title: med, time:medObj.time[i], dosage:medObj.dosage, status: medObj.taken[i]})
  //         // }
  //     });

  //     that.setState ({
  //         data: medicineData
  //     })
  //   });
  this.asyncDatabasePull()
}

componentDidUpdate() {
  // Typical usage (don't forget to compare props):
  console.log("whats up")
}

  compareCards = (a,b) => {
    var passed_index = 0
    for (var i = 0; i < a.statuses.length; i++){
      if (a.statuses[i] == false){
        passed_index = i
        break
      }
    }
    var passed_index2 = 0
    for (var j = 0; j < b.statuses.length; j++){
      if (b.statuses[j] == false){
        passed_index2 = j
        break
      }
    }
    if (a.timeVal[passed_index] < b.timeVal[passed_index2]) {
      return -1
    }
    else {
      return 1
    }
  }

  _renderCard = ({item}) => {
    return (
      <View>
        <DoseCard
        title={item.title}
        time={item.time}
        takenTime={item.takenTime}
        dosage={item.dosage}
        passed={item.statuses}
        imageData = {this.updateData}
        buttonsRight={[
          {
            text: 'Edit',
            type: 'edit',
            onPress: () => {
              this.setState ({
                modalVisible: true
              })
            }
          }]}
        />
        </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentDate = new Date()
    currentMonths = monthNames[currentDate.getMonth()]
    currentYear = currentDate.getYear()
    currentDay = currentDate.getDay()
    return (
      <View style={styles.wrapper}>
          <View style={styles.header}>
              <Text style={styles.titleText} >
                Today
              </Text>
              <Text style={styles.separator} >
                |
              </Text>
              <Text style={styles.date} >
                {Moment().format('MMMM DD, YYYY')}
              </Text>
            <TouchableOpacity
              style = {{padding:15}}
              onPress = {() => {
                this.setState({
                  toggle_add: true
                })
              }}>
            <Image style = {{height:50, width:50, }}
              source ={require('../Resources/Images/eashanplus.png')} >
            </Image>
            </TouchableOpacity>
          </View>
            <TouchableOpacity>
            </TouchableOpacity>
            {console.log("data before flatlist")}
            {console.log(this.state.data.sort(this.compareCards))}
            <FlatList
              data={this.state.data.sort(this.compareCards)}
              extraData={this.state}
              renderItem={this._renderCard} 
              keyExtractor={(_, index) => index.toString()}
            />
         <Modal
         isVisible={this.state.toggle_add}
         style={styles.addFormWrapper}
         animationIn={'slideInRight'}
         animationOut={'slideOutRight'}
         backdropOpacity={1}
         >
         <MedicineAddForm
         exitModal={() => {
           this.setState({ toggle_add: false });
         }}
         asyncDatabaseUpdate={(title, dosage, start, end, time, time_category) => {
           this.asyncDatabaseUpdate(title, dosage, start, end, time, time_category)
         }}
         errorOnSubmit={() => {
           this.errorOnSubmit()
         }}
         successOnSubmit={() => {
           this.successOnSubmit()
         }}
         
         />
         </Modal>
         <DropdownAlert
          ref={ref => this.dropdown = ref}
          closeInterval={2000}
          imageSrc={IMAGES.close_white}
          containerStyle={{
            backgroundColor: COLOR.red,
          }}
        />
        <DropdownAlert
          ref={ref => this.dropdown_success = ref}
          closeInterval={2000}
          imageSrc={IMAGES.checkmarkWhite}
          containerStyle={{
            backgroundColor: COLOR.cyan,
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    padding:10,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row' ,
    padding:15,
    paddingBottom:0,
    justifyContent:'space-between',
    alignItems:'center'
  },
  titleText: {
    fontSize: 25,
    fontWeight: '700',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333333',
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#555555',
  },
  separator: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    color: '#555555',
    marginLeft:5,
    marginRight: 5,
  },
  addFormWrapper: {
    flex: 1,
    backgroundColor: 'white',
    margin: 0
  }
});

export default CoolerMedicineView;
