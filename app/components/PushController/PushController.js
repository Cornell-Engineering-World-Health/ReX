/*
@flow
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Platform } from 'react-native';
import { Notifications, Constants, Permissions } from 'expo';
import Moment from 'moment';

/*
Cancel specific notification given an id

Precondition: notficationID must be the one given when it was first scheduled
*/

export function cancelNotification(notificationID) {
  Notifications.cancelScheduledNotificationAsync(notificationID);
}

/*
Cancel all scheduled notifications.
*/
export function cancelAllNotifications() {
  Notifications.cancelAllScheduledNotificationsAsync();
}

/*
Cancels all notifications listed in the given array of notification IDS

Precondition: notificationIDS is an array with every element being a notificationID given
after the notification was first scheduled.
*/
export function cancelMassNotifications(notificationIDS) {
  for (var x = 0; x < notificationIDS.length; x++) {
    cancelNotification(notificationIDS[x]);
  }
}

/*
  Parameters

  t: title of the notifications //string
  b: body of the notification  //string
  date: time/date to send notification // date object with correct time and date

  returns: unique notification id
*/
export async function setNotification(t, b, date) {
  d = {
    title: t,
    body: b
  };
  localNotification = {
    title: t,
    body: b,
    data: d,
    ios: {
      sound: true
    }
  };
  schedulingOptions = {
    time: date
  };

  return await Notifications.scheduleLocalNotificationAsync(
    localNotification,
    schedulingOptions
  );
}

/*
IMPORTANT to adhere to these preconditions...
startDate: date object with the correct start date
endDate: date object with the correct end date
t: string for the title of the notification set
b: string for the body of the notification set
scheduledTime: an ARRAY of times in the day, in the form of ["09:00", "18:00"] --> note, it must be in 24 hour time, and each
                                                                                  element in the array MUST be a string
                                                                                  Additionally, for a time with an hour  < 12,
                                                                                  a 0 placeholder must be included (ex: 09:00)
*/
export async function setMassNotification(
  startDate,
  endDate,
  t,
  b,
  scheduledTime
) {
  var id_bundle = [];

  let tempDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  console.log('initial date: ' + tempDate);
  while (Moment(tempDate).isBefore(endDate)) {
    for (var x = 0; x < scheduledTime.length; x++) {
      let hours = parseInt(scheduledTime[x].slice(0, 2));
      let minutes = parseInt(scheduledTime[x].slice(3, 5));
      let tempDateWithTime = new Date(
        tempDate.getFullYear(),
        tempDate.getMonth(),
        tempDate.getDate(),
        hours,
        minutes
      );
      id_bundle += await setNotification(t, b, tempDateWithTime);
    }
    tempDate.setDate(tempDate.getDate() + 1);
  }
  //TODO: TRIGGER NOTIFICATION ON END DATE

  return id_bundle;
}

class PushController extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getiOSNotificationPermission();
    this.listenForNotifications();
  }
  async getiOSNotificationPermission() {
    console.log('entered ios notification permissions');
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      console.log(notification);
      if (notification.origin === 'received' && Platform.OS === 'ios') {
        Alert.alert(notification.data.title, notification.data.body);
      }
    });
  };

  render() {
    return null;
  }
}
export default PushController;
