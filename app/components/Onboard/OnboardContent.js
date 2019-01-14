import * as React from 'react';
import { View } from 'react-native';
import IntroPage from './IntroPage';
import InfoPage from './InfoPage';
import { StackNavigator } from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import { COLOR, IMAGES } from '../../resources/constants';

export default class OnboardContent extends React.Component {
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

  emailErrorOnSubmit() {
    this.dropdown.close();
    this.dropdown.alertWithType(
      'custom',
      'Incorrect Email',
      'Please check that the email is written in the correct format'
    );
  }


  render() {
    let OnboardContentSN = StackNavigator({
      Intro: {
        screen: IntroPage,
        navigationOptions: {
          header: false,
        }
      },
      Info: {
        screen: InfoPage,
        navigationOptions: {
          header: false
        }
      }
    });
    return (
      <View style={{ flex: 1 }}>
        <OnboardContentSN
          screenProps={{
            errorOnSubmit: this.errorOnSubmit.bind(this),
            emailErrorOnSubmit: this.emailErrorOnSubmit.bind(this),
            successOnSubmit: this.props.onComplete
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
      </View>
    );
  }
}
