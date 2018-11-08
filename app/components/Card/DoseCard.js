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
  Modal
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { CheckBox } from 'react-native-elements';
import constants from '../Resources/constants';
import {databaseTakeMedicine} from '../../databaseUtil/databaseUtil';

var background = ['#ffffff', '#ecfaf7', '#fcf0f2']
var border = ['#ffffff', '#7fdecb', '#f8ced5']
var text = ['#aaaaaa', '#373737', '#373737']

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'column',
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
  timeContainer: {
    marginTop: 1.5,
    paddingTop: 15,
    marginRight: 10,
    alignItems: 'flex-end',
    flex: 0.6,
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
});
class Card extends PureComponent {

  static propTypes = {
    time: PropTypes.array,
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
      expanded: false,
      minHeight: 2,
      animation: new Animated.Value(),
      time: this.props.time,
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
      this.setState({
        passed_index: newInd,
        passed: newPassed,
      }) 
      // can click backward
    }else if( newPassed.length > 0 && this.state.passed_index > this.state.init_passed){ 
      newPassed[this.state.passed_index-1] = false;
      this.setState({
        passed_index: this.state.passed_index-1,
        passed: newPassed,
      })
      console.log("asdkfhaso incefa")
    }
    console.log( newPassed.length > 0)
    console.log(this.state.passed_index > 0 )
    console.log(this.props.passed);
    console.log(!this.props.passed[this.state.passed_index-1] + "wtd")
      this._handleRenderText
    } 
  // toggle() {
  //   let initialValue = this.state.expanded
  //       ? this.state.maxHeight + this.state.minHeight
  //       : this.state.minHeight,
  //     finalValue = this.state.expanded
  //       ? this.state.minHeight
  //       : this.state.maxHeight + this.state.minHeight;

  //   var currentArrow = this.state.expanded ? 'collapse' : 'expand';

  //   this.setState({
  //     expanded: !this.state.expanded,
  //     arrow: currentArrow
  //   });

  //   this.state.animation.setValue(initialValue);
  //   Animated.spring(this.state.animation, {
  //     toValue: finalValue
  //   }).start();
  // }

  // _onCheck = index => {
  //   this.props.setParentState(index);
  //   this.forceUpdate();
  // };

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

  render_modal = () => {
    return this.state.time.map ((val, i) => {
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
      
      return (
        <View>
        <View style = {{flexDirection: 'row'}}>
        <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style = {{height: 20, width: 20, borderRadius: 10, backgroundColor: "#7fdecb"}} />
        <View style = {{height: 30, width: 5, backgroundColor: "#7fdecb"}} />
        </View>
        <Text style = {{marginLeft: 10, fontWeight: '500', fontSize: 16}}>{hour_string}</Text>
        </View>
        </View>
      )

      // if (this.state.passed[i]) {
      //   {console.log("shit")}
      //   return (
      //     <View style = {{flexDirection: 'row'}}>
      //     <View style = {{ justifyContent: 'center', alignItems: 'center'}}>
      //     <View style = {{height: 30, width: 30, borderWidth: 2, backgroundColor: "white", borderColor: 'green', borderRadius: 15}} />
      //     <View style ={{position: 'absolute', height: 20, width: 20, borderRadius: 10, backgroundColor: "green"}} />   
      //     </View>
      //     <Text>{this.props.title}</Text>
      //     <Text>{this.state.time}</Text>
      //     </View>
      //     )
      // }
      // else {
      //   return (
      //     <View style = {{flexDirection: 'row'}}>
      //     <View style = {{justifyContent: 'center', alignItems: 'center'}}>
      //     <View style = {{height: 30, width: 30, borderWidth: 2, backgroundColor: "white", borderColor: 'green', borderRadius: 15}} />
      //     <View style ={{position: 'absolute', height: 20, width: 20, borderRadius: 10, backgroundColor: "white"}} />   
      //     </View>
      //     <Text>{this.props.title}</Text>
      //     <Text>{this.state.time}</Text>
      //     </View>
      //     )
      // }
      
  })
}

  render() {
    this._handleRenderText()
    return (
      // <View style = {{flex:1}}>
      // <Modal 
      // animationType = {'slide'}
      // visible={this.state.modalVisible} 
      // backdropOpacity = {0.9}
      // transparent = {true}>
      // <View style = {{flex: 1, padding: 20, height: 100, width: 300}}>
      // {/* <TouchableHighlight
      //     onPress={() => {
      //     this.setModalVisible(!this.state.modalVisible);
      //     }}> */}
      // {/* <View style = {{flex: 1, flexDirection: 'column'}}> */}
      // {this.render_modal()}
      // {/* </View> */}
      // {/* </TouchableHighlight> */}
      // </View>
      // </Modal>
      <Animated.View style={[styles.wrapper, { height: this.state.animation }]}>
      
          <Swipeout
            right={[
              {
                text: 'Expand',
                type: 'edit',
                onPress: () => {
                  // this.toggle.bind(this)
                  this.setState ({
                    modalVisible: true
                  })
                  console.log("modalallala")
                  console.log(this.state.modalVisible)

                  /*force a render with new changes  */
                }
              }]}
            left={this.props.buttonsLeft}
            autoClose={true}
            style={styles.swipe}
            disabled={false}
            onClose={this.props.onCloseSwipeout}
            onOpen={this.props.onOpenSwipeout}
          >
           <View>
            <TouchableOpacity
              disabled={!this.props.buttonActive}
              onPress={() => this.props.onPress(time)}
            >
              <View style={[styles.container, {backgroundColor: this.state.backgroundColor, borderColor : this.state.borderColor}]}>
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
                  {console.log(this.state.passed_index)}
                    <View flexDirection="row" marginTop={7}>
                      <Text style = {{fontSize: 14, color: this.state.textColor}}> {this.state.newhours} </Text>
                      {/* <Image
                        style={styles.image_style}
                        source={() => {
                          if (this.state.arrow == 'expand') {
                            return require('../Resources/icons8-expand-arrow-50.png');
                          } else {
                            return require('../Resources/icons8-collapse-arrow-50.png');
                          }
                        }}
                      /> */}
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ marginTop: 15 }}
                  onLayout={this._setMaxHeight.bind(this)}
                >
                <Text> WASsup </Text>
                </View>
                </View>
            </TouchableOpacity>
            </View>
          </Swipeout>
      </Animated.View>
      // </View>
    );
  }
}

export default Card;
