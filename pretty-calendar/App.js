import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Calendar, Agenda } from './src/components';

export default class App extends React.Component {
  render() {
    console.log("HI");
    return (
      
      <View>
        <Header />
        <Calendar />
      </View>
    );
  }
}
