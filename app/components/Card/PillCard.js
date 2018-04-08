import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { CheckBox } from 'react-native-elements'
import constants from '../Resources/constants';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 3,
    borderColor: '#DFDFDF',
    borderWidth : 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    overflow:'hidden',
  },

  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  descriptionContainer: {
    flexDirection : 'row',
    flex: 1,
    alignItems : 'flex-end'
  },
  titleText: {
    fontWeight: '600',
    fontSize: 19,
    letterSpacing: .5,
    color: '#373737',
    fontFamily: 'Chalkboard SE',
  },
  timeContainer: {
    marginTop: 1.5,
    paddingTop: 15,
    marginRight: 10,
    alignItems: 'flex-end',
    flex: 0.6
  },
  timeStamp: {
    fontSize: 16,
    color: '#a9a9a9',
    fontWeight: '600',
    letterSpacing: 0.6
  },
  image_style :{
    height : 20,
    width: 20,

  },
  note : {
      flexDirection:'row',
      alignItems: 'center',
  },
  noteText: {
    color: '#808080',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1.0,
  },
  check:{
    backgroundColor: 'white',
    borderRadius: 0,
    borderColor: 'white',
    marginLeft: 0,
    marginRight: 0,
    padding :0,
  },
  swipe: {
    borderRadius: 10
  }
});
class Card extends PureComponent {
  static propTypes = {
    time: PropTypes.string,
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
    cardData: PropTypes.obj,
    data: PropTypes.array,
    status: PropTypes.array
  };
  constructor(props) {
    super(props);
    this.state = {
        expanded : true,
        //maxHeight : 0,
        minHeight : 10,
        animation : new Animated.Value(),
        status : this.props.status,
    }
  }

  _handlePress = () => {
    console.log('button pressed. ');
  };

  _setMaxHeight(event){
    this.setState({
        maxHeight   : event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event){
    this.setState({
        minHeight   : event.nativeEvent.layout.height + 25
    })
  }

  toggle(){
    //Step 1
    console.log("help")
    let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
        finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
        expanded : !this.state.expanded  //Step 2
    });

    this.state.animation.setValue(initialValue);  //Step 3
    Animated.spring(     //Step 4
        this.state.animation,
        {
            toValue: finalValue
        }
    ).start();  //Step 5
}

    _onCheck = (index) => {
      this.props.setParentState(index)
      status = this.state.status
      status[index] = !status[index]
      this.props.data[index].status = !this.props.data[index].status
      this.setState({
          status: status //Step 2
        })
      this.forceUpdate()
    }

  makePills(data) {
      console.log('hello?')
      return data.map((i , index) =>{
          return(
              <View style = {styles.note}>
              <CheckBox
                onPress = {() => {this._onCheck(index)}}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.status[index]}
                containerStyle = {styles.check}
                size = '25'
                title = {i.title}
                checkedColor = '#63f3c9'
                textStyle = {styles.noteText}
                />
                <View flex = {1} alignItems='flex-end'>
                    <Text style ={ styles.noteText}>
                        {i.time}
                    </Text>
                </View>
              </View>
          )
      })
  }

  render() {
    const imageContainerStyle = [styles.imageContainer];

    var image = constants.DEFAULT.image;
    var time= "Morning";

    return (
      <Animated.View style={[styles.wrapper, {height: this.state.animation}]}>
        <View >
          <Swipeout
            right={this.props.buttonsRight}
            left={this.props.buttonsLeft}
            autoClose={true}
            style={styles.swipe}
            disabled={!this.props.swiperActive}
            onClose={this.props.onCloseSwipeout}
            onOpen={this.props.onOpenSwipeout}
          >
            <TouchableOpacity
              disabled={!this.props.buttonActive}
              onPress={() => this.props.onPress(time)}
            >
              <View style={styles.container}>

                <View style={styles.descriptionContainer} onLayout={this._setMinHeight.bind(this)}>
                  <View>
                    <Text style={styles.titleText}>{time}</Text>
                  </View>
                  <View >
                  <View marginTop = {6.5} flex = {1} marginLeft= {170} >
                  <TouchableOpacity onPress = {this.toggle.bind(this)} >
                    <View flexDirection = 'row' >
                    <Text >Show Pills </Text>
                    <Image style = {styles.image_style} source = {require('../Resources/icons8-expand-arrow-50.png') }/>
                    </View>
                  </TouchableOpacity>
                  </View>
                  </View>
                  </View>
                  <View style = {{marginTop: 15}} onLayout =
                  {this._setMaxHeight.bind(this)}>
                      {this.makePills(this.props.data)}
                  </View>
              </View>
            </TouchableOpacity>
          </Swipeout>
        </View>
      </Animated.View>
    );
  }
}

export default Card;
