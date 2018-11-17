import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal'
import Swipeout from 'react-native-swipeout';
import { CheckBox } from 'react-native-elements';
import constants from '../Resources/constants';
import {databaseTakeMedicine} from '../../databaseUtil/databaseUtil';
import Timeline from 'react-native-timeline-listview'

var background = ['#ffffff', '#ecfaf7', '#fcf0f2']
var border = ['#ffffff', '#7fdecb', '#f8ced5']
var text = ['#aaaaaa', '#373737', '#373737']

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  modalwrapper:{
    flexDirection:'row',
  },
  container: {
    flexDirection: 'column',
    flex:1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ecfaf7',
    borderColor: '#7fdecb',
    borderWidth: 2,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  titleText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#373737',
  },
  modaltitleText: {
    fontWeight: '600',
    fontSize: 22,
    color: '#373737',
    marginBottom: 10,
  },
  timeContainer: {
    marginTop: 1.5,
    paddingTop: 15,
    flex: 0.6,
    marginRight: 10,
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  timeStamp: {
    fontSize: 16,
    color: '#373737',
    fontWeight: '600',
    letterSpacing: 0.6
  },
  image_style: {
    height: 20,
    width: 20
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  noteText: {
    color: '#373737',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1.0
  },
  check: {
    backgroundColor: '#00000000',
    borderRadius: 0,
    borderColor: 'white',
    marginLeft: 0,
    marginRight: 0,
    padding: 0
  },
  swipe: {
    borderRadius: 10
  },
  modalButton: {
    backgroundColor: '#A0A0A0',
    fontSize: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  modalWrapper: { 
    flex: 1.0, 
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  more:{
    width:30,
    padding: 0,
    margin:0,
  }
});
class Card extends PureComponent {

  static propTypes = {
    time: PropTypes.array,
    takenTime: PropTypes.array,
    dosage: PropTypes.string,
    timeStamp: PropTypes.string,
    title: PropTypes.string,
    passed: PropTypes.array,
    buttonsRight: PropTypes.array
  };

  constructor(props) {

    super(props);

    var passed_index = 0
    if(this.props.passed){
        for (var x = 0; x < this.props.passed.length; x++) {
          if (this.props.passed[x] == false) {
            passed_index = x
            break
          }
        }
    }
    this.state = {
      time: this.props.time,
      takenTime: this.props.takenTime,
      status: this.props.status,
      passed: this.props.passed,
      passed_index: passed_index,
      backgroundColor: background[this.props.passed],
      borderColor: border[this.props.passed],
      textColor: text[this.props.passed],
      newhours: "hello",
      init_passed : passed_index,
      modalVisible: false,
      data: this.render_timeline()
      };
  }

  // determines new hours text
  _handleRenderText = () => {
    console.log("inside handle render text")
    var today = new Date();
    var current = new Date(this.state.time[this.state.passed_index])
    var curHour = current.getHours()
    var curMin  = current.getMinutes()
    var todayTimeSum = today.getHours()*60 + today.getMinutes();
    var currentTimeSum = curHour*60 + curMin;
    var numHours;

    if(this.state.passed_index >= this.state.passed.length){
      this.setState({
        newhours: "Done for the day",
        backgroundColor: background[0],
        borderColor: border[0],
        textColor: text[0],
      })
    }else if( Math.abs(todayTimeSum - currentTimeSum) < 15){
      this.setState({
        newhours: "Take Now",
        backgroundColor: background[1],
        borderColor: border[1],
        textColor: text[1],
      })
    }else if (todayTimeSum > currentTimeSum){
      if (today.getHours() - curHour == 1){
        numHours = "1 Hour Ago"
      } else if (today.getHours() == curHour){
        numHours = today.getMinutes() - curMin + " Minutes Ago"
      }else {
        numHours = today.getHours() - curHour + " Hours Ago"
      }
      this.setState({
        newhours: numHours,
        backgroundColor: background[2],
        borderColor: border[2],
        textColor: text[2],
      })
    }else{
      if(curHour >= 12){
        if(curHour == 12){
          numHours = "Take at " + 12
        }else{
          numHours = "Take at "+ (curHour - 12);
        }
        if( curMin != 0){
          numHours = numHours + ":" + curMin + " PM"
        }else{
          numHours = numHours + " PM"
        }
      }else{
        if( curHour == 1){
          numHours = "Take at " + 1;
        }else{
          numHours = "Take at "+ (curHour % 12);
        }
        if( curMin != 0){
          numHours = numHours + ":" + curMin + " AM"
        }else{
          numHours = numHours + " AM"
        }
      }
  
      this.setState({
        backgroundColor: background[0],
        borderColor: border[0],
        textColor: text[0],
        newhours: numHours,
      })
    }
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _handleClick = () => {
    console.log("inside handle click")
    //update datebase based on click
    title = 'Tylenol'
    dosage = '20 mg'
    time = '09:00'
  
    databaseTakeMedicine(new Date(),this.props.title,this.props.dosage,this.props.time[this.state.passed_index],!this.props.passed[this.state.passed_index])
    this.setState({
        status: !this.status,
    })
    var today = new Date();
    var current = new Date(this.state.time[this.state.passed_index])
    var todayTimeSum = today.getHours()*60 + today.getMinutes();
    var todayHour = today.getHours()
    var todayMin = today.getMinutes()
    var currentTimeSum = current.getHours()*60 + current.getMinutes();
    var newPassed = this.state.passed;
    var newInd = 0;


    // can click forward, it you are clicking a red time that you need to take, must go forward
    if( currentTimeSum - 15 < todayTimeSum ){
      newPassed[this.state.passed_index] = true;
      newInd = this.state.passed_index + 1;
      var taken_string = ""
      var taken_hours = todayHour
      var taken_mins = todayMin
      var am_pm = "AM"
      var min_string = taken_mins.toString()

      if (taken_hours >= 12 && taken_hours != 24){
        am_pm = "PM"
        if (taken_hours != 12){
          taken_hours = taken_hours - 12
        }
      }
      if (taken_mins <= 9){
        min_string = "0" + min_string
      }
      var tempData = this.state.data
      taken_string = "Taken at " + taken_hours.toString() + ":" + min_string + " " + am_pm
      tempData[this.state.passed_index].title = taken_string
      tempData[this.state.passed_index].circleColor = '#7fdecb'
      console.log("The index we are changing to green:" + this.state.passed_index)
      this.setState({
        passed_index: newInd,
        passed: newPassed,
        data: tempData
      }) 
      // can click backward
    }else if( newPassed.length > 0 && this.state.passed_index > this.state.init_passed){ 
      console.log("can click backward")
      var taken_string = "Not taken"
      newPassed[this.state.passed_index-1] = false;
      var current = new Date(this.state.time[this.state.passed_index-1])
      var currentTimeSum = current.getHours()*60 + current.getMinutes();
      var tempData = this.state.data
      var circleColor = "#49D2B7"
      if (this.state.data[this.state.passed_index - 1].circleColor == "#49D2B7") {
        console.log("currenttime sum" + currentTimeSum)
        console.log("todaysum" + todayTimeSum)
        if(currentTimeSum <= todayTimeSum + 15){
          console.log("inside red here")
          circleColor = "#fa8b89"
          taken_string = "Missed"
        }else{
          console.log("inside gray here")
          circleColor = "#cccccc"
        }
      }
      var taken_string = "Not taken"
      // var taken_hours = todayHour
      // var taken_mins = todayMin
      // var am_pm = "AM"
      // var min_string = taken_mins.toString()
      // if (taken_hours >= 12 && taken_hours != 24){
      //   am_pm = "PM"
      //   if (taken_hours != 12){
      //     taken_hours = taken_hours - 12
      //   }
      // }
      // if (taken_mins <= 9){
      //   min_string = "0" + min_string
      // }
      // taken_string = "Taken at " + taken_hours.toString() + ":" + min_string + " " + am_pm
      tempData[this.state.passed_index - 1].title = taken_string
      tempData[this.state.passed_index - 1].circleColor = circleColor
      this.setState({
        passed_index: this.state.passed_index-1,
        passed: newPassed,
        data: tempData
      })
    }
      console.log("this is the passed index" + this.state.passed_index)
      this._handleRenderText
    } 

  _handleModalPress = (data) => {
    var index = data.index
    var now = new Date();
    var current = new Date(this.state.time[index])
    var NowTimeSum = now.getHours()*60 + now.getMinutes();
    var currentTimeSum = current.getHours()*60 + current.getMinutes();
    
    // if green or red 
    if (currentTimeSum <= NowTimeSum + 15) {
      var taken_string = "Not taken"
      var tempData = this.state.data
      // checks green for taken
      var circleColor = '#49D2B7'
      var taken_hours = now.getHours()
      var taken_mins = now.getMinutes()
      var am_pm = "AM"
      var min_string = taken_mins.toString()
      if (taken_hours >= 12 && taken_hours != 24){
        am_pm = "PM"
        if (taken_hours != 12){
          taken_hours = taken_hours - 12
        }
      }
      if (taken_mins <= 9){
        min_string = "0" + min_string
      }
      console.log("handleModalPRees")
      taken_string = "Taken at " + taken_hours.toString() + ":" + min_string + " " + am_pm
      if (this.state.data[index].circleColor == "#49D2B7") {
        circleColor = "#cccccc"
        console.log("heppp")
        var taken_string = "Not taken"
      }
      tempData[index].circleColor = circleColor
      tempData[index].title = taken_string
      var tempPassed = this.state.passed
      tempPassed[index] = !tempPassed[index]
      this.setState({
        data: tempData,
        passed: tempPassed,
      })
      // this._handleRenderText()
      this._handleClick()
    }
  }

  // rerender_detail = (rowData, sectionID, rowID) => {
  //   return (
  //     <View style = {{flex: 1}}>
  //     <View style = {{flexDirection: 'row', paddingRight: 50}}>
  //     <Text style = {{marginLeft: 10, color: 'gray'}}>{rowData.title}</Text>
  //     </View>
  //     </View>
  //   )
  // }

  render_timeline = () => {
    return this.props.time.map ((val, i) => {
      var medTime = new Date()
      var medTimeSum = medTime.getHours()*60 + medTime.getMinutes();
      var current = new Date(val)
      var current_hours = current.getHours() 
      var current_mins = current.getMinutes()
      var curTimeSum = current_hours * 60 + current_mins
      var am_pm = "AM"
      var min_string = current_mins.toString()
      if (current_hours >= 12 && current_hours != 24){
        am_pm = "PM"
        if (current_hours != 12){
          current_hours = current_hours - 12
        }
      }
      if (current_mins <= 9){
        min_string = "0" + min_string
      }
      var hour_string = current_hours.toString() + ":" + min_string + " " + am_pm
      var circol;
      var taken_string = "Not taken"
      if(this.props.passed[i]){
        circol = "#49D2B7"
      }else if(!this.props.passed[i] &&  curTimeSum <= medTimeSum + 15){
        circol = "#fa8b89"
        taken_string = "Missed"
      }else{
        circol = "#cccccc"
      }
      if (this.props.takenTime[i] != ""){
        var takenTime = new Date(this.props.takenTime[i])
        var taken_hours = takenTime.getHours() + 1
        var taken_mins = takenTime.getMinutes()
        var am_pm = "AM"
        var min_string = taken_mins.toString()
        if (taken_hours >= 12 && taken_hours != 24){
          am_pm = "PM"
          if (taken_hours != 12){
            taken_hours = taken_hours - 12
          }
        }
        if (taken_mins <= 9){
          min_string = "0" + min_string
        }
        taken_string = "Taken at " + taken_hours.toString() + ":" + min_string + " " + am_pm
      }
      return {time: hour_string, description: hour_string, title: taken_string, circleColor: circol, index: i};
      })
  }

  render() {
    this._handleRenderText()
    return (
      <View style = {{flex:1}} >
            <View style={styles.wrapper}>
              <TouchableOpacity
                disabled={!this.props.buttonActive}
                onPress={() => this.props.onPress(time)}
              >
                <View style={[styles.container, {backgroundColor: this.state.backgroundColor, borderColor : this.state.borderColor, flex:1}]}>
                      <View style={styles.descriptionContainer}>
                          <View style = {{ flexDirection: 'column'}} >
                              <Text style={[styles.titleText,{color: this.state.textColor}]}>{this.props.title}</Text>
                              <Text style={{color: this.state.textColor}}>{this.props.dosage}</Text>
                          </View>
                            <TouchableOpacity
                              onPress = {this._handleClick}
                              style={{ flex: 1, alignItems: 'flex-end' }}
                            >
                              <View flexDirection="row" marginTop={7}>
                                <Text style = {{fontSize: 14, color: this.state.textColor}}> {this.state.newhours} </Text>
                                <TouchableOpacity  style = {styles.more} 
                                      onPress = {() => {
                                         this.setState ({
                                          modalVisible: true 
                                          })}}>
                                      <Image
                                      source = {require('../Resources/Images/smalldot.png')}
                                      resizeMode = 'contain'>
                                      </Image>
                                  </TouchableOpacity>
                              </View>
                              <View style={{ marginTop: 15 }} >
                              </View>
                            </TouchableOpacity>
                      </View>
                </View>
              </TouchableOpacity>
            </View>

        <Modal 
        isVisible={this.state.modalVisible} 
        style={styles.modalWrapper}
        onBackdropPress= {() => {this.setState({modalVisible: false})}}
        >
          <View style={{backgroundColor: 'white',  padding:20, borderRadius: 5, flex:this.state.passed.length * 0.15}} >
              <Text style={[styles.titleText,{color: this.state.textColor, paddingBottom: 15}]}>{this.props.title}</Text>
              <Timeline
              lineColor='#575757'
              data = {this.state.data}
              lineWidth = {1}
              circleSize = {18}
              circleColor='#575757'
              showTime = {false}
              // columnFormat = 'single-column-format'
              // descriptionStyle = {{color: 'gray'}}
              titleStyle = {{color: '#aaaaaa', fontSize: 12}}
              detailContainerStyle = {{paddingTop: 0}}
              onEventPress = {this._handleModalPress}
              // renderDetail = {() => this.rerender_detail}
              />
          </View>

        </Modal>
    </View>
    );
  }
}

export default Card;
