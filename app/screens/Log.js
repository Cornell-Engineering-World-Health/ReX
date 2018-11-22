import React from 'react';
import { View } from 'react-native';
import ChooseLogScreen from './ChooseLogScreen';
import LogFormScreen from './LogFormScreen';
import BodySelectScreen from './BodySelectScreen';
import { StackNavigator } from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import { COLOR, IMAGES } from '../resources/constants';

export default class Log extends React.Component {
  constructor(props) {
    super(props);
  }

  errorOnSubmit() {
    this.dropdown.close();
    this.dropdown.alertWithType(
      'custom',
      'Form Incomplete',
      'Please add any missing information'
    );
  }

  successOnSubmit() {
    this.dropdown_success.close();
    this.dropdown_success.alertWithType('custom', 'New Medicine Added!', '');
  }

  render() {
    const LogSN = StackNavigator({
      Body: {
        screen: BodySelectScreen,
        navigationOptions: {
          title: 'Select Region',
          backgroundColor: 'white',
          header: false
        }
      },
      Choose: {
        screen: ChooseLogScreen,
        navigationOptions: {
          title: 'Choose Log Type',
          header: false
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
    return (
      <View style={{ flex: 1 }}>
        <LogSN
          screenProps={{
            errorOnSubmit: this.errorOnSubmit.bind(this),
            successOnSubmit: this.successOnSubmit.bind(this)
          }}
        />
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          closeInterval={2000}
          imageSrc={IMAGES.close_white}
          containerStyle={{
            backgroundColor: COLOR.red
          }}
        />
        <DropdownAlert
          ref={ref => (this.dropdown_success = ref)}
          closeInterval={2000}
          imageSrc={IMAGES.checkmarkWhite}
          containerStyle={{
            backgroundColor: COLOR.cyan
          }}
        />
      </View>
    );
  }
}
