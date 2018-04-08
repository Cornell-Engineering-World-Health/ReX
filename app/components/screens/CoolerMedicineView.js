import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import Circle from '../MedicineComponents/Circle.js';
import PillCard from '../Card/PillCard';

var data1 = [{'title': 'Donut 20mg', 'time': '12:20PM',
  'status': false}, {'title': 'Napkin 30mg', 'time': '12:50PM', 'status': false},
  {'title': 'Ibuprofen 80mg', 'time': '2:50PM', 'status': false}, {'title': 'Bracy 3410mg', 'time': '1:25PM', 'status': false},
   {'title': 'Katy 2000mg', 'time': '2:50PM', 'status': false},{'title': 'Bracy 4410mg', 'time': '12:50PM', 'status': false}]
  var data2 = [{'title': 'Donut 20mg', 'time': '12:20PM',
         'status': false}, {'title': 'Napkin 30mg', 'time': '12:50PM', 'status': false},{'title': 'Donut 20mg', 'time': '12:20PM',
         'status': false},{'title': 'Donut 20mg', 'time': '12:20PM',
         'status': false},{'title': 'Donut 20mg', 'time': '12:20PM',
         'status': false},{'title': 'Donut 20mg', 'time': '12:20PM',
         'status': false}]
  var data3 = [{'title': 'Donut 20mg', 'time': '12:20PM',
         'status': false}, {'title': 'Napkin 30mg', 'time': '12:50PM', 'status': false}]
  var data4 = [{'title': 'Donut 20mg', 'time': '12:20PM',
         'status': false}, {'title': 'Eashan 30mg', 'time': '12:50PM', 'status': false},
         {'title': 'Bracy 100mg', 'time': '1:25PM', 'status': false}, {'title': 'Katy 2000mg', 'time': '2:50PM', 'status': false}]

class CoolerMedicineView extends React.Component {
       
  constructor(props) {
    super(props)

    this.state = {
      meds : [[0,0,0,0,0],[0,0],[0,0], [0,0,0,0]],
      pmData : [ 0,100, 0,100], 
      amData : [ 0,100, 0,100],
    }
  }
 
  updateMeds = (time, index, amPm) => {
    newMeds = this.state.meds
    oldVal = this.state.meds[time][index.index]
    newMeds[time][index.index] = !oldVal
//console.log(oldVal)
//    console.log(index)
//    console.log(this.state.meds[0] )
//    console.log(time)
    this.setState ({meds : newMeds })
    this.updateArray(time, amPm)
  }

  updateArray = (time) => {
    newData = this.state.data
    meds_list = this.state.meds[time]
    sum = meds_list.reduce((a, b) => a + b, 0);
    len = this.state.meds[time].length;
    newData[time*2] = 100 * (sum/len);
    console.log(newData)
    newData[time*2+1] = 100 - newData[time*2];
    this.setState ({data : newData})
  }

  _onCheck = (index) => {
    this.setState({index : index})
    this.updateMeds(0, this.state.index)
  }

  render() {
    return (
        <View>
        <Circle
        amData = {this.state.amData}
        pmData = {this.state.pmData}
        meds = {this.state.meds}
        />
        <View style = {{marginTop: 400}}>
        <FlatList
         data = {[0]}
         renderItem = {({ item, index }) => {
            return (
            <View>
                <PillCard 
                status = {this.state.meds}
                setParentState={index=>this.updateMeds(0, index, 1)}
                time = {"Morning"}
                data = {data1}
                />
                <PillCard
                status = {this.state.meds}
                setParentState={index=>this.updateMeds(1, index, 1)}
                time = {"Afternoon"}
                data = {data2}
                />
                <PillCard 
                status = {this.state.meds}
                setParentState={index=>this.updateMeds(2, index, 0)}
                time = {"Evening"}
                data = {data3}
      
                />
                <PillCard
                status = {this.state.meds}
                setParentState={index=>this.updateMeds(3, index, 0)}
                time = {"Night"}
                data = {data4}
                />
            </View>
            );
         }}
         />
         </View>
         
        </View>
  )

  }
}
export default CoolerMedicineView;
