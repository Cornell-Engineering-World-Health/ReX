import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Circle from '../MedicineComponents/Circle.js';
import DoseCard from '../Card/DoseCard';
import { LinearGradient } from 'expo';
import { StackNavigator } from 'react-navigation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {pullMedicineFromDatabase} from '../../databaseUtil/databaseUtil';
import Moment from 'moment';

var dummy_data = [
  {
    title: 'Dinonuggies',
    dosage: '489mg',
    time: ["January 31 1980 10:30", "January 31 1980 11:30"],
    timeval: [1030, 1130],
    status: [false, false]
  },
  {
    title: 'KT',
    dosage: '4344348mg',
    time: ["January 31 1980 9:30"],
    timeval: [930],
    status: [false]
  },
  {
    title: 'Beanz',
    dosage: '430mg',
    time: ["January 31 1980 12:30"],
    timeval: [1230],
    status: [false]
  },
  {
    title: 'Oliviera',
    dosage: '233mg',
    time: ["January 31 1980 13:30"],
    timeval: [1330],
    status: [false]
  },
  {
    title: 'Splash',
    dosage: '3mg',
    time: ["January 31 1980 14:45"],
    timeval: [1445],
    status: [false]
  }
]


var data1 = [
  {
    title: 'Tylenol 20mg',
    time: '12:20PM',
    status: false
  },
  { title: 'Motrin 30mg', time: '12:50PM', status: false },
  { title: 'Ibuprofen 80mg', time: '2:50PM', status: false },
  { title: 'Mucinex 3410mg', time: '1:25PM', status: false },
  { title: 'Aspirin 20mg', time: '2:50PM', status: false },
  { title: 'Mucinex 4410mg', time: '12:50PM', status: false }
];
var data2 = [
  {
    title: 'Tylenol 20mg',
    time: '12:20PM',
    status: false
  },
  { title: 'Motrin 30mg', time: '12:50PM', status: false },
  {
    title: 'Tylenol 20mg',
    time: '12:20PM',
    status: false
  },
  {
    title: 'Tylenol 20mg',
    time: '12:20PM',
    status: false
  },
  {
    title: 'Tylenol 20mg',
    time: '12:20PM',
    status: false
  },
  {
    title: 'Tylenol 20mg',
    time: '12:20PM',
    status: false
  }
];
var data3 = [
  {
    title: 'Tylenol 20mg',
    time: '12:20PM',
    status: false
  },
  { title: 'Motrin 30mg', time: '12:50PM', status: false }
];
var data4 = [
  {
    title: 'Tylenol 20mg',
    time: '12:20PM',
    status: false
  },
  { title: 'Advil 30mg', time: '12:50PM', status: false },
  { title: 'Mucinex 100mg', time: '1:25PM', status: false },
  { title: 'Aspirin 30mg', time: '2:50PM', status: false }
];

class CoolerMedicineView extends React.Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);
    
    var medicineData= []
    //new Date() for current date
    pullMedicineFromDatabase(new Date('2018-04-17'), function(formattedData) {
        Object.keys(formattedData).forEach(function(med) {
            console.log(med)
            var medObj = formattedData[med]
            medicineData.push({title: med, times:medObj.time, dosage:medObj.dosage, statuses: medObj.taken})
            for(var i =0; i <medObj.timeCategory.length; i++){
                //console.log(medObj.time[i])
                //var formattedTime = Moment(medObj.time[i],'HH:mm').format('H:mm A')
                //data.push({title: med, time:medObj.time[i], dosage:medObj.dosage, status: medObj.taken[i]})
            }
        });
        
        console.log(data)
    });
    
    var arr1 = new Array(data1.length + 1)
      .join('0')
      .split('')
      .map(parseFloat);
    var arr2 = new Array(data2.length + 1)
      .join('0')
      .split('')
      .map(parseFloat);
    var arr3 = new Array(data3.length + 1)
      .join('0')
      .split('')
      .map(parseFloat);
    var arr4 = new Array(data4.length + 1)
      .join('0')
      .split('')
      .map(parseFloat);

    var meds = [[], [], [], []];
    meds[0] = arr1;
    meds[1] = arr2;
    meds[2] = arr3;
    meds[3] = arr4;

    this.state = {
      meds: meds,
      amData: [0, 100, 0, 100, 0, 100, 0, 100],
      data: medicineData
    };
  }

  compareCards = (a,b) => {
    if (a.timeval[0] < b.timeval[0]) {
      return -1
    }
    else {
      return 1
    }
  }

  updateMeds = (time, index) => {

  };

  updateArray = time => {

  };

  onSwipeLeft = gestureState => {
    console.log("swiped left")
    var meds_new = new Array(data2.length + 1)
      .join('0')
      .split('')
      .map(parseFloat);
    this.setState({
      data: data2, //TODO: this should pull from database for previous date
      // meds: meds_new
    })
  };

  onSwipeRight = gestureState => {
    console.log("swiped right")
    var meds_new = new Array(data3.length + 1)
      .join('0')
      .split('')
      .map(parseFloat);
    this.setState({
      data: data3,
      // meds: meds_new
    })
  };

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
          {/* <Circle
            log={()=>{
              {navigate('Form', {
                log_type: 4
              })}
            }}
            amData={this.state.amData} /> */}
          <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
          <Text style={styles.titleText} >
              Today  |
            </Text>
            <Text style={styles.date} >
              {Moment().format('MMMM Do YYYY')}
            </Text>
          </View>

            <TouchableOpacity>

            </TouchableOpacity>
            <FlatList
              data={dummy_data.sort(this.compareCards)}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <DoseCard
                    title={item.title}
                    time={item.time}
                    dosage={item.dosage}
                    passed={item.status}
                    />
                    </View>
                  // <View>
                  //   <DoseCard
                  //     status={this.state.meds[0]}
                  //     setParentState={index => this.updateMeds(0, index, 1)}
                  //     time={'Dinonuggies'}
                  //     dosage={'500mg'}
                  //     data={this.state.data}
                  //     passed={2}
                  //   />
                  //   <DoseCard
                  //     status={this.state.meds[1]}
                  //     setParentState={index => this.updateMeds(1, index, 1)}
                  //     time={'Detergent'}
                  //     dosage={'45mg'}
                  //     data={this.state.data}
                  //     passed={2}
                  //   />
                  //   <DoseCard
                  //     status={this.state.meds[2]}
                  //     setParentState={index => this.updateMeds(2, index, 0)}
                  //     time={'Potato'}
                  //     dosage={'60mg'}
                  //     data={this.state.data}
                  //     passed={2}
                  //   />
                  //   <View style={{height: 2, width: "80%", margin: 5, alignSelf: "center", backgroundColor: "#f8ced5" }} />
                  //   <DoseCard
                  //     status={this.state.meds[3]}
                  //     setParentState={index => this.updateMeds(3, index, 0)}
                  //     time={'Groot'}
                  //     dosage={'400mg'}
                  //     data={this.state.data}
                  //     passed={1}
                  //   />
                  //   <DoseCard
                  //     status={this.state.meds[0]}
                  //     setParentState={index => this.updateMeds(0, index, 1)}
                  //     time={'Assortedpaints'}
                  //     dosage={'500mg'}
                  //     data={this.state.data}
                  //     passed={1}
                  //   />
                  //   <DoseCard
                  //     status={this.state.meds[1]}
                  //     setParentState={index => this.updateMeds(1, index, 1)}
                  //     time={'Mystery'}
                  //     dosage={'45mg'}
                  //     data={this.state.data}
                  //     passed={1}
                  //   />
                  //   <DoseCard
                  //     status={this.state.meds[2]}
                  //     setParentState={index => this.updateMeds(2, index, 0)}
                  //     time={'Charizard'}
                  //     dosage={'60mg'}
                  //     data={this.state.data}
                  //     passed={1}
                  //   />
                  //   <DoseCard
                  //     status={this.state.meds[3]}
                  //     setParentState={index => this.updateMeds(3, index, 0)}
                  //     time={'Navinramsaroop'}
                  //     dosage={'400mg'}
                  //     data={this.state.data}
                  //     passed={1}
                  //   />
                  //   <View style={{height: 2, width: "80%", margin: 5, alignSelf: "center", backgroundColor: "#7fdecb" }} />
                  //   <DoseCard
                  //     status={this.state.meds[0]}
                  //     setParentState={index => this.updateMeds(0, index, 1)}
                  //     time={'Runningoutofnames'}
                  //     dosage={'500mg'}
                  //     data={this.state.data}
                  //     passed={0}
                  //   />
                  //   <DoseCard
                  //     status={this.state.meds[1]}
                  //     setParentState={index => this.updateMeds(1, index, 1)}
                  //     time={'Ignore'}
                  //     dosage={'45mg'}
                  //     data={this.state.data}
                  //     passed={0}
                  //   />
                  //   <DoseCard
                  //     status={this.state.meds[2]}
                  //     setParentState={index => this.updateMeds(2, index, 0)}
                  //     time={'Slidingwheee'}
                  //     dosage={'60mg'}
                  //     data={this.state.data}
                  //     passed={0}
                  //   />
                  //   <DoseCard
                  //     status={this.state.meds[3]}
                  //     setParentState={index => this.updateMeds(3, index, 0)}
                  //     time={'Youfoundme'}
                  //     dosage={'400mg'}
                  //     data={this.state.data}
                  //     passed={0}
                  //   />
                    
                  // </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
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
    marginTop: 10,
    color: '#555555',
  },
});

export default CoolerMedicineView;
