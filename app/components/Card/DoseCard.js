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
    this.data = this.render_timeline();

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
      expanded: false,
      minHeight: 2,
      animation: new Animated.Value(),
      time: this.props.time,
      takenTime: this.props.takenTime,
      status: this.props.status,
      arrow: 'expand',
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

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height + 25
    });
  }

  toggle() {
    let initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded,
    });

    console.log("expanded")
    console.log(this.state.expanded)

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  modalCallback = () => {
    this.forceUpdate()
    this.setState({modalVisible: false})
  }

  // determines new hours text
  _handleRenderText = () => {
    var today = new Date();
    var current = new Date(this.state.time[this.state.passed_index])
    var todayTimeSum = today.getHours()*60 + today.getMinutes();
    var currentTimeSum = current.getHours()*60 + current.getMinutes();

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
      var numHours = 0;
      if (today.getHours() - current.getHours() == 1){
        numHours = "1 Hour Ago"
      } else if (today.getHours() == current.getHours()){
        numHours = today.getMinutes() - current.getMinutes() + " Minutes Ago"
      }else {
        numHours = today.getHours() - current.getHours() + " Hours Ago"
      }
      this.setState({
        newhours: numHours,
        backgroundColor: background[2],
        borderColor: border[2],
        textColor: text[2],
      })
    }else{
      var numHours;
      var min = current.getMinutes();
      if(current.getHours() >= 12){
        if( current.getHours() == 13){
          numHours = "Take at " + 1
        }else if(current.getHours() == 12){
          numHours = "Take at " + 12
        }else{
          numHours = "Take at "+ (current.getHours() - 12);
        }
        if( min != 0){
          numHours = numHours + ":" + min + " PM"
        }else{
          numHours = numHours + " PM"
        }
      }else{
        if( current.getHours() == 1){
          numHours = "Take at " + 1;
        }else{
          numHours = "Take at "+ (current.getHours() % 12);
        }
        if( min != 0){
          numHours = numHours + ":" + min + " AM"
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
    var currentTimeSum = current.getHours()*60 + current.getMinutes();

    var newPassed = this.state.passed;
    var newInd = 0;
    // can click forward
    if( currentTimeSum - 15 < todayTimeSum ){
      newPassed[this.state.passed_index] = true;
      newInd = this.state.passed_index + 1;
      var tempData = this.state.data
      var circleColor = "#49D2B7"
      if (this.state.data[this.state.passed_index].circleColor == "#49D2B7") {
        circleColor = "#cccccc"
      }
      var taken_string = ""
      var tempData = this.state.data
      var circleColor = "#49D2B7"
      var taken_hours = today.getHours()
        var taken_mins = today.getMinutes()
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
      // if (this.state.data[this.state.passed_index].circleColor == "#49D2B7") {
      //   var taken_string = "Not taken"
      // }
      tempData[this.state.passed_index].title = taken_string
      tempData[this.state.passed_index].circleColor = circleColor
      this.setState({
        passed_index: newInd,
        passed: newPassed,
        data: tempData
      }) 
      // can click backward
    }else if( newPassed.length > 0 && this.state.passed_index > this.state.init_passed){ 
      newPassed[this.state.passed_index-1] = false;
      var tempData = this.state.data
      var circleColor = "#49D2B7"
      if (this.state.data[this.state.passed_index - 1].circleColor == "#49D2B7") {
        circleColor = "#cccccc"
      }
      var taken_string = "Not taken"
      var tempData = this.state.data
      var circleColor = "#49D2B7"
      var taken_hours = today.getHours()
        var taken_mins = today.getMinutes()
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
      tempData[this.state.passed_index - 1].circleColor = circleColor
      this.setState({
        passed_index: this.state.passed_index-1,
        passed: newPassed,
        data: tempData
      })
      console.log("asdkfhaso incefa")
    }
    console.log( newPassed.length > 0)
    console.log(this.state.passed_index > 0 )
    console.log(this.props.passed);
    console.log(!this.props.passed[this.state.passed_index-1] + "wtd")
      this._handleRenderText
    } 

  makePills(data) {
    return data.map((i, index) => {
      return (
        <View style={styles.note}>
          <CheckBox
            onPress={() => {
              this._onCheck(index);
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.status[index]}
            containerStyle={styles.check}
            size="25"
            title={this.state.title}
            checkedColor="#63f3c9"
            textStyle={styles.noteText}
          />
          <View flex={1} alignItems="flex-end">
            <Text style={styles.noteText}>{i.time}</Text>
          </View>
        </View>
      );
    });
  }

  _handleModalPress = (data) => {
    var index = data.index

    var today = new Date();
    var current = new Date(this.state.time[index])
    var todayTimeSum = today.getHours()*60 + today.getMinutes();
    var currentTimeSum = current.getHours()*60 + current.getMinutes();
    
    if (currentTimeSum <= todayTimeSum + 15) {
      var taken_string = "Not taken"
      var tempData = this.state.data
      var circleColor = "#49D2B7"
      var taken_hours = today.getHours()
        var taken_mins = today.getMinutes()
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
      if (this.state.data[index].circleColor == "#49D2B7") {
        circleColor = "#cccccc"
        var taken_string = "Not taken"
      }
      tempData[index].circleColor = circleColor
      tempData[index].title = taken_string
      this.setState({
        data: tempData,
      })
      // this._handleClick()
      this.forceUpdate()
    }
    
  }

  rerender_detail = (rowData, sectionID, rowID) => {
    return (
      <View style = {{flex: 1}}>
      <View style = {{flexDirection: 'row', paddingRight: 50}}>
      <Text style = {{marginLeft: 10, color: 'gray'}}>{rowData.title}</Text>
      </View>
      </View>
    )
  }

  render_timeline = () => {
    console.log("hi")
    return this.props.time.map ((val, i) => {
      var current = new Date(val)
      var current_hours = current.getHours() + 1
      var current_mins = current.getMinutes()
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
      if(this.props.passed[i]){
        circol = "#49D2B7"
      }else{
        circol = "#cccccc"
      }
      var taken_string = "Not taken"
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
                      <View
                        style={styles.descriptionContainer}
                        onLayout={this._setMinHeight.bind(this)}
                      >
                    
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
                                      onPress = {() => { this.setState ({
                                      modalVisible: true })}}>
                                      <Image
                                      source = {require('../Resources/Images/smalldot.png')}
                                      resizeMode = 'contain'>
                                      </Image>
                                  </TouchableOpacity>
                              </View>
                              <View
                                style={{ marginTop: 15 }}
                                onLayout={this._setMaxHeight.bind(this)}
                              >
                              </View>
                            </TouchableOpacity>
        
                      </View>
                </View>
              </TouchableOpacity>
            </View>

        <Modal 
        isVisible={this.state.modalVisible} 
        style={styles.modalWrapper}
        onBackdropPress={() => {this.modalCallback}}
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
