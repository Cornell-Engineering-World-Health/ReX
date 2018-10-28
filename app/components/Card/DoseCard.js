import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { CheckBox } from 'react-native-elements';
import constants from '../Resources/constants';
import {databaseTakeMedicine} from '../../databaseUtil/databaseUtil';

var background = ['#ffffff', '#ecfaf7', '#fcf0f2']
var border = ['#ffffff', '#7fdecb', '#f8ced5']
var text = ['#dddddd', '#373737', '#373737']
var mytext = ["","Take Now",  "Past Due"]

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
  }
});
class Card extends PureComponent {
  
  static propTypes = {
    time: PropTypes.array,
    dosage: PropTypes.string,
    timeStamp: PropTypes.string,
    title: PropTypes.string,
    passed: PropTypes.array,
  };

  /* Status:
     0 -> Taken (Grey)
     1 -> Take Now (Green)
     2 -> To take (Red)
     3 -> Temp Taken (Grey, was Green)
     4 -> Temp Taken (Grey, was Red) */
    
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      minHeight: 10,
      animation: new Animated.Value(),
      time: this.props.time,
      status: this.props.status,
      arrow: 'expand',
      passed: this.props.passed,
      passed_index: 0,
      backgroundColor: background[this.props.passed],
      borderColor: border[this.props.passed],
      textColor: text[this.props.passed],
      mytext: mytext[this.props.passed],
      newhours: "",
      };
  }

  // determines new hours text
  _handleRenderText = () => {
    console.log("rendering text");
    var today = new Date();
    var current = this.state.time[this.state.passed_index]
    var todayTimeSum = today.getHours()*60 + today.getMinutes();
    var currentTimeSum = current.getHours()*60 + current.getMinutes();

    if(this.state.passed_index >= this.state.passed.length){
      this.setState({
        newhours: "Done for the day"
      })
    }else if( Math.abs(todayTimeSum - currentTimeSum) < 15){
      this.setState({
        newhours: "Take Now"
      })
    }else if (!this.state.passed[this.state.passed_index]){
      this.setState({
        newhours: today.getHours() - current.getHours() + "Past Due"
      })
    }else{
      this.setState({
        newhours: "Take in " + current.getHours() - today.getHours()
      })
    }
  };

  _handlePress = () => {
    console.log('button pressed. ');
  };

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

  _handleClick = () => {
    //update datebase based on click
    title = 'Tylenol'
    dosage = '20 mg'
    time = '09:00'
    databaseTakeMedicine(new Date('2018-04-17'),title,dosage,time,!this.status)
    this.setState({
        status: !this.status,
    })
    
    if (this.state.passed == 1){
      this.setState({
        passed: 3,
        backgroundColor: background[0],
        borderColor: border[0],
        textColor: text[0],
        mytext : mytext[0],
        passed_index : this.state.passed_index + 1,
      })

    } else if (this.state.passed == 2){
      this.setState({
        passed: 4,
        backgroundColor: background[0],
        borderColor: border[0],
        textColor: text[0],
        mytext: mytext[0],
        passed_index : this.state.passed_index + 1,
      })
    }
    else if (this.state.passed == 3) {
        this.setState({
          passed: 1,
          backgroundColor: background[1],
          borderColor: border[1],
          textColor: text[1],
          mytext: mytext[1],
          passed_index : this.state.passed_index - 1,
        })
      }
      else if (this.state.passed == 4) {
        this.setState({
        passed: 2,
        backgroundColor: background[2],
        borderColor: border[2],
        textColor: text[2],
        mytext: mytext[2],
        passed_index : this.state.passed_index - 1,
        })
      }
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
            title={i.title}
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

  render() {
    const imageContainerStyle = [styles.imageContainer];

    var image = constants.DEFAULT.image;

    this._handleRenderText()

    return (
      <Animated.View style={[styles.wrapper, { width: this.state.animation }]}>
          <Swipeout
            right={this.props.buttonsRight}
            left={this.props.buttonsLeft}
            autoClose={true}
            style={styles.swipe}
            disabled={!this.props.swiperActive}
            onClose={this.props.onCloseSwipeout}
            onOpen={this.props.onOpenSwipeout}
          >
           <View
                  onLayout={this._setMaxHeight.bind(this)}
                >
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
                    <Text style={[styles.titleText,{color: this.state.textColor}]}>{this.props.time}</Text>
                    <Text style={{color: this.state.textColor}}>{this.props.dosage}</Text>
                  </View>
                  <TouchableOpacity
                    onPress = {this._handleClick}
                    style={{ flex: 1, alignItems: 'flex-end' }}
                  >
                    <View flexDirection="row" marginTop={7}>
                      <Text style = {{fontSize: 14, color: this.state.textColor}}> {this.state.mytext} </Text>
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
              </View>
            </TouchableOpacity>
            </View>
          </Swipeout>
      </Animated.View>
    );
  }
}

export default Card;
