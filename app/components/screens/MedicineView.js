import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import Circle from '../MedicineComponents/Circle.js';
import PillCard from '../Card/PillCard';
import { LinearGradient } from 'expo';

var data1 = [{'title': 'Tylenol 20mg', 'time': '12:20PM',
  'status': false}, {'title': 'Motrin 30mg', 'time': '12:50PM', 'status': false},
  {'title': 'Ibuprofen 80mg', 'time': '2:50PM', 'status': false}, {'title': 'Humira 34mg', 'time': '1:25PM', 'status': false},
   {'title': 'Aspirin 20mg', 'time': '2:50PM', 'status': false},{'title': 'Humira 44mg', 'time': '12:50PM', 'status': false}]
var data2 = [{'title': 'Tylenol 20mg', 'time': '12:20PM',
         'status': false}, {'title': 'Motrin 30mg', 'time': '12:50PM', 'status': false},{'title': 'Tylenol 20mg', 'time': '12:20PM',
         'status': false},{'title': 'Tylenol 20mg', 'time': '12:20PM',
         'status': false},{'title': 'Tylenol 20mg', 'time': '12:20PM',
         'status': false},{'title': 'Tylenol 20mg', 'time': '12:20PM',
         'status': false}]
var data3 = [{'title': 'Tylenol 20mg', 'time': '12:20PM',
         'status': false}, {'title': 'Motrin 30mg', 'time': '12:50PM', 'status': false}]
var data4 = [{'title': 'Tylenol 20mg', 'time': '12:20PM',
         'status': false}, {'title': 'Advil 30mg', 'time': '12:50PM', 'status': false},
         {'title': 'Humira 100mg', 'time': '1:25PM', 'status': false}, {'title': 'Aspirin 30mg', 'time': '2:50PM', 'status': false}]
         

class CoolerMedicineView extends React.Component {

  static propTypes = {
    onPress: PropTypes.func
  }

  constructor(props) {
    super(props)

    var arr1 = new Array(data1.length+1).join('0').split('').map(parseFloat)
    var arr2 = new Array(data2.length+1).join('0').split('').map(parseFloat)
    var arr3 = new Array(data3.length+1).join('0').split('').map(parseFloat)
    var arr4 = new Array(data4.length+1).join('0').split('').map(parseFloat)

    var meds = [[], [], [], []]
    meds[0] = arr1
    meds[1] = arr2
    meds[2] = arr3
    meds[3] = arr4

    this.state = {
      meds : meds,
      amData : [ 0, 100, 0, 100, 0, 100, 0, 100],
    };
  }

  updateMeds = (time, index) => {
    newMeds = this.state.meds
    oldVal = this.state.meds[time][index]
    newMeds[time][index] = !oldVal
    this.setState ({meds : newMeds })
    this.updateArray(time)
  }


  updateArray = (time) => {
      newData = this.state.amData
      meds_list = this.state.meds[time]
      sum = meds_list.reduce((a, b) => a + b, 0);
      len = this.state.meds[time].length;
      newData[time*2] = 100 * (sum/len);
      newData[time*2+1] = 100 - newData[time*2];
      this.setState ({amData : newData})
  }

  render() {
    return (

        <View style = {{flex: 1}}>
        <View style = {{flex: 1}}>
        <Circle
        amData = {this.state.amData}
        />
        <View style = {{ flex: 0.75 }}>
        <FlatList
         data = {[0]}
         renderItem = {({ item, index }) => {
            return (
            <View>
                <PillCard
                status = {this.state.meds[0]}
                setParentState={index=>this.updateMeds(0, index, 1)}
                time = {"Morning"}
                data = {data1}
                />
                <PillCard
                status = {this.state.meds[1]}
                setParentState={index=>this.updateMeds(1, index, 1)}
                time = {"Afternoon"}
                data = {data2}
                />
                <PillCard
                status = {this.state.meds[2]}
                setParentState={index=>this.updateMeds(2, index, 0)}
                time = {"Evening"}
                data = {data3}

                />
                <PillCard
                status = {this.state.meds[3]}
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
        </View>

  )

  }}
  const styles = StyleSheet.create({
    
  })

export default CoolerMedicineView;