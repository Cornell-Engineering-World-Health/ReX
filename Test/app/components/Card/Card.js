import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import constants from './constants';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 20
  },
  shadowWrapper: {
    borderRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#808080',
    shadowOpacity: 0.5
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  imageContainer: {
    borderRadius: 20,
    backgroundColor: '#18F150'
  },
  imageStyle: {
    height: 100,
    width: 100,
    resizeMode: 'cover'
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    flex: 1,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 23,
    fontFamily: 'GillSans-SemiBold',
    color: '#000000'
  },
  timeContainer: {
    padding: 5,
    alignItems: 'flex-end',
    flex: 0.6
  },
  timeStamp: {
    fontSize: 20,
    fontFamily: 'GillSans-SemiBold',
    color: '#C4C4C3'
  },
  note: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'GillSans-Light',
    flex: 3
  },
  swipe: {
    borderRadius: 20
  }
});
class Card extends Component {
  static propTypes = {
    title: PropTypes.string,
    timeStamp: PropTypes.string,
    note1: PropTypes.string,
    note2: PropTypes.string,
    image: PropTypes.number,
    backgroundColor: PropTypes.string,
    buttonActive: PropTypes.bool,
    swiperActive: PropTypes.bool,
    buttonsRight: PropTypes.array,
    buttonsLeft: PropTypes.array,
    iconName: PropTypes.string,
    onPress: PropTypes.func,
    onCloseSwipeout: PropTypes.func,
    onOpenSwipeout: PropTypes.func
  };
  constructor(props) {
    super(props);
  }

  _handlePress = () => {
    console.log('button pressed. ');
  };

  render() {
    const swipeoutSettings = {
      autoClose: true,
      onClose: this.props.onCloseSwipeout,
      onOpen: this.props.onOpenSwipeout
    };

    const imageContainerStyle = [styles.imageContainer];
    var image = constants.DEFAULT_IMAGE;
    var backgroundColorTemp = constants.DEFAULT_BACKGROUND_COLOR;
    if (this.props.iconName) {
      if (this.props.iconName == 'headache') {
        image = constants.HEADACHE_IMAGE;
        backgroundColorTemp = constants.HEADACHE_BACKGROUND_COLOR;
      } else if (this.props.iconName == 'neck-pain') {
        image = constants.NECKPAIN_IMAGE;
        backgroundColorTemp = constants.NECKPAIN_BACKGROUND_COLOR;
      } else if (this.props.iconName == 'leg-pain') {
        image = constants.LEGPAIN_IMAGE;
        backgroundColorTemp = constants.LEGPAIN_BACKGROUND_COLOR;
      } else if (this.props.iconName == 'knee-pain') {
        image = constants.KNEEPAIN_IMAGE;
        backgroundColorTemp = constants.KNEEPAIN_BACKGROUND_COLOR;
      }
    } else {
      if (this.props.backgroundColor) {
        backgroundColorTemp = this.props.backgroundColor;
      }
      if (this.props.image) {
        image = this.props.image;
      }
    }

    imageContainerStyle.push({
      backgroundColor: backgroundColorTemp
    });

    const swipeSettings = {
      autoClose: true
    };

    return (
      <View style={styles.wrapper}>
        <View style={styles.shadowWrapper}>
          <Swipeout
            backgroundColor={'#E7EDE9'}
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
              onPress={this.props.onPress}
            >
              <View style={styles.container}>
                <View style={imageContainerStyle}>
                  <Image style={styles.imageStyle} source={image} />
                </View>

                <View style={styles.descriptionContainer}>
                  <View>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    <Text style={styles.note}> {this.props.note1} </Text>
                    <Text style={styles.note}> {this.props.note2} </Text>
                  </View>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeStamp}>{this.props.timeStamp}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Swipeout>
        </View>
      </View>
    );
  }
}

export default Card;
