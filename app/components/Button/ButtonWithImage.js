import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#808080'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 10
  },
  wrapper: {
    alignItems: 'center',
    padding: 5
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  }
});

class ButtonWithImage extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    imageSource: PropTypes.number,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onLongPress: PropTypes.func,
    rounded: PropTypes.bool,
    shadowOpacity: PropTypes.number,
    horizontal: PropTypes.bool,
    styles: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const containerStyle = [styles.container];
    const textStyle = [styles.text];
    const imageStyle = [{ resizeMode: 'cover' }];
    const shadowStyle = [styles.shadowWrapper];

    containerStyle.push({
      backgroundColor: this.props.backgroundColor
    });
    if (this.props.horizontal) {
      containerStyle.push({
        flexDirection: 'row'
      });
    }
    if (this.props.rounded) {
      containerStyle.push({
        borderRadius: 50
      });
      shadowStyle.push({
        borderRadius: 50
      });
    }
    if (this.props.shadowOpacity) {
      shadowStyle.push({
        shadowOpacity: this.props.shadowOpacity
      });
    }

    textStyle.push({ color: this.props.color });

    if (this.props.width) {
      imageStyle.push({ width: this.props.width });
    } else {
      imageStyle.push({ width: 100 });
    }
    if (this.props.height) {
      imageStyle.push({ height: this.props.height });
    } else {
      imageStyle.push({ height: 100 });
    }


    return (
      <View style={[styles.wrapper, this.props.styles]}>
        <View style={shadowStyle}>
          <TouchableOpacity
            style={containerStyle}
            onPress={this.props.onPress}
            onLongPress={this.props.onLongPress}
          >
            <Image
              resizeMode="stretch"
              style={imageStyle}
              source={this.props.imageSource}
            />
            <Text style={textStyle}>{this.props.text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ButtonWithImage;
