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

  callBack: function to be called after the notification is set.
    Notification id (string?) and date the notification will be sent (date object)
    will be passed in as parameters. This notification id can be used to cancel
    this notification in the future.

*/
export function setNotification(t, b, date, callBack) {
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
  var p = Notifications.scheduleLocalNotificationAsync(
    localNotification,
    schedulingOptions
  );
  p.then(id => {
    callBack(id, date, extraData);
  });
}

/*
IMPORTANT to adhere to these preconditions...
Sets notifications at the given times starting at the
startDate and ending on endDate. (Includes notifications on end date)

startDate: date object with the correct start date
endDate: date object with the correct end date
t: string for the title of the notification set
b: string for the body of the notification set
scheduledTime: an ARRAY of times in the day, in the form of ["09:00", "18:00"] --> note, it must be in 24 hour time, and each
                                                                                  element in the array MUST be a string
                                                                                  Additionally, for a time with an hour  < 12,
                                                                                  a 0 placeholder must be included (ex: 09:00)
callBack: function to be called after the notification is set.
  ARRAY of objects, with Notification ids and dates that correspond to the notification
  id will be passed in as parameters.
  Objects will be of the form:
  Object {
  id: string
  date: dateObject
  title: t,
  body: b,
}


*/
export function setMassNotification(
  startDate,
  endDate,
  t,
  b,
  scheduledTime,
  callBack
) {
  var id_bundle = [];

  let tempDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
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
      setNotification(t, b, tempDateWithTime, (i, d) => {
        let temp = { id: i, date: d };
        id_bundle.push(temp);
      });
    }
    tempDate.setDate(tempDate.getDate() + 1);
  }

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
    setNotification(t, b, tempDateWithTime, (i, d) => {
      let temp = { id: i, date: d, title: t, body: b };
      id_bundle.push(temp);
      callBack(id_bundle);
    });
  }
}
/*
//New
[
{
  date: startDate + time
  ids: [id1, id2, id3]
},
{
  date: startDate + time
  ids: [id1, id2, id3]
}
]

//Old
[{
id: string
date: dateObject
}]

*/
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
