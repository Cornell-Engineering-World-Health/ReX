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
import { COLOR } from '../Resources/constants.js';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

export default class Form extends React.Component {
  static propTypes = {
    data: PropTypes.array, //etc
    valueChange: PropTypes.func,
    submit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    //need to determine what values are state and which are passed into props
    this.state = {
      activeSlide: 0,
      overlayWidth: new Animated.Value(0),
      reachedEnd: false
    };
  }

  valueChange(label, value){
    if (!this.state.reachedEnd) {
      this._carousel.snapToNext(); //if there is another slide, increment carousel
    }
    this._updateOverlay()
    this.props.valueChange(label, value)
  }

  _renderItem({ item, index }) {
    return <View style={styles.componentWrapper}>{item}</View>;
  }

  /*
    Update the overlay based on the proportion of questions completed (1/2 complete,
    the bar should be half filled)
  */
  _updateOverlay() {
    let newOverlayWidth =
      viewportWidth *
      (this.state.activeSlide + 1) /
      this.props.data.length;
    if (!this.state.reachedEnd) {
      Animated.timing(this.state.overlayWidth, {
        toValue: newOverlayWidth
      }).start();
    }
    if (this.state.activeSlide == this.props.data.length - 1) {
      this.setState({ reachedEnd: true });
    }
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


    return (
      <View style={styles.container}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          layout={'default'}
          data={this.props.data}
          renderItem={this._renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          slideStyle={{ width: viewportWidth }}
          inactiveSlideOpacity={1}
          onSnapToItem={index => this.setState({ activeSlide: index },
            () => {this._updateOverlay()})}
        />
        {pagination}
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.props.submit} style={[styles.footerButton]}>
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
            style={[styles.overlay, { width: this.state.overlayWidth }]}
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
    textAlign: 'center',
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
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 5,
    backgroundColor: COLOR.cyan,
    bottom: 3
  },
  footerButton: {
    height: 78,
    width: viewportWidth,
    padding: 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    borderTopWidth: 1
  },
  overlay: {
    height: 5,
    borderRadius: 10,
    marginBottom: 78,
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: COLOR.cyan
  },
  subFooter: {
    flex: 0.1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  footer: {
    flex: 0.2,
    width: viewportWidth,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  headerView: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: viewportWidth
  },
  headerTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '200',
    color: 'black'
  },
  componentWrapper: {
    width: viewportWidth,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
