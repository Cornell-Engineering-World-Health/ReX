import Database from "../Database";
import Moment from "moment";
import { getCardData } from "../resources/constants";

export function createTables() {
  Database.transaction(
    tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `event_details_tbl` (`event_details_id` INTEGER PRIMARY KEY, `fields` TEXT NOT NULL);"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `field_to_view_tbl` (`field_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `field_name` TEXT NOT NULL UNIQUE, `view_name` TEXT NOT NULL);"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `event_type_tbl` (`event_type_id` INTEGER NOT NULL PRIMARY KEY UNIQUE,`event_type_name` TEXT NOT NULL UNIQUE, `event_type_icon` TEXT NOT NULL, `card_field_id1` INTEGER, `card_field_id2` INTEGER,`event_type_category` TEXT, FOREIGN KEY(card_field_id1) REFERENCES `field_to_view_tbl`(`field_id`), FOREIGN KEY(`card_field_id2`) REFERENCES `field_to_view_tbl` (`field_id`));"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `event_tbl` (`event_id` INTEGER PRIMARY KEY,`event_type_id` INTEGER NOT NULL, `timestamp` TEXT NOT NULL, `event_details_id` INTEGER NOT NULL UNIQUE, FOREIGN KEY(`event_details_id`) REFERENCES `event_details_tbl`(`event_details_id`), FOREIGN KEY(`event_type_id`) REFERENCES `event_type_tbl`(`event_type_id`));"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `settings_tbl` (`setting_name` TEXT NOT NULL PRIMARY KEY UNIQUE, `setting_value` TEXT NOT NULL);"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `id_tbl` (`id_name` TEXT NOT NULL PRIMARY KEY UNIQUE, `id_value` INTEGER NOT NULL);"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `is_first_tbl` (`is_first` INTEGER NOT NULL PRIMARY KEY UNIQUE);"
      );
      /* tx.executeSql(
           'CREATE TABLE IF NOT EXISTS view_to_component_tbl ( view_id INTEGER NOT NULL PRIMARY KEY UNIQUE, view_name TEXT NOT NULL UNIQUE, component` TEXT NOT NULL)'
          ); */
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `notifications_tbl` (`name` TEXT NOT NULL, `dosage` TEXT NOT NULL, `time` TEXT NOT NULL, `notificationKey` NOT NULL UNIQUE, PRIMARY KEY(`name`, `dosage`, `time`));"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `survey_tbl` (`surveyIsOn` INTEGER NOT NULL PRIMARY KEY UNIQUE);"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `survey_last_completed_tbl` (`date` TEXT NOT NULL PRIMARY KEY UNIQUE);"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `uuid_tbl` (`uuid` TEXT NOT NULL PRIMARY KEY UNIQUE);"
      );
    },
    err => console.log(err, "error creating tables"),
    () => {}
  );
}

export function intializeDatabase() {
  date = new Date();
  Database.transaction(
    tx => {
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (1, 'Headache', 'image.png', 'Intensity','Duration','HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (2, 'Dizziness', 'image.png','Intensity','Duration', 'HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (3, 'Blurred Vision', 'image.png', 'Intensity','Duration','HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values                                                   (4, 'Medication Reminder', 'image.png')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (5, 'Knee Pain', 'image.png', 'Intensity','Duration','LEGS')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (6, 'Back Pain', 'image.png', 'Intensity','Duration','TORSO')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name, event_type_icon,card_field_id1,card_field_id2,event_type_category) values (7, 'Double Vision', 'image.png', 'Intensity','Duration','HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (8, 'Noise in the Ear', 'image.png', 'Intensity','Duration','HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (9, 'Neck Pain', 'image.png', 'Intensity','Duration','HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (10, 'Stomach Pain', 'image.png', 'Intensity','Duration','TORSO')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (11, 'Foot Pain', 'image.png', 'Intensity','Duration','LEGS')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (12, 'Elbow Pain', 'image.png', 'Intensity','Duration','ARMS')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (13, 'Tingling', 'image.png', 'Intensity','Duration','BODY')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (14, 'Nausea', 'image.png', 'Intensity','Duration','BODY')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (15, 'Fatigue', 'image.png', 'Intensity','Duration','BODY')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (16, 'Cognitive Slowing', 'image.png', 'Intensity','Duration','HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (17, 'Change in Taste', 'image.png', 'Intensity','Duration','HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (18, 'Diarrhea', 'image.png', 'Intensity','Duration','BODY')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (1, 'Intensity', 'ScaleSlideInputType')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (2, 'Duration', 'NumericalPickerInputType')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (3, 'Other', 'TextInputType')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (4, 'Pill Name', 'TextInputType')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (5, 'Dosage', 'DosagePickerInputType')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (6, 'Start Date', 'DatePicker')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (7, 'End Date', 'DatePicker')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (8, 'Time', 'TimeCategoryInputType')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (9, 'Time Category', 'None')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (10, 'Days Of Week', 'DayChooserInputType')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (11, 'Taken', 'None')"
      );

      /* inserting default values into event_details_tbl with 1950 date for each event type*/
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (2,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (3,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (5,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (6,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (7,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (8,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (9,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (10,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (11,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (12,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (13,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (14,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (15,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (16,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (17,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (18,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (19,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (20,\'{"Duration": "N/A","Intensity": "N/A","Other": "NONE"}\' )'
      );

      /* inserting initial events into event table with 1950 date for each event type*/
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (1, 1,'1950-01-01 00:00:00', 1)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (2, 2,'1950-01-01 00:00:00', 2)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (3, 3,'1950-01-01 00:00:00', 3)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (4, 4,'1950-01-01 00:00:00', 4)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (5, 5,'1950-01-01 00:00:00', 5)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (6, 6,'1950-01-01 00:00:00', 6)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (7, 7,'1950-01-01 00:00:00', 7)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (8, 8,'1950-01-01 00:00:00', 8)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (9, 9,'1950-01-01 00:00:00', 9)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (10, 10,'1950-01-01 00:00:00', 10)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (11, 11,'1950-01-01 00:00:00', 11)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (12, 12,'1950-01-01 00:00:00', 12)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (13, 13,'1950-01-01 00:00:00', 13)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (14, 14,'1950-01-01 00:00:00', 14)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (15, 15,'1950-01-01 00:00:00', 15)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (16, 16,'1950-01-01 00:00:00', 16)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (17, 17,'1950-01-01 00:00:00', 17)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (18, 18,'1950-01-01 00:00:00', 18)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (19, 19,'1950-01-01 00:00:00', 19)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (20, 20,'1950-01-01 00:00:00', 20)"
      );
      /* necessary default settings */
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('height_feet','5')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('height_inches','5')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('weight','0')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('height','0')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('name','Default')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('email','email@domail.com')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('icon','0')"
      );
      /* necessary default ids */
      tx.executeSql(
        "INSERT OR IGNORE INTO id_tbl (id_name,id_value) VALUES ('event_id','2000')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO id_tbl (id_name,id_value) VALUES ('event_details_id','2000')"
      );

      /* medication reminder examples */
      //   tx.executeSql(
      //     'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (50,\
      // \'{"Pill Name": "Tylenol","Dosage": "20mg","Start Date": "2018-10-01","End Date": "2018-11-30","Days Of Week": [1,1,1,1,1,0,0],"Time": ["09:00","18:00"],"Time Category": ["Morning","Evening"],"Taken": [true,true], "Notification On": false}\' )'
      //   );
      //   tx.executeSql(
      //     "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (50, 4,'1950-01-01 00:00:00', 50)"
      //   );

      //Initialize first time app open tbl
      tx.executeSql("INSERT OR IGNORE INTO is_first_tbl (is_first) VALUES (1)");
    },
    err => console.log(err, "error in initialization"),
    () => {}
  );

  Database.transaction(
    tx => {
      tx.executeSql("Select * from event_type_tbl;", [], (tx, { rows }) => {});
    },
    err => console.log(err)
  );
}

export function formatData(data) {
  dataTemp = {};
  data.forEach(function(ev) {
    let d = Moment(ev.timestamp).format("DD");
    let day = d - 1;
    let symptom = ev.event_type_name;
    let intensity = parseInt(JSON.parse(ev.fields).Intensity);
    if (!dataTemp[symptom]) {
      dataTemp[symptom] = {
        intensities: [],
        count: []
      };
    }
    dataTemp[symptom].count[day] = (dataTemp[symptom].count[day] || 0) + 1;
    dataTemp[symptom].intensities[day] =
      ((dataTemp[symptom].intensities[day] || 0) *
        (dataTemp[symptom].count[day] - 1) +
        intensity) /
      dataTemp[symptom].count[day];
  });

  return dataTemp;
}

export function databaseFakeData() {
  Database.transaction(
    tx => {
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (300,\'{"Intensity": "2","Duration": "40"}\')'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (300, 1,'2018-03-07 06:00:00', 300)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1500,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (1500, 3,'2018-04-19 06:01:00', 1500)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (21,\'{"Intensity": "2","Duration": "10"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (21, 5,'2018-04-03 06:01:00', 21)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (22,\'{"Intensity": "9","Duration": "10"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (22, 5,'2019-01-31 06:01:00', 22)"
      );
      /* medication reminder fake data */
    },
    err => console.log(err)
  );
}

/**
 * function to just keep date format consistent with specs and Locale String
 */
function toDateString(date) {
  let date_comp = date.toLocaleDateString().split("/");
  if (date_comp[0].length == 1) date_comp[0] = "0" + date_comp[0];
  if (date_comp[1].length == 1) date_comp[1] = "0" + date_comp[1];
  return date_comp[2] + "-" + date_comp[0] + "-" + date_comp[1];
}

function printAllEventDetails() {
  Database.transaction(
    tx =>
      tx.executeSql("select * from event_details_tbl", [], (tx, { rows }) =>
        console.log("rows", rows._array)
      ),
    err => console.log(err)
  );
}

/**
 * Writes a symptom entry into the database.
 */
export function asyncCreateSymptomLogEvent(
  event_type_id,
  detailsJson,
  timestamp
) {
  Database.transaction(
    tx => {
      tx.executeSql(
        "INSERT INTO event_details_tbl (event_details_id,fields) VALUES ((SELECT max(t.event_id) from event_tbl t) + 1, ?)",
        [detailsJson]
      );
      tx.executeSql(
        "INSERT INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) " +
          "VALUES ((SELECT max(t.event_id) from event_tbl t) + 1, ?, ?, (SELECT max(t.event_id) from event_tbl t) + 1)",
        [event_type_id, timestamp],
        (tx, { rows }) => {}
      );
    },
    err => console.log(err)
  );
}

/* pulls data from Database for month and formats it for calendar */
export function pullFromDataBase(month, day, callback) {
  formattedMonth = month.toISOString().substr(0, 7);
  var arrayFormattedMonth = [formattedMonth];
  Database.transaction(
    tx =>
      tx.executeSql(
        "SELECT event_id,event_type_name, timestamp, fields, strftime('%Y-%m',timestamp) FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name != 'Medication Reminder' and \
      strftime('%Y-%m',timestamp) = ? ORDER BY timestamp",
        arrayFormattedMonth,
        (tx, { rows }) => callback(formatData(rows._array))
      ),
    err => console.log(err)
  );
}

function formatDataForGraphs(data) {
  dataTemp = {};
  data.forEach(function(ev) {
    var d = new Date(ev.timestamp.replace(" ", "T"));
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    var monthString = d.toISOString().substr(0, 10); // year-month-day
    var intensity = parseInt(JSON.parse(ev.fields).Intensity);
    if (!dataTemp[monthString]) {
      dataTemp[monthString] = {
        frequency: 1,
        total_intensity: intensity
      };
    } else {
      dataTemp[monthString].frequency += 1;
      dataTemp[monthString].total_intensity += intensity;
    }
  });
  return dataTemp;
}

/* aggregates data for each month in the year */
function formatYearDataForGraphs(data) {
  dataTemp = {};

  data.forEach(function(ev) {
    var d = new Date(ev.timestamp.replace(" ", "T"));
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    var monthString = d.toISOString().substr(0, 7); // year-month
    var intensity = parseInt(JSON.parse(ev.fields).Intensity);

    if (!dataTemp[monthString]) {
      dataTemp[monthString] = {
        frequency: 1,
        total_intensity: intensity
      };
    } else {
      dataTemp[monthString].frequency += 1;
      dataTemp[monthString].total_intensity += intensity;
    }
  });
  return dataTemp;
}

/*month is a date object where only the month and year are used, symptom is a string */
export function pullSymptomForGraphs(month, symptom, callback) {
  formattedMonth = month.toISOString().substr(0, 7);
  var params = [symptom, formattedMonth];
  Database.transaction(
    tx =>
      tx.executeSql(
        "SELECT event_id,event_type_name, timestamp, fields, strftime('%Y-%m',timestamp) FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name = ? and \
      strftime('%Y-%m',timestamp) = ? ORDER BY timestamp",
        params,
        (tx, { rows }) => callback(formatDataForGraphs(rows._array))
      ),
    err => console.log(err)
  );
}

/*month is a date object where only year is used, symptom is a string */
export function pullYearlySymptomForGraphs(year, symptom, callback) {
  formattedYear = year.toISOString().substr(0, 4);

  var params = [symptom, formattedYear];
  Database.transaction(
    tx =>
      tx.executeSql(
        "SELECT event_id,event_type_name, timestamp, fields, strftime('%Y',timestamp) FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name = ? and \
      strftime('%Y',timestamp) = ? ORDER BY timestamp",
        params,
        (tx, { rows }) => callback(formatYearDataForGraphs(rows._array))
      ),
    err => console.log(err)
  );
}

/* gets all Symptoms from database and calls callback with array */
export function pullAllSymptoms(callback) {
  Database.transaction(
    tx =>
      tx.executeSql(
        "SELECT event_id,event_type_name, timestamp, fields FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name != 'Medication Reminder' ORDER BY timestamp",
        [],
        (_, { rows }) => callback(rows._array)
      ),
    err => console.log(err)
  );
}

/* gets all Medicine from database and calls callback with array */
export function pullAllMedicineData(callback) {
  Database.transaction(
    tx =>
      tx.executeSql(
        "SELECT event_id,event_type_name, timestamp, fields FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name = 'Medication Reminder' ORDER BY timestamp",
        [],
        (_, { rows }) => callback(rows._array)
      ),
    err => console.log(err)
  );
}

/* gets all EventTypes from database that have data logged and  calls callback with array */
export function pullAllLoggedSymptomsTypes(callback) {
  Database.transaction(
    tx =>
      tx.executeSql(
        "SELECT DISTINCT event_type_name FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name != 'Medication Reminder' ORDER BY timestamp",
        [],
        (_, { rows }) => callback(rows._array)
      ),
    err => console.log(err)
  );
}

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function formatAgenda(data) {
  agendaFlatList = [];
  data.forEach(function(ele) {
    formattedTime = Moment(ele.timestamp, "YYYY-MM-DD HH:mm:ss").format(
      "h:mm A"
    );
    j = JSON.parse(ele.fields);
    note_value1 = ele.card_field_id1 + ": " + j[ele.card_field_id1];
    note_value2 = ele.card_field_id2 + ": " + j[ele.card_field_id2];
    note_value3 = "Other" + ": " + j["Other"];
    // TODO: should have error checking here incase json is malformatted
    // TODO: should use event_type_name for cardData

    elementRecord = {
      id: ele.event_id,
      cardData: getCardData(ele.event_type_name),
      timeStamp: formattedTime,
      note1: note_value1,
      note2: note_value2,
      note3: note_value3
    };

    let d = new Date(ele.day);
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);

    let foundDate = false;
    for (var i = 0; i < agendaFlatList.length; i++) {
      if (sameDay(agendaFlatList[i].date, d)) {
        agendaFlatList[i].data.push(elementRecord);
        foundDate = true;
        break;
      }
    }
    if (!foundDate) {
      agendaFlatList.push({ date: d, data: [elementRecord] });
    }
  });

  return agendaFlatList;
}
export function pullAgendaFromDatabase(callback) {
  // Agenda query
  Database.transaction(
    tx =>
      tx.executeSql(
        "SELECT event_id,event_type_name, timestamp,card_field_id1, card_field_id2, event_type_icon, fields,strftime('%Y-%m-%d',timestamp) as day FROM event_tbl \
    INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
    INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
    WHERE timestamp != '1950-01-01 00:00:00' and event_type_name != 'Medication Reminder' ORDER BY timestamp",
        [],
        (tx, { rows }) => callback(formatAgenda(rows._array))
      ),
    err => console.log(err)
  );
}

export function asyncDeleteEvent(id) {
  inputArray = [id];
  Database.transaction(
    tx => {
      tx.executeSql(
        "DELETE FROM event_tbl WHERE event_details_id = ?",
        inputArray,
        (tx, { rows }) => {},
        err => console.log(err)
      );
      tx.executeSql(
        "DELETE FROM event_details_tbl WHERE event_details_id = ?",
        inputArray,
        (tx, { rows }) => {},
        err => console.log(err)
      );
    },
    err => console.log(err)
  );
}

export function asyncDeleteMedicine(name) {
  Database.transaction(
    tx => {
      tx.executeSql(
        "Select * from event_details_tbl",
        [],
        (tx, { rows }) => {
          let removeIds = [];
          let today = Moment(new Date()).format('YYYY-MM-DD')
          rows._array.forEach(med => {
            let fields = JSON.parse(med.fields);
            console.log("fields")
            console.log(fields)
            if (fields["Pill Name"] == name && fields["Start Date"] >= today) {
              removeIds.push(med["event_details_id"]);
            }
          });

          deleteEventTblQuery = "DELETE FROM event_tbl WHERE ";
          deleteEventDetailTblQuery = "DELETE FROM event_details_tbl WHERE ";

          removeIds.forEach((id, idx, arr) => {
            deleteEventTblQuery += "event_details_id = ?";
            deleteEventDetailTblQuery += "event_details_id = ?";
            if (idx != arr.length - 1) {
              deleteEventTblQuery += " OR ";
              deleteEventDetailTblQuery += " OR ";
            }
          });

          tx.executeSql(
            deleteEventTblQuery,
            removeIds,
            (tx, { rows }) => {
              {
              }
            },
            err => console.log(err)
          );
          tx.executeSql(
            deleteEventDetailTblQuery,
            removeIds,
            (tx, { rows }) => {
              {
              }
            },
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
    },
    err => console.log(err)
  );
}

function formatMedicineData(data) {
  dataTemp = {};
  data.forEach(function(med) {
    let earliestTime = new Date(med.timestamp.replace(" ", "T"));
    let fields = JSON.parse(med.fields);
    if (!dataTemp[fields["Pill Name"]]) {
      dataTemp[fields["Pill Name"]] = {
        dosage: fields["Dosage"],
        time: fields["Time"],
        timeCategory: fields["Time Category"],
        taken: fields["Taken"],
        takenTime: fields["Taken Time"],
        startDate: fields["Start Date"],
        endDate: fields["End Date"],
        notificationStatus: fields["Notification On"]
      };
    }
  });

  return dataTemp;
}

export function pullMedicineFromDatabase(date, callback) {
  // date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  let day = toDateString(date);
  dayArray = [day];

  Database.transaction(tx => {
    tx.executeSql(
      "SELECT event_id,event_tbl.event_details_id,event_type_name, timestamp,fields,strftime('%Y-%m-%d',timestamp) as day FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name = 'Medication Reminder' AND day = ? ORDER BY timestamp",
      dayArray,
      (_, { rows }) => callback(formatMedicineData(rows._array)),
      err => console.log(err)
    );
  });
}

export function getIds(rows, callback) {
  event_details_id = -1;
  event_id = -1;
  for (var i = 0; i < rows._array.length; i++) {
    if (rows._array[i]["id_name"] === "event_id") {
      event_id = rows._array[i]["id_value"];
    }
    if (rows._array[i]["id_name"] === "event_details_id") {
      event_details_id = rows._array[i]["id_value"];
    }
  }
  callback(event_id, event_details_id);
}

export function asyncCreateMedicineEvents(
  name,
  dosage,
  startDate,
  endDate,
  timeArray,
  timeCategories,
  granularity,
  frequency,
) {
  Database.transaction(
    tx => {
      tx.executeSql("SELECT * from id_tbl", [], (_, { rows }) =>
        getIds(rows, (event_id, event_details_id) =>
          asyncCreateMedicineEventsWrapper(
            name,
            dosage,
            startDate,
            endDate,
            timeArray,
            timeCategories,
            event_id,
            event_details_id,
            granularity,
            frequency,
          )
        )
      );
    },
    err => console.log(err)
  );
}
/*startDate and endDate should be javascript dates*/
export function asyncCreateMedicineEventsWrapper(
  name,
  dosage,
  startDate,
  endDate,
  timeArray,
  timeCategories,
  event_id,
  event_details_id,
  granularity,
  frequency,
) {
  Database.transaction(
    tx => {
      var skip = 1;
      console.log(frequency)
      if (granularity == "Daily") {
        skip = 1 * parseInt(frequency)
      }
      else if (granularity == "Weekly") {
        skip = 7 * parseInt(frequency)
      }
      else {
        skip = 30 * parseInt(frequency)
      }

      var iterSkip = 1;

      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dateString = d.toISOString().substr(0, 10);
        if (iterSkip != 1) {
          iterSkip = iterSkip - 1;
          continue;
        }
        iterSkip = skip;
        /* inserting event_details record */
        var taken = timeArray.map(t => {
          return false;
        });
        var takenTimeInit = timeArray.map(t => {
          return "";
        });
        detailsJson = {
          "Pill Name": name,
          Dosage: dosage,
          "Start Date": startDate,
          "End Date": endDate,
          Time: timeArray,
          "Time Category": timeCategories,
          Taken: taken,
          "Taken Time": takenTimeInit,
          "Notification On": true
        };
        var inputArray = [
          String(event_details_id),
          JSON.stringify(detailsJson)
        ];
        tx.executeSql(
          "INSERT OR REPLACE INTO event_details_tbl (event_details_id,fields) VALUES (?,?)",
          inputArray
        );

        /* inserting event record */
        var formattedTimeStamp = Moment(
          dateString + " " + timeArray[0],
          "YYYY-MM-DD HH:mm"
        ).format("YYYY-MM-DD HH:mm:ss");
        inputArray = [
          String(event_id),
          "4",
          formattedTimeStamp,
          String(event_details_id)
        ];
        tx.executeSql(
          "INSERT OR REPLACE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (?, ?,?,?)",
          inputArray
        );
        event_id += 1;
        event_details_id += 1;
      }
      inputArray = ["event_id", event_id];
      /*update event_id and event_details_id */
      tx.executeSql(
        "INSERT OR REPLACE INTO id_tbl (id_name,id_value) VALUES (?,?)",
        inputArray
      );
      inputArray = ["event_details_id", event_details_id];
      tx.executeSql(
        "INSERT OR REPLACE INTO id_tbl (id_name,id_value) VALUES (?,?)",
        inputArray
      );
    },
    err => console.log(err)
  );
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

/*TODO: clean up updateMedicine functions*/
function updateMedicineData(data, time, takenVal, callback) {
  data.forEach(function(med) {
    var fields = JSON.parse(med.fields);
    var idx = getAllIndexes(fields["Time Category"], time);
    let newTaken = fields["Taken"].slice();
    let newTakenTime = fields["Taken Time"].slice();

    for (var i = 0; i < idx.length; i++) {
      if (newTaken[idx[i]] != takenVal) {
        newTaken[idx[i]] = takenVal;
        newTakenTime[idx[i]] = Moment().format("HH:mm");
      }
    }

    fields["Taken"] = newTaken;
    fields["Taken Time"] = newTakenTime;

    let newFields = JSON.stringify(fields);
    let queryArgs = [newFields, med.event_details_id];
    Database.transaction(
      tx => {
        tx.executeSql(
          "Update event_details_tbl SET fields =? where event_details_id= ? ",
          queryArgs,
          (tx, results) => {
            if (callback) callback();
          }
        );
      },
      err => console.log(err)
    );
  });
}

function updateSingleMedicine(data, name, dosage, time, takenVal, idx) {
  data.some(function(med) {
    var fields = JSON.parse(med.fields);
    if (fields["Pill Name"] === name && fields["Dosage"] === dosage) {
      if (idx != -1) {
        let newTaken = fields["Taken"].slice();
        newTaken[idx] = takenVal;
        fields["Taken"] = newTaken;
        let newTakenTime = fields["Taken Time"].slice();
        newTakenTime[idx] = takenVal == true ? Moment().format("HH:mm") : "";
        fields["Taken Time"] = newTakenTime;
        let newFields = JSON.stringify(fields);
        let queryArgs = [newFields, med.event_details_id];
        Database.transaction(
          tx => {
            tx.executeSql(
              "Update event_details_tbl SET fields =? where event_details_id= ? ",
              queryArgs
            );
          },
          err => console.log(err)
        );

        return true;
      }
    }
    return false;
  });
}
export function databaseTakeMedicines(date, timeIndex, takenVal, callback) {
  let timeArray = ["Morning", "Afternoon", "Evening", "Night"];
  let timeString = timeArray[timeIndex];
  let day = toDateString(date);
  dayArray = [day];

  Database.transaction(
    tx => {
      tx.executeSql(
        "SELECT event_id,event_tbl.event_details_id,event_type_name, timestamp,fields,strftime('%Y-%m-%d',timestamp) as day FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name = 'Medication Reminder' AND day = ? ORDER BY timestamp",
        dayArray,
        (_, { rows }) =>
          updateMedicineData(rows._array, timeString, takenVal, callback)
      );
    },
    err => console.log(err)
  );
}

//pass in time as 24 hour time string
export function databaseTakeMedicine(date, name, dosage, time, takenVal, idx) {
  let day = toDateString(date);
  dayArray = [day];
  Database.transaction(
    tx => {
      tx.executeSql(
        "SELECT event_id,event_tbl.event_details_id,event_type_name, timestamp,fields,strftime('%Y-%m-%d',timestamp) as day FROM event_tbl \
    INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
    INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
    WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name = 'Medication Reminder' AND day = ? ORDER BY timestamp",
        dayArray,
        (_, { rows }) =>
          updateSingleMedicine(rows._array, name, dosage, time, takenVal, idx),
        err => console.log(err)
      );
    },
    err => console.log(err)
  );
}

/**
 * Given unique (medication name, dosage, time, notification key), writes it to storage
 * Time entries are in moment 'YYYY-MM-DDTHH:mm' format
 */
export function asyncCreateNotifications(name, dosage, time, notifKey) {
  let args = [name, dosage, time, notifKey];
  Database.transaction(
    tx => {
      tx.executeSql(
        "INSERT OR IGNORE INTO notifications_tbl (name,dosage,time,notificationKey) VALUES (?,?,?,?)",
        args,
        () => {},
        err => console.log(err)
      );
    },
    err => console.log(err)
  );
}

/**
 * Given medication name, dosage, and time, calls callback on SINGLE notification key
 * Time entries must be in moment 'YYYY-MM-DDTHH:mm' format
 */
export function asyncGetNotificationKey(name, dosage, time, callback) {
  let args = [name, dosage, time];
  Database.transaction(
    tx => {
      tx.executeSql(
        "SELECT notificationKey from notifications_tbl WHERE name = ? AND dosage = ? AND time = ?",
        args,
        (_, { rows }) => {
          callback(
            rows._array.length == 1 ? rows._array[0].notificationKey : ""
          );
        },
        err => console.log(err)
      );
    },
    err => console.log(err)
  );
}

/**
 * Given SINGLE (medication name, dosage, time), removes it from storage.
 */
export function asyncDeleteNotifications(name, dosage, time) {
  let args = [name, dosage, time];
  Database.transaction(
    tx => {
      tx.executeSql(
        "DELETE FROM notifications_tbl WHERE name = ? AND dosage = ? AND time = ?",
        args,
        (a, b) => {},
        err => console.log(err)
      );
    },
    err => console.log(err)
  );
}
/**
 *
 */
export function printAllNotifications() {
  Database.transaction(
    tx => {
      tx.executeSql(
        "SELECT * from notifications_tbl",
        [],
        (_, { rows }) => {
          console.log(rows._array);
        },
        err => console.log(err)
      );
    },
    err => console.log(err)
  );
}
printAllNotifications();

export function asyncSettingUpdate(name, value) {
  inputArray = [name, value];
  Database.transaction(
    tx => {
      tx.executeSql(
        "INSERT OR REPLACE INTO settings_tbl (setting_name,setting_value) VALUES (?,?)",
        inputArray
      );
    },
    err => console.log(err)
  );
}

function parseSettings(data) {
  obj = {};
  data.forEach(function(ele) {
    obj[ele.setting_name] = ele.setting_value;
  });
  return obj;
}
export function pullSettingsFromDatabase(callback) {
  Database.transaction(
    tx => {
      tx.executeSql("SELECT * from settings_tbl", [], (_, { rows }) =>
        callback(parseSettings(rows._array))
      );
    },
    err => console.log(err)
  );
}

export function pullIsFirstFromDatabase(callback) {
  Database.transaction(tx => {
    tx.executeSql(
      "SELECT is_first FROM is_first_tbl \
      WHERE is_first != 1",
      [],
      (_, { rows }) => {
        callback(rows.length == 0);
      },
      err => console.log(err, "pullIsFirstFromDatabase")
    );
  });
}

export function logIsFirst(callback) {
  Database.transaction(tx => {
    tx.executeSql("INSERT OR IGNORE INTO is_first_tbl (is_first) VALUES (0)");
  });
  Database.transaction(tx => {
    tx.executeSql("SELECT is_first FROM is_first_tbl", [], (_, { rows }) => {});
  });
}

export function updateMedicineNotification(
  data,
  name,
  dosage,
  newIsOn,
  callback
) {
  data.forEach(function(med) {
    var fields = JSON.parse(med.fields);
    if (fields["Pill Name"] === name && fields["Dosage"] === dosage) {
      fields["Notification On"] = newIsOn;
      let newFields = JSON.stringify(fields);
      let queryArgs = [newFields, med.event_details_id];
      Database.transaction(
        tx => {
          tx.executeSql(
            "Update event_details_tbl SET fields =? where event_details_id= ? ",
            queryArgs,
            () => {
              if (callback) {
                callback();
              }
            }
          );
        },
        err => console.log(err, "updateMedicineNotification")
      );
    }
  });
}

/**
 * databaseMedicineNotification(n,d,o,c) sets o, whether notifications are on
 * for medicine with name n and dosage d. c is callback function called when transaction
 * terminates.
 */
export function databaseMedicineNotification(name, dosage, newIsOn, callback) {
  Database.transaction(
    tx => {
      tx.executeSql(
        "SELECT event_id,event_tbl.event_details_id,event_type_name, timestamp,fields,strftime('%Y-%m-%d',timestamp) as day FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != '1950-01-01 00:00:00' AND event_type_name = 'Medication Reminder' ORDER BY timestamp",
        [],
        (_, { rows }) => {
          updateMedicineNotification(
            rows._array,
            name,
            dosage,
            newIsOn,
            callback
          );
        },
        err => console.log(err, "DatabaseMedicineNotification")
      );
    },
    err => console.log(err, "databaseMedicineNotification")
  );
}

/*
Export all symptoms in an array of objects, where each object contains relevant fields

each object has the format

{
symptom:
timestamp:
...
}

In place of ... are fields associated with that symptom
*/
export function exportAllSymptoms(callBack) {
  pullAllSymptoms(symptoms => {
    let formattedSymptoms = [];

    symptoms.map((symptom, index) => {
      if (symptom.event_type_name != "Medication Reminder") {
        let symptomTemp = {};
        symptomTemp.symptom = symptom.event_type_name;
        symptomTemp.timestamp = symptom.timestamp;

        let fields = JSON.parse(symptom.fields);
        let fieldEntries = Object.entries(fields);

        for (const [field, value] of fieldEntries) {
          symptomTemp[field] = value;
        }
        formattedSymptoms.push(symptomTemp);
      }
    });
    callBack(formattedSymptoms);
  });
}
/*
Generates an array of objects with keys:
medicine, dosage, date, time prescribed,time taken, status,
*/
export function exportAllMedications(callBack) {
  pullAllMedicineData(medicineData => {
    let formattedMedicine = [];
    medicineData.forEach((element, index) => {
      let tempMedFormatted = {};
      let medInfo = JSON.parse(element.fields);

      //need to check if medicine is before the current time
      let tempDate = medInfo["Start Date"];
      if (!Moment(tempDate).isBefore(new Date())) {
        return;
      }

      tempMedFormatted.medicine = medInfo["Pill Name"];
      tempMedFormatted.dosage = medInfo["Dosage"];
      tempMedFormatted.date = Moment(medInfo["Start Date"]).format("M/D/YY");
      tempMedFormatted["time prescribed"] = medInfo["Time"].join("; ");

      tempMedFormatted["time taken"] = medInfo["Taken Time"]
        .map((time, index) => (time != "" ? time : "N/A"))
        .join("; ");
      tempMedFormatted["status"] = medInfo["Taken"]
        .map((status, index) => (status ? "Taken" : "Not Taken"))
        .join("; ");
      formattedMedicine.push(tempMedFormatted);
    });
    callBack(formattedMedicine);
  });
}

/**
 * getter for experimental survey setting
 */
export function databaseGetSurveyIsOn(callback) {
  Database.transaction(
    tx => {
      tx.executeSql(
        "SELECT * from survey_tbl",
        [],
        (_, { rows }) => {
          if (callback) {
            callback(rows._array.length > 0);
          }
        },
        err => console.log(err, "surveyIsOn")
      );
    },
    err => console.log(err, "surveyIsOn")
  );
}

/**
 * setter for experimental survey setting
 */
export function databaseSetSurveyIsOn(newIsOn) {
  Database.transaction(
    tx => {
      if (newIsOn) {
        tx.executeSql(
          "INSERT OR IGNORE INTO survey_tbl (surveyIsOn) values (1)",
          [],
          () => {},
          err => console.log(err, "surveyIsOn")
        );
      } else {
        tx.executeSql(
          "DELETE FROM survey_tbl",
          [],
          () => {},
          err => console.log(err, "surveyIsOn")
        );
      }
    },
    err => console.log(err, "surveyIsOn")
  );
}

/**
 * getter for experimental survey setting
 */
export function databaseGetUUID(callback) {
  Database.transaction(
    tx => {
      tx.executeSql(
        "SELECT * from uuid_tbl",
        [],
        (_, { rows }) => {
          if (callback) {
            callback(rows._array.length > 0 ? rows._array[0].uuid : "");
          }
        },
        err => console.log(err, "UUID")
      );
    },
    err => console.log(err, "UUID")
  );
}

/**
 * setter for UUID
 */
export function databaseSetUUID(uuid) {
  let id_arg = [uuid];

  databaseGetUUID(id => {
    if (id == "") {
      //is not defined
      Database.transaction(
        tx => {
          tx.executeSql(
            "INSERT OR IGNORE INTO uuid_tbl (uuid) VALUES (?)",
            id_arg,
            () => {},
            err => console.log(err, "UUID")
          );
        },
        err => console.log(err, "UUID")
      );
    }
  });
}

/**
 * getter for last completed survey date
 */
export function databaseGetSurveyDate(callback) {
  Database.transaction(
    tx => {
      tx.executeSql(
        "SELECT * from survey_last_completed_tbl",
        [],
        (_, { rows }) => {
          if (callback) {
            callback(rows._array.length == 1 ? rows._array[0].date : undefined);
          }
        },
        err => console.log(err, "survey_last_completed_tbl get")
      );
    },
    err => console.log(err, "survey_last_completed_tbl get2")
  );
}

/**
 * setter for last completed survey date
 */
export function databaseSetSurveyDate(date) {
  let date_arg = [date]

  Database.transaction(
    tx => {
      tx.executeSql(
        "DELETE FROM survey_last_completed_tbl",
        [],
        () => {
          Database.transaction(
            tx => {
              tx.executeSql(
                "INSERT OR IGNORE INTO survey_last_completed_tbl (date) VALUES (?)",
                date_arg,
                () => {},
                err => console.log(err, "survey_last_completed_tbl1")
              );
            },
            err => console.log(err, "survey_last_completed_tbl2")
          );
        },
        err => console.log(err, "survey_last_completed_tbl3")
      );
    },
    err => console.log(err, "survey_last_completed_tbl4")
  );
}
