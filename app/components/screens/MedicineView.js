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
import DoseCard from '../Card/DoseCard';
import { LinearGradient } from 'expo';
import { StackNavigator } from 'react-navigation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {pullMedicineFromDatabase} from '../../databaseUtil/databaseUtil';
import Moment from 'moment';
import LogFormScreen from "../screens/LogFormScreen"

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
    };
  }
    
  componentWillMount = () => {
    var medicineData= []
  //new Date() for current date
    pullMedicineFromDatabase(new Date(), function(formattedData) {
      Object.keys(formattedData).forEach(function(med) {
          var medObj = formattedData[med]
          var formattedTimes = medObj.time.map(t=> Moment().format("MMMM DD YYYY") + ' ' + t)
          medicineData.push({title: med, time:formattedTimes, timeVal:medObj.time, dosage:medObj.dosage, statuses: medObj.taken})
          for(var i =0; i <medObj.timeCategory.length; i++){
              console.log(medObj.time[i])
              var formattedTime = Moment(medObj.time[i],'HH:mm').format('H:mm A')
              data.push({title: med, time:medObj.time[i], dosage:medObj.dosage, status: medObj.taken[i]})
          }
      });
  });

  this.setState ({
      data: medicineData
  })
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
    if (a.timeval[passed_index] < b.timeval[passed_index2]) {
      return -1
    }
    else {
      return 1
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentDate = new Date()
    currentMonths = monthNames[currentDate.getMonth()]
    currentYear = currentDate.getYear()
    currentDay = currentDate.getDay()
    return (
      <View style={{ padding:10, top: 20, flex: 1, backgroundColor: 'white'}}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' , padding:15, justifyContent:'space-between', alignItems:'center'}}>
              <Text style={styles.titleText} >
                Today
              </Text>
              <Text style={styles.titleText} >
                |
              </Text>
              <Text style={styles.date} >
                {Moment().format('MMMM DD, YYYY')}
              </Text>
            <TouchableOpacity onPress = {() => navigate('Form', {
              log_type: 4
            })}>
            <Image style = {{padding:10, height:50, width:50, }}
              source ={require('../Resources/Images/eashanplus.png')}
              >
            </Image>
            </TouchableOpacity>
          </View>
            <TouchableOpacity>
            </TouchableOpacity>
            <FlatList
              data={this.state.data.sort(this.compareCards)}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <DoseCard
                    title={item.title}
                    time={item.time}
                    takenTime={item.takenTime}
                    dosage={item.dosage}
                    passed={item.statuses}
                    updateData = {this.updateData}
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
              }}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    fontWeight: '700',
    padding: 10,
    color: '#333333',
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '500',
    padding: 5,
    color: '#555555',
  },
});

export default CoolerMedicineView;
