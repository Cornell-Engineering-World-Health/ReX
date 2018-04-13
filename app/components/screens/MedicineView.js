import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { Fingerprint } from 'expo';
import {
  setMassNotification,
  setNotification,
  cancelNotification
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

const medicine = [
  {
    title: 'Test ',
    body: 'Long Term Test',
    startDate: new Date('April 9, 2018'),
    endDate: new Date('April 10, 2018'),
    scheduledTime: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
  },
  {
    title: 'Hi CS Team!',
    body: 'I set this at 12:57 on Monday!',
    startDate: new Date('April 11, 2018'),
    endDate: new Date('April 12, 2018'),
    scheduledTime: ['17:00', '17:05']
  }
];
const notificationIDs = [];
class MedicineView extends React.Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  _setAllNotifications() {
    for (var x = 0; x < medicine.length; x++) {
      let current = medicine[x];
      notificationIDs += setMassNotification(
        current.startDate,
        current.endDate,
        current.title,
        current.body,
        current.scheduledTime
      );
    }
  }

  _setNotification() {
    let notification = setNotification(
      localNotification.title,
      localNotification.body,
      Date.now() + 2000
    );
    console.log(notification);
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
        </View>
      );
    }
    return page;
  }
}
export default MedicineView;
