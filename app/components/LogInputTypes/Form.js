import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLOR } from '../../resources/constants.js';

export default class Form extends React.Component {
  static propTypes = {
    data: PropTypes.array, //etc
    valueChange: PropTypes.func,
    submit: PropTypes.func,
    isModal: PropTypes.bool
  };

  constructor(props) {
    super(props);

    //need to determine what values are state and which are passed into props
    this.state = {
      activeSlide: 0,
      overlayWidth: new Animated.Value(0),
      overlayHeight: new Animated.Value(0),
      reachedEnd: false,
      swipable: true,
      viewportWidth: 1,
      viewportHeight: 1
    };
  }

  valueChange(label, value) {
    if (!this.state.reachedEnd) {
      this._carousel.snapToNext(); //if there is another slide, increment carousel
    }
    this._updateOverlay();
    this.props.valueChange(label, value);
  }

  _renderItem(component) {
    return <View style={[styles.componentWrapper]}>{component.item}</View>;
  }

  /*
    Update the overlay based on the proportion of questions completed (1/2 complete,
    the bar should be half filled)
  */
  _updateOverlay() {
    let newOverlayWidth =
      this.state.viewportWidth *
      (this.state.activeSlide + 1) /
      this.props.data.length;
    if (!this.state.reachedEnd) {
      Animated.timing(this.state.overlayWidth, {
        toValue: newOverlayWidth
      }).start();
    }
    if (this.state.activeSlide == this.props.data.length - 1) {
      this.setState({ reachedEnd: true });
      Animated.timing(this.state.overlayWidth, {
        toValue: this.state.viewportWidth
      }).start();
      this._updateOverlayYAxis();
    } else {
      if (!this.state.reachedEnd) {
        let newOverlayWidth =
          this.state.viewportWidth *
          this.state.activeSlide /
          this.props.data.length;
        Animated.timing(this.state.overlayWidth, {
          toValue: newOverlayWidth
        }).start();
      }
    }
  }

  _updateOverlayYAxis() {
    let newHeight = 80;
    Animated.timing(this.state.overlayHeight, {
      toValue: newHeight
    }).start();
  }

  disable_swipe() {
    this.setState({ swipable: false });
  }

  enable_swipe() {
    this.setState({ swipable: true });
  }

  /*
Take in a native event (part of the object passed in from onLayout)

Sets global variables viewportWidth and viewportHeight according to the size
of the screen
*/
  _setGlobalHeightAndWidth(nativeEvent) {
    this.setState({ viewportHeight: nativeEvent.layout.height });
    this.setState({ viewportWidth: nativeEvent.layout.width });
  }

  render() {
    let pagination = (
      <Pagination
        dotsLength={this.props.data.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{ backgroundColor: 'transparent' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.5}
      />
    );

    let modalStyle = this.props.isModal
      ? {
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15
        }
      : {};

    return (
      <View
        style={[styles.container, modalStyle]}
        onLayout={({ nativeEvent }) => {
          this._setGlobalHeightAndWidth(nativeEvent);
        }}
      >
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          layout={'default'}
          scrollEnabled={this.state.swipable}
          data={this.props.data}
          renderItem={this._renderItem}
          sliderWidth={this.state.viewportWidth}
          itemWidth={this.state.viewportWidth}
          slideStyle={{ width: this.state.viewportWidth }}
          inactiveSlideOpacity={1}
          onSnapToItem={index => {
            this.setState({ activeSlide: index }, () => this._updateOverlay());
          }}
        />
        {pagination}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={this.props.submit}
            style={styles.footerButton}
          >
            <Animated.View
              accessible={false}
              style={[
                styles.overlayFill,
                {
                  height: this.state.overlayHeight
                },
                modalStyle
              ]}
            />
            <Text style={styles.footerButtonText}>
              {!this.state.reachedEnd ? 'Quick' : ''} Submit
            </Text>
          </TouchableOpacity>
          {!this.state.reachedEnd ? (
            <TouchableOpacity
              onPress={() => {
                this._carousel.snapToNext();
                this._updateOverlay();
              }}
              style={[styles.skipButton]}
            >
              <Text style={styles.footerButtonSkipText}>{'Skip'}</Text>
            </TouchableOpacity>
          ) : null}
          <Animated.View
            accessible={false}
            style={[
              styles.overlay,
              {
                width: this.state.overlayWidth
              }
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerButtonText: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center'
  },
  footerButtonSkipText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white'
  },
  skipButton: {
    height: 75,
    width: 75,
    padding: 15,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOpacity: 0.19,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 5,
    backgroundColor: COLOR.cyan,
    bottom: 3
  },
  footerButton: {
    height: 78,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.19,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  overlay: {
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLOR.cyan,
    position: 'absolute',
    bottom: 75,
    height: 5,
    left: 0,
    right: 0
  },
  overlayFill: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLOR.cyan
  },
  footer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 0.2
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },

  componentWrapper: {
    flex: 1,
    padding: 5
  }
});
