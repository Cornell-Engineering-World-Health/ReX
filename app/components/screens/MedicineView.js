import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { Fingerprint } from 'expo';
import {
  setMassNotification,
  setNotification,
  cancelNotification,
  cancelAllNotifications
} from '../PushController/PushController';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
const localNotification = {
  title: 'Dont leave us!!',
  body: 'Come back to our app!'
};

const medicine = {
  title: 'Test ',
  body: 'Long Term Test',
  startDate: new Date('April 14, 2018'),
  endDate: new Date('April 24, 2018'),
  scheduledTime: ['13:00']
};

class MedicineView extends React.Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  _setAllNotifications() {
    cancelAllNotifications();
    setMassNotification(
      medicine.startDate,
      medicine.endDate,
      medicine.title,
      medicine.body,
      medicine.scheduledTime,
      ids => {
        console.log(ids);
      }
    );
  }

  _setNotification() {
    setNotification(
      localNotification.title,
      localNotification.body,
      Date.now() + 2000,
      (id, date) => {
        console.log(id);
        console.log(date);
      }
    );
  }

  render() {
    let page = null;
    if (true) {
      page = (
        <View style={{ flex: 1, padding: 50 }}>
          <Button
            color={'black'}
            title={'Press for notification and then go to home screen!'}
            onPress={this._setNotification}
          />
          <Button
            color={'black'}
            title={'Press for to set Mass notifications'}
            onPress={this._setAllNotifications}
          />
        </View>
      );
    }
    return page;
  }
}
export default MedicineView;
