import React from 'react';
import PainForm from './components/screens/PainForm';
import FlatListCard from './components/screens/FlatListCard';
import CalendarScreen from './components/screens/CalendarScreen';
import { StackNavigator } from 'react-navigation';
import { NavigatorIOS, StatusBar } from 'react-native';

class main extends React.Component {
  render() {
    return <FlatListCard />;
  }
}

export default main;
