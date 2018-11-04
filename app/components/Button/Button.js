import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadowWrapper: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#808080'
  },
  container: {
    alignItems: 'center',
    padding: 15
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

class Button extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    onLongPress: PropTypes.func,
    rounded: PropTypes.bool,
    shadowOpacity: PropTypes.number,
    horizontal: PropTypes.bool,
    styles: PropTypes.object,
    innerComponent: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const containerStyle = [styles.container];
    const textStyle = [styles.text];
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
        borderRadius: 15
      });
      shadowStyle.push({
        borderRadius: 15
      });
    }
    if (this.props.shadowOpacity) {
      shadowStyle.push({
        shadowOpacity: this.props.shadowOpacity
      });
    }

    textStyle.push({ color: this.props.color });


    let text = (this.props.text) ?
    (<Text style={textStyle}>{this.props.text}</Text>) : null
    return (
      <View style={[styles.wrapper, this.props.styles]}>
        <View style={shadowStyle}>
          <TouchableOpacity
            style={containerStyle}
            onPress={this.props.onPress}
            onLongPress={this.props.onLongPress}
          >
            {text}
            {this.props.innerComponent}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Button;
