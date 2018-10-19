import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

export default class Form extends React.Component {
  static propTypes = {
    data: PropTypes.array //etc
  };

  constructor(props) {
    super(props);

    //need to determine what values are state and which are passed into props
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
      this.state.input_type_array.length;
    if (!this.state.reachedEnd) {
      Animated.timing(this.state.overlayWidth, {
        toValue: newOverlayWidth
      }).start();
    }
    if (this.state.activeSlide == this.state.input_type_array.length - 1) {
      this.setState({ reachedEnd: true });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>{'hello'}</Text>
        </View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          layout={'default'}
          data={component_array}
          renderItem={this._renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          slideStyle={{ width: viewportWidth }}
          inactiveSlideOpacity={1}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
        {pagination}
        <View style={styles.footer}>
          <Animated.View
            accessible={false}
            style={[styles.overlay, { width: this.state.overlayWidth }]}
          />
          <TouchableOpacity onPress={() => {}} style={[styles.footerButton]}>
            <Text style={styles.footerButtonText}>
              {!this.state.reachedEnd ? 'Quick \n' : ''} Submit
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
              <Text style={styles.footerButtonText}>{'Skip'}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerButtonText: {
    fontSize: 20,
    fontWeight: '100',
    textAlign: 'center'
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
    backgroundColor: '#f9ff5b',
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
    height: 78,
    marginBottom: 0,
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: COLOR.lightGreen
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
  }
});
