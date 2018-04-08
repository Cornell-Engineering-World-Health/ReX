import { PieChart } from 'react-native-svg-charts'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import React, { Component } from 'react'
import constants from '../Resources/constants'
import MedicineCard from '../Card/MedicineCard'
import PillCard from '../Card/PillCard'
import { LinearGradient } from 'expo';


class Circle extends Component {
  constructor(props) {
    super(props);

  this.state = {
    meds: [[0,0,0,0,0],[0,0],[0,0], [0,0,0,0]],
    //colors:['#F46','#7FDECB80','#F46','#7FDECB80','#F46','#7FDECB80','#F46','#7FDECB80'],
    //colors:['#F46','#FD1A77','#F46','#FD1A77','#F46','#FD1A77','#F46','#FD1A77'],
    //innerColors:['#F46','#5C0A2C','#F46','#5C0A2C','#F46','#5C0A2C','#F46','#5C0A2C'],
    colors:['#6ef7c9','#6ef7c9','#ffffff','#ffffff','#6ef7c940','#6ef7c9','#6ef7c9','#6ef7c9'],
    innerColors:['#85ada040','#85ada0','#85ada040','#85ada0','#85ada040','#85ada0','#85ada040','#85ada0'],
    amData : [ 50, 50, 50, 50],
    pmData : [ 100, 0, 100, 0],
  }
}

  updateMeds = (time, index) => {
    newMeds = this.state.meds
    oldVal = this.state.meds[time][index]
    newMeds[time][index] = !oldVal
    console.log(newMeds[time])
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
    //console.log(newData)
    this.setState ({amData : newData})
  }

  render() {

    const choosecolor = (index) => this.state.colors[index]
    const chooseInnerColor = (index) => this.state.innerColors[index]

    const pieData = this.state.amData
        .filter(value => value >= 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: choosecolor(index),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))

    const innerPieData = this.state.pmData
      .filter(value => value >= 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: chooseInnerColor(index),
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }))

    return (
        <View flex = {1}>
        <View style = {styles.header}>

        <Text style = {styles.headerText}>
            Monday
        </Text>
        <Text style = {styles.headerText2}>
            March 12
        </Text>
        </View>
        {/*<View>
            <View flexDirection = 'row' style = {styles.images1}>
                <Image marginRight = {70} marginTop= {10} source = {require('../Resources/night2.png')}/>
                <Image source = {require('../Resources/icons8-sunrise-50.png')}/>
            </View>
            <View flexDirection = 'row' style = {styles.images2}>
                <Image marginRight= {70} source = {require('../Resources/icons8-sunset-50.png')}/>
                <Image marginTop = {10} source = {require('../Resources/icons8-sun-50.png')}/>
            </View>
        </View>
        <View style = {styles.plusUp} />
        <View style = {styles.plusUp2} />
        <View style = {styles.plusSide} />
        <View style = {styles.plusSide2} />*/}
        <View style = {styles.pie}>
        <PieChart
            paddingBottom = {150}
            sort = {(a,b) => 0 }
            padAngle = {0}
            innerRadius= {"83%"}
            style={ { position: 'absolute', top: 20, left: 20, width: 270, height: 270} }
            data={ pieData }
        />
        <PieChart
            paddingBottom = {150}
            sort = {(a,b) => 0 }
            padAngle = {0}
            innerRadius= {"88%"}
            style={ {  position: 'absolute', top: 44, left: 44, width: 222, height: 222} }
            data={ innerPieData }
        />
        <View style = {styles.hourHand} />
        <View style = {styles.minuteHand} />
        <View style = {styles.circleHand} />
        <View style= {styles.twelve}/>
        <View style= {styles.three}/>
        <View style= {styles.six} />
        <View style= {styles.nine}/>

        </View>
         
        </View>

    )
  }
}
const styles = StyleSheet.create({
    header: {
        marginTop: 30,
        marginBottom: 0,
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        margin: 0,
    },
    headerText2: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19.5,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#FFF3'
    },
    images1: {
        position: 'absolute',
        top: 80,
        left: 120,
    },
    images2:{
        position: 'absolute',
        left: 120,
        top: 180,
    },
    plusUp: {
        position: 'absolute',
        height: 13,
        width: 3,
        left: 200.5,
        top: 88,
        backgroundColor: 'grey'
    },
    plusUp2: {
        position: 'absolute',
        height: 13,
        width: 3,
        left: 199.5,
        top: 375,
        backgroundColor: 'grey',
        paddingBottom: 10,

    },
    plusSide: {
        position: 'absolute',
        height: 3,
        width: 13,
        left: 58,
        top: 227,
        backgroundColor: 'grey'
    },
    plusSide2: {
        position: 'absolute',
        height: 3,
        width: 13,
        left: 343,
        top: 227,
        backgroundColor: 'grey'
    },
    circle: {
      position: 'absolute',
      height: 320,
      width: 320,
      top: 110,
      left: 50,
      borderRadius: 160,
      borderColor: '#DAE8F6',
      borderWidth: 5,
    },
    pie: {
      height: 320,
      width: 320,
      top: 50,
      left: 50,
      borderRadius: 160,
      borderColor: '#ffffff',
      borderWidth: 5,
      shadowOffset:{  width: 0,  height: 0,  },
      shadowColor: 'grey',
      shadowRadius: 10,
      shadowOpacity: 0.6,
    },
    hourHand: {
      position: 'absolute',
      height: 4,
      width: 85,
      top: 187,
      left: 113.5,
      transform: [{rotate: '270deg'}],
      backgroundColor: 'black'
    },
    minuteHand: {
      position: 'absolute',
      height: 4,
      width: 146,
      top: 156.5,
      left: 144,
      transform: [{rotate: '180deg'}],
      backgroundColor: '#fd1a77'
    },
    circleHand: {
      position: 'absolute',
      backgroundColor: '#fd1a77',
      height: 6,
      width: 6,
      left: 153,
      top: 155,
      borderRadius: 3,
    },
    twelve: {
      position: 'absolute',
      top:0,
      right:157,
      height: 13,
      width: 3,
      backgroundColor: 'black',
      opacity: .1,
      borderRadius: 30,
    
    },
    three:{
        position: 'absolute',
        top:158,
        right:295,
        height: 3,
        width: 13,
        backgroundColor: 'black',
        opacity: .1,
        borderRadius: 30,
    },
    six:{
        position: 'absolute',
        top:295,
        right:157,
        height: 13,
        width: 3,
        backgroundColor: 'black',
        opacity: .1,
        borderRadius: 30,
    },
    nine:{
        position: 'absolute',
        top:158,
        left:295,
        height: 3,
        width: 13,
        backgroundColor: 'black',
        opacity: .1,
        borderRadius: 30,

    }

})
export default Circle
