import React from 'react';
import { View } from 'react-native';
import MedicineView from './MedicineView';
import MedicineAddForm from '../components/MedicineAddForm/MedicineAddForm';
import { createStackNavigator } from 'react-navigation-stack';
import DropdownAlert from 'react-native-dropdownalert';
import { COLOR, IMAGES } from '../resources/constants';
import { createAppContainer } from 'react-navigation';

export default class MedicinePage extends React.Component {
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
    let MedicinePageSN = createStackNavigator({
      MainView: {
        screen: MedicineView,
        navigationOptions: {
          title: 'Medicine View',
          header: false,
          backgroundColor: 'transparent'
        }
      },
      Add: {
        screen: MedicineAddForm,
        navigationOptions: {
          title: 'Add a New Medication',
          header: false
        }
      }
    });
    const MedicinePageSNContainer = createAppContainer(MedicinePageSN);
    return (
      <View style={{ flex: 1 }}>
        <MedicinePageSNContainer
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
