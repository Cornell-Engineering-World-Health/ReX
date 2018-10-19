import React from 'react';
import MedicineView from './MedicineView';
import LogFormScreen from './LogFormScreen';
import { StackNavigator } from 'react-navigation';

const MedicinePage = StackNavigator({
  MainView: {
    screen: MedicineView,
    navigationOptions: {
      title: 'Medicine View',
      header: false,
      backgroundColor: 'transparent'
    }
  },
  Form: {
    screen: LogFormScreen,
    navigationOptions: {
      title: 'Create New Medication'
    }
  }
});

export default MedicinePage;
