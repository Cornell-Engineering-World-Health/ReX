import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class PillDesign extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    onPress: PropTypes.func,
    completed: PropTypes.bool,
    disabled: PropTypes.bool
  };

  _renderItem() {
    switch (this.props.type) {
      case 'index1':
        return (
          <View
            style={{
              width: 75,
              height: 50,
              borderRadius: 50,
              backgroundColor: 'red'
            }}
          />
        );

      case 'index2':
        return (
          <View
            style={{
              width: 50,
              height: 25,
              borderRadius: 50,
              backgroundColor: 'white'
            }}
          />
        );
    }
  }
  render() {
    let page = this._renderItem();
    return (
      <View
        style={{
          height: 50,
          width: 75,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          disabled={this.props.disabled}
          onPress={this.props.onPress}
        >
          {page}
        </TouchableOpacity>
      </View>
    );
  }
}

export default PillDesign;
