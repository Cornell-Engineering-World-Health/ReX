import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles.js';

class Card extends Component {
  static propTypes = {
    image: PropTypes.number,
    title: PropTypes.string,
    timeStamp: PropTypes.string,
    note1: PropTypes.string,
    note2: PropTypes.string
  };

  constructor() {
    this.state = {};
  }
  render() {
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={this.props.image} />
      </View>

      <View style={styles.descriptionContainer}>
        <View style={styles.titleTime}>
          //bold title Text
          <Text style={styles.titleText}>{this.props.title}</Text>
          //time stamp
          <Text style={styles.timeStamp}>{this.props.timeStamp}</Text>
        </View>

        <View>
          <Text style={styles.note1}> {this.props.note} </Text>
          <Text style={styles.note1}> {this.props.note} </Text>
        </View>

        <View style={styles.note2} />
      </View>
    </View>;
  }
}

export default Card;
