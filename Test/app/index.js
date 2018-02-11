import React from 'react';
import PainForm from './components/screens/PainForm';
import CalendarScreen from './components/screens/CalendarScreen';
import { StackNavigator } from 'react-navigation';
import { NavigatorIOS, StatusBar } from 'react-native';

class main extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: PainForm,
          title: 'Back'
        }}
        navigationBarHidden={true}
        style={{ flex: 1 }}
      />
    );
  }
}

export default main;
