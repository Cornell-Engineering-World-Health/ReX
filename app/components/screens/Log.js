import React from 'react';
import ChooseLogScreen from './ChooseLogScreen';
import LogFormScreen from './LogFormScreen';
import BodySelectScreen from './BodySelectScreen';
import { StackNavigator } from 'react-navigation';

const Log = StackNavigator({
  Body: {
    screen: BodySelectScreen,
    navigationOptions: {
      title: 'Select Region',
      backgroundColor: 'white'
    }
  },
  Choose: {
    screen: ChooseLogScreen,
    navigationOptions: {
      title: 'Choose Log Type'
    }
  },
  Form: {
    screen: LogFormScreen,
    navigationOptions: {
      title: 'Log',
      backgroundColor: 'white'
    }
  }
});

export default Log;
