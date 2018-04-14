import PropTypes from 'prop-types';
import { PieChart } from 'react-native-svg-charts'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import React, { Component } from 'react'
import constants from '../Resources/constants'
import MedicineCard from '../Card/MedicineCard'
import PillCard from '../Card/PillCard'
import { LinearGradient } from 'expo';


class Circle extends Component {
  static propTypes = {
    amData: PropTypes.array,
  };

  constructor(props) {
    super(props);

  this.state = {
    colors:['#6ef7c9','#6ef7c940','#6ef7c9','#6ef7c940', '#6ef7c9','#6ef7c940', '#6ef7c9','#6ef7c940'],
    innerColors:['#85ada015','#ffffff','#85ada015','#ffffff', '#85ada015','#ffffff', '#85ada015','#ffffff'],
    amData : this.props.amData,
  }
}

  render() {
    const rad = 5 * Math.PI / 180
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

    const innerPieData = this.state.amData
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
        
        <TouchableOpacity 
        style = {styles.button}
        onPress = {console.log("pressed")}
        >
         <Image style={styles.image} source = {require('../Resources/icons8-add.png')}/>
        </TouchableOpacity>
        </View>
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
        <View style= {styles.six} />

<View style = {[styles.twelve, {transform:[
{translateY:0},
{translateX:15},
{rotate: ("6deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:3},
{translateX:31},
{rotate: ("12deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:7},
{translateX:46},
{rotate: ("18deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:13},
{translateX:61},
{rotate: ("24deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:20},
{translateX:75},
{rotate: ("30deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:28},
{translateX:88},
{rotate: ("36deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:38},
{translateX:100},
{rotate: ("42deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:49},
{translateX:111},
{rotate: ("48deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:62},
{translateX:121},
{rotate: ("54deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:75},
{translateX:130},
{rotate: ("60deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:89},
{translateX:137},
{rotate: ("66deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:103},
{translateX:143},
{rotate: ("72deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:119},
{translateX:147},
{rotate: ("78deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:134},
{translateX:149},
{rotate: ("84deg")}]}]}
/>
<View style = {[styles.twelve, {transform:[
{translateY:150},
{translateX:150},
{rotate: ("90deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:-1},
{translateX:-0},
{rotate: ("-0deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:0},
{translateX:-15},
{rotate: ("-6deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:3},
{translateX:-31},
{rotate: ("-12deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:7},
{translateX:-46},
{rotate: ("-18deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:13},
{translateX:-61},
{rotate: ("-24deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:20},
{translateX:-75},
{rotate: ("-30deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:28},
{translateX:-88},
{rotate: ("-36deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:38},
{translateX:-100},
{rotate: ("-42deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:49},
{translateX:-111},
{rotate: ("-48deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:62},
{translateX:-121},
{rotate: ("-54deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:75},
{translateX:-130},
{rotate: ("-60deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:89},
{translateX:-137},
{rotate: ("-66deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:103},
{translateX:-143},
{rotate: ("-72deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:119},
{translateX:-147},
{rotate: ("-78deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:134},
{translateX:-149},
{rotate: ("-84deg")}]}]}
/>

<View style = {[styles.twelve, {transform:[
{translateY:150},
{translateX:-150},
{rotate: ("-90deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:0},
{translateX:15},
{rotate: ("-6deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-3},
{translateX:31},
{rotate: ("-12deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-7},
{translateX:46},
{rotate: ("-18deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-13},
{translateX:61},
{rotate: ("-24deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-20},
{translateX:75},
{rotate: ("-30deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-28},
{translateX:88},
{rotate: ("-36deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-38},
{translateX:100},
{rotate: ("-42deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-49},
{translateX:111},
{rotate: ("-48deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-62},
{translateX:121},
{rotate: ("-54deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-75},
{translateX:130},
{rotate: ("-60deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-89},
{translateX:137},
{rotate: ("-66deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-103},
{translateX:143},
{rotate: ("-72deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-119},
{translateX:147},
{rotate: ("-78deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-134},
{translateX:149},
{rotate: ("-84deg")}]}]}
/>



<View style = {[styles.six, {transform:[
{translateY:-0},
{translateX:-15},
{rotate: ("6deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-3},
{translateX:-31},
{rotate: ("12deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-7},
{translateX:-46},
{rotate: ("18deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-13},
{translateX:-61},
{rotate: ("24deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-20},
{translateX:-75},
{rotate: ("30deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-28},
{translateX:-88},
{rotate: ("36deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-38},
{translateX:-100},
{rotate: ("42deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-49},
{translateX:-111},
{rotate: ("48deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-62},
{translateX:-121},
{rotate: ("54deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-75},
{translateX:-130},
{rotate: ("60deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-89},
{translateX:-137},
{rotate: ("66deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-103},
{translateX:-143},
{rotate: ("72deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-119},
{translateX:-147},
{rotate: ("78deg")}]}]}
/>

<View style = {[styles.six, {transform:[
{translateY:-134},
{translateX:-149},
{rotate: ("84deg")}]}]}
/>

       

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
        height: 14,
        width: 3,
        left: 200.5,
        top: 88,
        backgroundColor: 'grey'
    },
    plusUp2: {
        position: 'absolute',
        height: 14,
        width: 3,
        left: 199.5,
        top: 375,
        backgroundColor: 'grey',
        paddingBottom: 10,

    },
    plusSide: {
        position: 'absolute',
        height: 3,
        width: 14,
        left: 58,
        top: 227,
        backgroundColor: 'grey'
    },
    plusSide2: {
        position: 'absolute',
        height: 3,
        width: 14,
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
      //backgroundColor: 'black'
    },
    minuteHand: {
      position: 'absolute',
      height: 4,
      width: 146,
      top: 156.5,
      left: 144,
      transform: [{rotate: '180deg'}],
      //backgroundColor: '#fd1a77'
    },
    circleHand: {
      position: 'absolute',
      //backgroundColor: '#fd1a77',
      height: 6,
      width: 6,
      left: 153,
      top: 155,
      borderRadius: 3,
    },
    twelve: {
      position: 'absolute',
      top:0,
      right:154.5,
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
        top:298.5,
        right:154.5,
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

    },
    button: {
        position: 'absolute',
        padding:50,
        right:10,
        top:9,
      },
      image:{
        position: 'absolute',
        right:0,
        top:0,
      },

})
export default Circle
