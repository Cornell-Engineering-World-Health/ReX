import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#808080',
    shadowOpacity: 0.5,
    borderRadius: 20
  },
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderRadius: 20
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
    height: PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  render() {
    const containerStyle = [styles.container];
    const textStyle = [styles.text];
    const imageStyle = [
      {
        resizeMode: 'cover'
      }
    ];
    containerStyle.push({
      backgroundColor: this.props.backgroundColor
    });
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
      <View style={styles.wrapper}>
        <View style={styles.shadowWrapper}>
          <TouchableOpacity style={containerStyle} onPress={this.props.onPress}>
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
