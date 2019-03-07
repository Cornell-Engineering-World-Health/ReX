/*
@flow
*/
import React from "react";
import { Alert, Platform } from "react-native";
import { Notifications, Constants, Permissions } from "expo";
import {
  asyncCreateNotifications,
  asyncGetNotificationKey,
  asyncDeleteNotifications,
  databaseMedicineNotification
} from "../../databaseUtil/databaseUtil";
import Moment from "moment";

/*
Cancel specific push notification given an id

Precondition: notficationID must be the one given when it was first scheduled
*/

export function cancelNotification(notificationID) {
  Notifications.cancelScheduledNotificationAsync(notificationID);
}

/*
Cancel all scheduled push notifications.
*/
export function cancelAllNotifications() {
  Notifications.cancelAllScheduledNotificationsAsync();
}

export function cancelOurNotification(name, dosage, date_time){
  date_time = Moment(date_time).format('YYYY-MM-DDTHH:mm')

  asyncGetNotificationKey(name, dosage, date_time, id => {
    console.log('CANCEL NOTIFICATIONS:', name, dosage, date_time)
    cancelNotification(id);
    asyncDeleteNotifications(name, dosage, date_time);
  });
}


/*
Cancels all notifications listed in the given array of notification IDS

Precondition: notificationIDS is an array with every element being a notificationID given
after the notification was first scheduled.
*/
export function cancelMassNotification(
  startDate,
  endDate,
  name,
  dosage,
  scheduledTime
) {
  databaseMedicineNotification(name, dosage, false);

  let tempDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    0,
    0
  );
  while (
    Moment(tempDate).isBefore(endDate) ||
    Moment(tempDate).isSame(endDate)
  ) {
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

      let dateTimeString = Moment(tempDateWithTime).format();
      cancelOurNotification(name, dosage, dateTimeString)
    }
    tempDate.setDate(tempDate.getDate() + 1);
  }
}

/*
  Parameters

  t: title of the notifications //string
  b: body of the notification  //string
  date: time/date to send notification // date object with correct time and date

  returns: a promise that resolves to a notification ID

*/
export function setPushNotification(t, b, date) {
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
  //TODO: CHECK IF DATE IS LOCAL TIME!
  schedulingOptions = {
    time: new Date(date)
  };

  var p = Notifications.scheduleLocalNotificationAsync(
    localNotification,
    schedulingOptions
  );

  return p;
}


export function setOurNotification(name, dosage, date_time){
  let t = "Fiih Medication Reminder";
  let b = "It's time to take " + name + "! (" + dosage + ")";
  if(Moment(date_time) > Moment()){
    console.log('SET NOTIFICATIONS:', name, dosage, Moment(date_time).format())
    setPushNotification(t, b, date_time).then(id => {
      asyncCreateNotifications(
        name,
        dosage,
        Moment(date_time).format('YYYY-MM-DDTHH:mm'),
        id
      );
    });
  }
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
  name,
  dosage,
  scheduledTime
) {
  databaseMedicineNotification(name, dosage, true);

  startDate.setTime(
    startDate.getTime() + startDate.getTimezoneOffset() * 60 * 1000
  ); //fix time to correct timezone
  endDate.setTime(endDate.getTime() + endDate.getTimezoneOffset() * 60 * 1000); // as above

  let tempDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    0,
    0
  );
  while (
    Moment(tempDate).isBefore(endDate) ||
    Moment(tempDate).isSame(endDate)
  ) {
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
      if (!Moment(tempDateWithTime).isBefore(new Date().toISOString())) {
        setOurNotification(name, dosage, tempDateWithTime)
      }
    }
    tempDate.setDate(tempDate.getDate() + 1);
  }
}

export function setNotificationList(medName_lst, dosage_lst, date_time_lst){
  medName_lst.forEach((med, i) => {
    setOurNotification(med, dosage_lst[i], date_time_lst[i])
  })
}

export function cancelNotificationList(medName_lst, dosage_lst, date_time_lst){
  medName_lst.forEach((med, i) => {
    cancelOurNotification(med, dosage_lst[i], date_time_lst[i])
  })
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
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }

  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === "received" && Platform.OS === "ios") {
        Alert.alert(notification.data.title, notification.data.body);
      }
    });
  };

  render() {
    return null;
  }
}
export default PushController;
