import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class PillDesign extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    onPress: PropTypes.func
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
              width: 75,
              height: 50,
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
      <View>
        <TouchableOpacity onPress={this.props.onPress}>{page}</TouchableOpacity>
      </View>
    );
  }
}

export default PillDesign;
