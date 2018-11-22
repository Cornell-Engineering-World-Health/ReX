import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import constants, { IMAGES, COLOR } from '../../resources/constants';

const CHECKED_COLOR = COLOR.medicineCardChecked;
const UNCHECKED_COLOR = COLOR.medicineCardUnchecked;

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
    backgroundColor: COLOR.cardContainer
  },
  imageContainer: {
    borderRadius: 5,
    backgroundColor: '#18F150',
    justifyContent: 'center',
    alignItems: 'center'
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
    color: COLOR.cardTitle
  },
  timeContainer: {
    marginTop: 1.5,
    paddingTop: 15,
    marginRight: 20,
    alignItems: 'flex-end',
    flex: 0.6
  },
  note: {
    color: COLOR.cardNotes,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1.0,
    marginTop: 5
  },
  swipe: {
    borderRadius: 10
  },
  checkMark: {
    width: 100,
    height: 100,
    resizeMode: 'cover'
  }
});
class MedicineCard extends Component {
  static propTypes = {
    title: PropTypes.string,
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
    checked: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      fade: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.fade, { toValue: 1, duration: 500 }).start();
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
    const descriptionContainerStyle = [styles.descriptionContainer];

    var image = constants.DEFAULT.image;
    var backgroundColorTemp = constants.DEFAULT.backgroundColor;
    var descriptionBackground = null;

    if (this.props.backgroundColor) {
      backgroundColorTemp = this.props.backgroundColor;
    }

    if (this.props.checked) {
      descriptionBackground = CHECKED_COLOR;
    } else {
      descriptionBackground = UNCHECKED_COLOR;
    }

    descriptionContainerStyle.push({
      backgroundColor: descriptionBackground,
      opacity: this.state.fade
    });

    imageContainerStyle.push({
      backgroundColor: backgroundColorTemp
    });

    const swipeSettings = {
      autoClose: true
    };
    let image1 = null;
    if (this.props.checked) {
      image1 = IMAGES.checkmark;
    } else {
      if (!this.props.image) {
        image1 = IMAGES.purpleCircle;
      } else {
        image1 = this.props.image;
      }
    }

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
            <View style={styles.container}>
              <TouchableOpacity
                disabled={!this.props.buttonActive}
                onPress={this.props.onPress}
              >
                <View style={imageContainerStyle}>
                  <Image style={styles.checkMark} source={image1} />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute',
                  marginLeft: 82,
                  paddingTop: 120,
                  paddingRight: 18,
                  backgroundColor: this.props.backgroundColor
                }}
              />
              <Animated.View style={descriptionContainerStyle}>
                <View>
                  <Text style={styles.titleText}>{this.props.title}</Text>
                  <Text style={styles.note}> {this.props.note1} </Text>
                  <Text style={styles.note}> {this.props.note2} </Text>
                </View>
              </Animated.View>
            </View>
          </Swipeout>
        </View>
      </View>
    );
  }
}

export default MedicineCard;
