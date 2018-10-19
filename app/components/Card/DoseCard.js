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
    time: PropTypes.string,
    dosage: PropTypes.string,
    timeStamp: PropTypes.string,
    note1: PropTypes.string,
    note2: PropTypes.string,
    image: PropTypes.number,
    backgroundColor: PropTypes.string,
    buttonActive: PropTypes.bool,
    swiperActive: PropTypes.bool,
    buttonsRight: PropTypes.array,
    buttonsLeft: PropTypes.array,
    onPress: PropTypes.func,
    onCloseSwipeout: PropTypes.func,
    onOpenSwipeout: PropTypes.func,
    cardData: PropTypes.object,
    setParentState: PropTypes.func,
    data: PropTypes.array,
    status: PropTypes.array,
    passed: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      minHeight: 10,
      animation: new Animated.Value(),
      status: this.props.status,
      arrow: 'expand',
      backgroundColor: this.props.passed == true ? '#fcf0f2' : '#ecfaf7' ,
      borderColor: this.props.passed == true ? '#F8CED5' : '#7fdecb',
      textColor: '#000000',
      passed: this.props.passed
      };
  }

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

    if (this.state.backgroundColor == '#ecfaf7' || this.state.backgroundColor == '#fcf0f2' ){
      console.log(this.state.passed)
      this.setState({
        backgroundColor: '#FFFFFF',
        borderColor:'#FFFFFF' ,
        textColor: '#DDDDDD',
      })

    } else {
      if (this.state.passed == 0){
      this.setState({
        backgroundColor: '#ecfaf7',
        borderColor:'#7fdecb',
        textColor: '#373737',
      })
    } else {
        this.setState({
          backgrounColor: '#fcf0f2',
          borderColor: '#F8CED5',
          textColor: '#373737',
        })
      }
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
                      <Text style = {{fontSize: 14, color: this.state.textColor}}> Take Now </Text>
                      <Image
                        style={styles.image_style}
                        source={() => {
                          if (this.state.arrow == 'expand') {
                            return require('../Resources/icons8-expand-arrow-50.png');
                          } else {
                            return require('../Resources/icons8-collapse-arrow-50.png');
                          }
                        }}
                      />
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
