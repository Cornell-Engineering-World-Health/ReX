import {TouchableOpacity, View, Text, StyleSheet, Animated} from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import React, { Component } from 'react'

class Circle extends Component {
  constructor(props) {
    super(props);
  
  this.state = {
    meds: [[0,0,0,0,0],[1,1],[0,0], [1,1,1,1]],
    colors:['#F46','#7FDECB80','#F46','#7FDECB80','#F46','#7FDECB80','#F46','#7FDECB80'],
    data : [ 0,100, 0,100,0,100,0,100],
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
    newData = this.state.data
    meds_list = this.state.meds[time]
    sum = meds_list.reduce((a, b) => a + b, 0);
    len = this.state.meds[time].length;
    newData[time*2] = 100 * (sum/len);
    newData[time*2+1] = 100 - newData[time*2];
    //console.log(newData)
    this.setState ({data : newData})
  }

  
  
  render() {

    const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
    const choosecolor = (index) => this.state.colors[index]

    const pieData = this.state.data
        .filter(value => value >= 0)
        .map((value, index) => ({
            value,
            svg: {
                fill: choosecolor(index),
                onPress: () => console.log('press', index),
            },
            key: `pie-${index}`,
        }))

    return (
        <View>
        <PieChart
            sort = {(a,b) => 0 }
            padAngle = {0}
            innerRadius= {"90%"}
            style={ { height: 270,  marginTop: 100} }
            data={ pieData }
        />
        <TouchableOpacity style = {styles.button}
        style = {{alignSelf: 'center'}}
        onPress= {() => this.updateArray(1)} 
        >
            <Text> Press Me </Text>
        </TouchableOpacity >
        <TouchableOpacity style = {styles.button}
        style = {{alignSelf: 'center'}}
        onPress= {() => this.updateMeds(0,0)} 
        >
        <Text> Morning 1</Text>
        </TouchableOpacity>
        
         <TouchableOpacity style = {styles.button}
         style = {{alignSelf: 'center'}}
         onPress= {() => this.updateMeds(0,1)} 
         >
         <Text> Morning 2 </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.button}
         style = {{alignSelf: 'center'}}
         onPress= {() => this.updateMeds(0,2)} 
         >
         <Text> Morning 3 </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.button}
         style = {{alignSelf: 'center'}}
         onPress= {() => this.updateMeds(0,3)} 
         >
         <Text > Morning 4 </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.button}
         style = {{alignSelf: 'center'}}
         onPress= {() => this.updateMeds(0,4)} 
         >
         <Text > Morning 5 </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.button}
         style = {{alignSelf: 'center'}}
         onPress= {() => this.updateMeds(2,0)} 
         >
         <Text > Evening 1 </Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.button}
         style = {{alignSelf: 'center'}}
         onPress= {() => this.updateMeds(2,1)} 
         >
         <Text > Evening 2 </Text>
         </TouchableOpacity>
         </View>
    )
  }
}
const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: '#FFF3'
    }
})
export default Circle