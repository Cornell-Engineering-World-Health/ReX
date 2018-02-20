import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Calendar, Agenda, CalendarCarousel } from './src/components';
import { Provider } from 'react-redux';
import store from './src/config/store';

export default class App extends React.Component {
  render() {
    console.log("HI");
    return (
      <Provider store={store}>
        <View>
          <Header />
            <CalendarCarousel />
        </View>
      </Provider>
    );
  }
}
