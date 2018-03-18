import { PieChart } from 'react-native-svg-charts'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import React, { Component } from 'react'
import constants from '../Resources/constants';
import MedicineCard from '../Card/MedicineCard'

class Circle extends Component {
  constructor(props) {
    super(props);
  
  this.state = {
    meds: [[0,0,0,0,0],[0,0],[0,0], [0,0,0,0]],
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
        <View flex = {1}>
        <View style = {styles.header}>
        <Text style = {styles.headerText}>
            Monday
        </Text>
        <Text style = {styles.headerText2}>
            March 12
        </Text>
        </View>
    
         <FlatList
         data = {[0]}
         renderItem = {({ item, index }) => {
            return (
            <View>
             <View>
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
        <View style = {styles.plusSide2} />
        <PieChart
            paddingBottom = {150}
            sort = {(a,b) => 0 }
            padAngle = {0}
            innerRadius= {"90%"}
            style={ { height: 270, marginTop: 30} }
            data={ pieData }
        />    
            <MedicineCard
            checked = {this.state.meds[0][0]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(0, 0)}
            buttonActive = {true}
            />
           <MedicineCard
            checked = {this.state.meds[0][1]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(0, 1)}
            buttonActive = {true}
            />
           <MedicineCard
            checked = {this.state.meds[0][2]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(0, 2)}
            buttonActive = {true}
            />
             <MedicineCard
            checked = {this.state.meds[0][3]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(0, 3)}
            buttonActive = {true}
            />
           <MedicineCard
           checked = {this.state.meds[0][4]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(0, 4)}
            buttonActive = {true}
            />
           <MedicineCard
            checked = {this.state.meds[1][0]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(1, 0)}
            buttonActive = {true}
            /> 
             <MedicineCard
            checked = {this.state.meds[1][1]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(1, 1)}
            buttonActive = {true}
            />
           <MedicineCard
           checked = {this.state.meds[2][0]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(2, 0)}
            buttonActive = {true}
            />
           <MedicineCard
           checked = {this.state.meds[2][1]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(2, 1)}
            buttonActive = {true}
            />
             <MedicineCard
             checked = {this.state.meds[3][0]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(3, 0)}
            buttonActive = {true}
            />
           <MedicineCard
           checked = {this.state.meds[3][1]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(3, 1)}
            buttonActive = {true}
            />
           <MedicineCard
           checked = {this.state.meds[3][2]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(3, 2)}
            buttonActive = {true}
            />  
            <MedicineCard
            checked = {this.state.meds[3][3]}
            title = "My name i"
            timeStamp = "4:20 AM"
            note1 = "My name iSS eashan"
            note2 = "Im very tired"
            cardData = {constants.HEADACHE}
            backgroundColor = "#ffff"
            clicked = {true}
            onPress = {() => this.updateMeds(3, 3)}
            buttonActive = {true}
            />
              
            </View>
            );
         }}
         />
         
         </View>
    )
  }
}
const styles = StyleSheet.create({
    header: {
        marginTop: 20,
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
        top: 70,
        left:100,
    },
    images2:{
        position: 'absolute',
        left: 100,
        top: 180,
    },
    plusUp: {
        position: 'absolute',
        height: 13,
        width: 3,
        left: 185.5,
        top: 18,
        backgroundColor: 'grey'
    },
    plusUp2: {
        position: 'absolute',
        height: 13,
        width: 3,
        left: 184.5,
        top: 300,
        backgroundColor: 'grey',
        paddingBottom: 10,

    },
    plusSide: {
        position: 'absolute',
        height: 3,
        width: 13,
        left: 40,
        top: 177,
        backgroundColor: 'grey'
    },
    plusSide2: {
        position: 'absolute',
        height: 3,
        width: 13,
        left: 322,
        top: 177,
        backgroundColor: 'grey'
    }
})
export default Circle