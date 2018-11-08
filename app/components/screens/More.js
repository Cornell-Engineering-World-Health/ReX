import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class MoreScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {/*Outermost container for entire page*/}
        <View style={styles.header}> {/*Profile Header*/}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
