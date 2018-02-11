import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',

    padding: 15
  },
  icon: {
    width: 100
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
    color: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const thisStyle = [styles.container];
    const textStyle = [styles.text];
    thisStyle.push({ backgroundColor: this.props.backgroundColor });
    textStyle.push({ color: this.props.color });
    return (
      <TouchableOpacity style={thisStyle} onPress={this.props.onPress}>
        <View style={styles.wrapper}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={this.props.imageSource}
          />
          <Text style={textStyle}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonWithImage;
