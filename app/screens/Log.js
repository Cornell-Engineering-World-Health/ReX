import React from 'react';
import ChooseLogScreen from './ChooseLogScreen';
import LogFormScreen from './LogFormScreen';
import BodySelectScreen from './BodySelectScreen';
import { createStackNavigator } from 'react-navigation-stack';
import {
  View
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { COLOR, IMAGES} from '../resources/constants';
import { createAppContainer } from 'react-navigation';

export default class Log extends React.Component {
  constructor(props) {
    super(props)
  }

  successOnSubmit(){
    this.dropdown_success.close(); this.dropdown_success.alertWithType('custom',
    'New Symptom Logged', '')
  }

  render() {
    let LogSN = createStackNavigator({
      Body: {
        screen: BodySelectScreen,
        navigationOptions: {
          title: 'Select Region',
          backgroundColor: 'white',
          header: false,
        }
      },
      Choose: {
        screen: ChooseLogScreen,
        navigationOptions: {
          title: 'Choose Log Type',
          header: false,
        }
      },
      Form: {
        screen: LogFormScreen,
        navigationOptions: {
          title: 'Log',
          backgroundColor: 'white',
          header: false
        }
      }
    });

    const LogSNContainer = createAppContainer(LogSN);
    return (
      <View style={{flex: 1}}>
        <LogSNContainer
          screenProps={{
            successOnSubmit: this.successOnSubmit.bind(this)
          }}
        />
        <DropdownAlert
          ref={ref => this.dropdown_success = ref}
          closeInterval={2000}
          imageSrc={IMAGES.checkmarkWhite}
          containerStyle={{
            backgroundColor: COLOR.cyan,
          }}
        />
      </View>
    );
  }
}
