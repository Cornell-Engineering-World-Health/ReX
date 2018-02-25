import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Calendar, Agenda, InfiniteCalendar } from './src/components';


export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header />
        <InfiniteCalendar />
        <Agenda />
      </View>
    );
  }
}
