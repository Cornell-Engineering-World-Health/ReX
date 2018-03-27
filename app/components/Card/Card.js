import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import constants, { COLOR } from '../Resources/constants';

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
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    height: 75,
    width: 75,
    resizeMode: 'cover'
  },
  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingLeft: 8,
    paddingBottom: 15,
    flex: 1,
    alignItems: 'center'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 19,
    letterSpacing: 1.5,
    color: COLOR.cardTitle
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
    color: COLOR.cardTimestamp,
    fontWeight: '600',
    letterSpacing: 0.6
  },
  note: {
    color: COLOR.cardNotes,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1.0,
    marginTop: 10
  },
  swipe: {
    borderRadius: 10
  },
  medicineNoteWrapper: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    alignItems: 'center'
  },
  medicineNoteContainer: {
    flex: 1
  },
  medicineNoteText: {
    fontSize: 18,
    textAlign: 'center'
  },
  medicineNoteLine: {
    height: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    flex: 0.2
  }
});
class Card extends PureComponent {
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
    onPress: PropTypes.func,
    onCloseSwipeout: PropTypes.func,
    onOpenSwipeout: PropTypes.func,
    cardData: PropTypes.obj,
    medicineNote: PropTypes.string
  };
  constructor(props) {
    super(props);
  }

  _handlePress = () => {
    console.log('button pressed. ');
  };

  _renderPage = () => {
    if (this.props.medicineNote) {
      let textStyle = [styles.medicineNoteText];
      let medicineLine = [styles.medicineNoteLine];
      let tempColor = '#b3b3b3';
      if (this.props.backgroundColor) {
        tempColor = this.props.backgroundColor;
      }
      textStyle.push({ color: tempColor });
      medicineLine.push({ backgroundColor: tempColor });
      return (
        <View style={styles.medicineNoteWrapper}>
          <View style={medicineLine} />
          <View style={styles.medicineNoteContainer}>
            <Text style={textStyle}>{this.props.medicineNote}</Text>
            <Text style={textStyle}>{this.props.timeStamp}</Text>
          </View>
          <View style={medicineLine} />
        </View>
      );
    } else {
      const imageContainerStyle = [styles.imageContainer];

      var image = constants.DEFAULT.image;
      var title = constants.DEFAULT.title;
      if (this.props.cardData) {
        imageContainerStyle.push({
          backgroundColor: this.props.cardData.backgroundColor
        });

        image = this.props.cardData.image;
        title = this.props.cardData.title;
      }

      return (
        <View style={styles.wrapper}>
          <View style={styles.shadowWrapper}>
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
                onPress={() => this.props.onPress(title)}
              >
                <View style={styles.container}>
                  <View style={imageContainerStyle}>
                    <Image style={styles.imageStyle} source={image} />
                  </View>

                  <View style={styles.descriptionContainer}>
                    <View>
                      <Text style={styles.titleText}>{title}</Text>
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
  };

  render() {
    let page = this._renderPage();
    return <View>{page}</View>;
  }
}

export default Card;