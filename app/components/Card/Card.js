import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Swipeout from 'react-native-swipeout';
import constants, { COLOR } from '../../resources/constants';

const HEIGHT = 75;
const PADDING = 7;
const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    borderRadius: 7
  },
  shadowWrapper: {
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#808080',
    shadowOpacity: 0.3
  },
  container: {
    flexDirection: 'row',
    backgroundColor: COLOR.cardContainer
  },
  imageContainer: {
    width: HEIGHT + PADDING * 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    height: HEIGHT - PADDING,
    width: HEIGHT - PADDING,
    resizeMode: 'contain'
  },
  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: PADDING,
    paddingLeft: 8,
    paddingBottom: PADDING,
    flex: 1,
    alignItems: 'flex-start'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 19,
    letterSpacing: 1.5,
    color: COLOR.cardTitle
  },
  timeContainer: {
    paddingTop: 5,
    marginRight: 10,
    alignItems: 'flex-end',
    position: 'absolute',
    right: 5,
    top: 1
  },
  timeStamp: {
    fontSize: 16,
    color: COLOR.cardTimestamp,
    fontWeight: '600',
    letterSpacing: 0.6,
    textAlign: 'right'
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
    cardData: PropTypes.object
  };
  constructor(props) {
    super(props);
  }

  _handlePress = () => {
    console.log('button pressed. ');
  };

  _renderPage = () => {
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
                  <Text style={styles.titleText}>{title}</Text>
                  <Text style={styles.note}> {this.props.note1} </Text>
                  <Text style={styles.note}> {this.props.note2} </Text>
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
  };

  render() {
    let page = this._renderPage();
    return <View>{page}</View>;
  }
}

export default Card;
