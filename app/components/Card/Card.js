import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import constants from './constants';

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    borderRadius: 10
  },
  shadowWrapper: {
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#808080',
    shadowOpacity: 0.5
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  imageContainer: {
    borderRadius: 5,
    backgroundColor: '#18F150'
  },
  imageRightBuffer: {
    position: 'absolute',
    marginLeft: 82,
    paddingTop: 120,
    paddingRight: 18
  },
  imageStyle: {
    height: 100,
    width: 100
  },
  imageStyle2: {
    position: 'absolute',
    marginTop: 23,
    marginLeft: 23,
    height: 50,
    width: 50,
    resizeMode: 'cover'
  },
  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    flex: 1,
    alignItems: 'center'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1.5,
    color: '#373737'
  },
  timeContainer: {
    marginTop: 1.5,
    paddingTop: 15,
    marginRight: 20,
    alignItems: 'flex-end',
    flex: 0.6
  },
  timeStamp: {
    fontSize: 18,
    color: '#a9a9a9',
    fontWeight: '600',
    letterSpacing: 0.6
  },
  note: {
    color: '#808080',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1.0,
    marginTop: 5
  },
  swipe: {
    borderRadius: 10
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

    switch (this.props.iconName) {
      case 'headache':
        image = constants.HEADACHE_IMAGE;
        backgroundColorTemp = constants.HEADACHE_BACKGROUND_COLOR;
        break;

      case 'neck-pain':
        image = constants.NECKPAIN_IMAGE;
        backgroundColorTemp = constants.NECKPAIN_BACKGROUND_COLOR;
        break;

      case 'leg-pain':
        image = constants.LEGPAIN_IMAGE;
        backgroundColorTemp = constants.LEGPAIN_BACKGROUND_COLOR;
        break;

      case 'knee-pain':
        image = constants.KNEEPAIN_IMAGE;
        backgroundColorTemp = constants.KNEEPAIN_BACKGROUND_COLOR;
        break;

      case 'blurred-vision':
        image = constants.VISION_IMAGE;
        backgroundColorTemp = constants.VISION_BACKGROUND_COLOR;
        break;

      case 'pill':
        image = constants.PILL_IMAGE;
        backgroundColorTemp = constants.PILL_BACKGROUND_COLOR;
        break;

      default:
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
              onPress={() => this.props.onPress(this.props.title)}
            >
              <View style={styles.container}>
                <View style={imageContainerStyle}>
                  <View style={styles.imageStyle} />
                  <Image style={styles.imageStyle2} source={image} />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    marginLeft: 82,
                    paddingTop: 120,
                    paddingRight: 18,
                    backgroundColor: this.props.backgroundColor
                  }}
                />

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
