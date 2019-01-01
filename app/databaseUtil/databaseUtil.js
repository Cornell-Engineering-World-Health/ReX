import Database from "../Database";
import Moment from "moment";
import constants, { getCardData } from "../resources/constants";

export function createTables() {
  console.log("creating tables");
  Database.transaction(
    tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `event_details_tbl` (`event_details_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `fields` TEXT NOT NULL);"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `field_to_view_tbl` (`field_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `field_name` TEXT NOT NULL UNIQUE, `view_name` TEXT NOT NULL);"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `event_type_tbl` (`event_type_id` INTEGER NOT NULL PRIMARY KEY UNIQUE,`event_type_name` TEXT NOT NULL UNIQUE, `event_type_icon` TEXT NOT NULL, `card_field_id1` INTEGER, `card_field_id2` INTEGER,`event_type_category` TEXT, FOREIGN KEY(card_field_id1) REFERENCES `field_to_view_tbl`(`field_id`), FOREIGN KEY(`card_field_id2`) REFERENCES `field_to_view_tbl` (`field_id`));"
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS `event_tbl` (`event_id` INTEGER NOT NULL PRIMARY KEY,`event_type_id` INTEGER NOT NULL, `timestamp` TEXT NOT NULL, `event_details_id` INTEGER NOT NULL UNIQUE, FOREIGN KEY(`event_details_id`) REFERENCES `event_details_tbl`(`event_details_id`), FOREIGN KEY(`event_type_id`) REFERENCES `event_type_tbl`(`event_type_id`));"
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
    },
    err => console.log(err, "error creating tables"),
    () => console.log("done creating tables.")
  );
}
export function intializeDatabase() {
  console.log("intializing database");
  date = new Date();
  Database.transaction(
    tx => {
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (1, 'Headache', 'image.png', 'Intensity','Duration','HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,event_type_category) values                              (2, 'Dizziness', 'image.png', 'HEAD')"
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
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (8, 'Pulsatile Tinnitus', 'image.png', 'Intensity','Duration','HEAD')"
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
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (13, 'Hand Pain', 'image.png', 'Intensity','Duration','ARMS')"
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
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (17, 'Dysgeusia', 'image.png', 'Intensity','Duration','HEAD')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (18, 'Diarrhea', 'image.png', 'Intensity','Duration','BODY')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (19, 'Vomiting', 'image.png', 'Intensity','Duration','TORSO')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (20, 'Heart Pain', 'image.png', 'Intensity','Duration','HEAD')"
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
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1,\'{"Intensity": "3","Duration": "40"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (2,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (3,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (5,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (6,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (7,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (8,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (9,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (10,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (11,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (12,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (13,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (14,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (15,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (16,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (17,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (18,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (19,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (20,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )'
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
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('height_inches','8')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('weight','Select')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('height','Select')"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES ('name','Select Edit')"
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
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (50,\
    \'{"Pill Name": "Tylenol","Dosage": "20mg","Start Date": "2018-10-01","End Date": "2018-11-30","Days Of Week": [1,1,1,1,1,0,0],"Time": ["09:00","18:00"],"Time Category": ["Morning","Evening"],"Taken": [true,true], "Notification On": false}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (50, 4,'1950-01-01 00:00:00', 50)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (51,\
    \'{"Pill Name": "Aspirin","Dosage": "400mg","Start Date": "2018-10-01","End Date": "2018-11-30","Days Of Week": [1,1,1,1,1,1,1],"Time": ["09:00"],"Time Category": ["Morning"],"Taken": [true], "Notification On": false}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (51, 4,'1950-01-01 00:00:00', 51)"
      );
      //Initialize first time app open tbl
      tx.executeSql("INSERT OR IGNORE INTO is_first_tbl (is_first) VALUES (1)");
    },
    err => console.log(err, "error in initialization"),
    () => console.log("intitialization complete")
  );

  Database.transaction(
    tx => {
      tx.executeSql("Select * from event_type_tbl;", [], (tx, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    err => console.log(err)
  );
  // console.log(Database)
}

export function formatData(data) {
  // console.log(data)
  dataTemp = {};
  data.forEach(function(ev) {
    let d = new Date(ev.timestamp.replace(" ", "T"));
    let day = d.getDate() - 1;
    let symptom = ev.event_type_name;
    let intensity = parseInt(JSON.parse(ev.fields).Intensity) * 2;

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
  //console.log(dataTemp)
  return dataTemp;
}

export function databaseFakeData() {
  console.log("faking data");
  Database.transaction(
    tx => {
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (300,\'{"Intensity": "2","Duration": "40"}\')'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (300, 1,'2018-03-07 06:00:00', 300)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (400,\'{"Intensity": "4","Duration": "50"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (400, 1,'2018-03-07 06:01:00', 400)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (500,\'{"Intensity": "3","Duration": "30"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (500, 1,'2018-03-06 06:01:00', 500)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (600,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (600, 1,'2018-03-06 06:01:00', 600)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (700,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (700, 1,'2018-03-08 06:01:00', 700)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (800,\'{"Intensity": "1","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (800, 1,'2018-03-09 06:01:00', 800)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (900,\'{"Intensity": "1","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (900, 1,'2018-03-09 06:01:00', 900)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1000,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (1000, 1,'2018-03-17 06:01:00', 1000)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1100,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (1100, 1,'2018-04-17 06:01:00', 1100)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1400,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (1400, 3,'2018-04-17 06:01:00', 1400)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1500,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (1500, 3,'2018-04-19 06:01:00', 1500)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (170,\'{"Intensity": "2","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (170, 3,'2018-04-03 06:01:00', 170)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (180,\'{"Intensity": "2","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (180, 3,'2018-04-07 06:01:00', 180)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (190,\'{"Intensity": "4","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (190, 3,'2018-04-11 06:01:00', 190)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (200,\'{"Intensity": "4","Duration": "10"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (200, 5,'2018-04-17 12:00:00', 200)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (21,\'{"Intensity": "2","Duration": "10"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (21, 5,'2018-04-03 06:01:00', 21)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (22,\'{"Intensity": "4","Duration": "10"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (22, 5,'2018-04-05 06:01:00', 22)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (23,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (24, 3,'2018-04-04 06:01:00', 24)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (24,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (23, 3,'2018-04-23 06:01:00', 23)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (25,\'{"Intensity": "4","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (25, 3,'2018-04-27 06:01:00', 25)"
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (26, 1,'2018-04-15 06:01:00', 26)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (26,\'{"Intensity": "5","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (27, 1,'2018-04-14 06:01:00', 27)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (27,\'{"Intensity": "4","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (28, 1,'2018-04-09 06:01:00', 28)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (28,\'{"Intensity": "4","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (29, 5,'2018-04-21 06:01:00', 29)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (29,\'{"Intensity": "4","Duration": "60"}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (30, 5,'2018-04-06 06:01:00', 30)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (30,\'{"Intensity": "4","Duration": "60"}\' )'
      );

      /* medication reminder fake data */
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (52,\
               \'{"Pill Name": "Tylenol","Dosage": "20mg",  "Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00","18:00"],"Time Category": ["Morning","Evening"],"Days Of Week": [0,0,1,0,0,0,0],"Taken": [false,false], "Notification On": false}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (52, 4,'2018-11-19 09:00:00', 52)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (53,\
              \'{"Pill Name": "Aspirin","Dosage": "400mg","Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00"],"Time Category": ["Morning"],"Days Of Week": [0,0,1,0,0,0,0],"Taken": [false], "Notification On": false}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (53, 4,'2018-11-19 09:00:00', 53)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (54,\
              \'{"Pill Name": "Tylenol","Dosage": "20mg",  "Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00","18:00"],"Time Category": ["Morning","Evening"],"Days Of Week": [0,0,0,1,0,0,0],"Taken": [false,false], "Notification On": false}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (54, 4,'2018-11-19 09:00:00', 54)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (55,\
              \'{"Pill Name": "Aspirin","Dosage": "400mg","Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00"],"Time Category": ["Morning"],"Days Of Week": [0,0,0,1,0,0,0],"Taken": [false], "Notification On": false}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (55, 4,'2018-11-19 09:00:00', 55)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (56,\
              \'{"Pill Name": "Tylenol","Dosage": "20mg",  "Start Date": "2018-08-01","End Date": "2018-09-30","Time": ["09:00","18:00"],"Time Category": ["Morning","Evening"],"Days Of Week": [0,0,0,0,1,0,0],"Taken": [true,false], "Notification On": false}\' )'
      );

      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (56, 4,'2018-11-19 09:00:00', 56)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (57,\
              \'{"Pill Name": "Aspirin","Dosage": "400mg","Start Date": "2018-08-01","End Date": "2018-11-19","Time": ["09:00"],"Time Category": ["Morning"],"Days Of Week": [0,0,0,0,1,0,0],"Taken": [false], "Notification On": false}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (57, 4,'2018-11-19 09:00:00', 57)"
      );

      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1800,\
              \'{"Pill Name": "Crestor","Dosage": "400mg","Start Date": "2018-11-18","End Date": "2018-11-19","Time": ["12:00"],"Time Category": ["Morning"],"Days Of Week": [0,0,0,0,1,0,0],"Taken": [false], "Notification On": false}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (1800, 4,'2018-11-19 12:00:00', 1800)"
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1801,\
              \'{"Pill Name": "Advair","Dosage": "400mg","Start Date": "2018-11-18","End Date": "2018-11-19","Time": ["18:00"],"Time Category": ["Morning"],"Days Of Week": [0,0,0,0,1,0,0],"Taken": [false], "Notification On": false}\' )'
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (1801, 4,'2018-11-19 12:00:00', 1801)"
      );
      tx.executeSql(
        "INSERT OR REPLACE INTO is_first_tbl (is_first) VALUES (0)"
      );
    },
    err => console.log(err)
  );
}

/* pulls data from Database for month and formats it for calendar */
export function pullFromDataBase(month, day, callback) {
  // console.log('pulling from database');

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
  //console.log('data for graphs ', data)
  data.forEach(function(ev) {
    var d = new Date(ev.timestamp.replace(" ", "T"));
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    var monthString = d.toISOString().substr(0, 10); // year-month-day
    var intensity = parseInt(JSON.parse(ev.fields).Intensity);

    // console.log(intensity);
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
  console.log("data for graphs ", data);
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
  console.log(formattedYear);
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
      WHERE timestamp != '1950-01-01 00:00:00' ORDER BY timestamp",
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
  // console.log('reached formatAgenda')
  // console.log(data)
  agendaFlatList = [];
  data.forEach(function(ele) {
    formattedTime = Moment(ele.timestamp, "YYYY-MM-DD HH:mm:ss").format(
      "h:mm A"
    );
    j = JSON.parse(ele.fields);
    note_value1 = ele.card_field_id1 + ": " + j[ele.card_field_id1];
    note_value2 = ele.card_field_id2 + ": " + j[ele.card_field_id2];

    // TODO: should have error checking here incase json is malformatted
    // TODO: should use event_type_name for cardData

    elementRecord = {
      id: ele.event_id,
      cardData: getCardData(ele.event_type_name),
      timeStamp: formattedTime,
      note1: note_value1,
      note2: note_value2
    };

    // console.log(elementRecord)

    let d = new Date(ele.day);
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);

    let foundDate = false;
    for (var i = 0; i < agendaFlatList.length; i++) {
      if (sameDay(agendaFlatList[i].date, d)) {
        // console.log('adding event')
        agendaFlatList[i].data.push(elementRecord);
        foundDate = true;
        break;
      }
    }

    if (!foundDate) {
      // console.log('adding a record to agendaFlatList')
      agendaFlatList.push({ date: d, data: [elementRecord] });
    }
  });

  // console.log(agendaFlatList)

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
        (tx, { rows }) => console.log("event has been deleted with id :", id),
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
        takenTime: fields["Taken Time"]
      };
    }
  });
  // console.log(dataTemp)
  return dataTemp;
}

export function pullMedicineFromDatabase(date, callback) {
  // date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  let day = date.toISOString().substr(0, 10);
  dayArray = [day];
  // console.log(dayArray)
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
      //console.log('inside getIds event_id:', event_id);
    }
    if (rows._array[i]["id_name"] === "event_details_id") {
      event_details_id = rows._array[i]["id_value"];
      //console.log('inside getIds event_id:', event_details_id);
    }
  }
  console.log("before wrapper call");
  callback(event_id, event_details_id);
}

export function asyncCreateMedicineEvents(
  name,
  dosage,
  startDate,
  endDate,
  timeArray,
  timeCategories
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
            event_details_id
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
  event_details_id
) {
  Database.transaction(
    tx => {
      for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dateString = d.toISOString().substr(0, 10);

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
          "Notification On": false
        };
        //console.log("detailsjson: ",detailsJson)
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
        //console.log('incrementing id and details_id')
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
  //console.log("ALL",data, time, takenVal)
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

    // console.log("issa idx :  " + idx)
    // console.log("issa newtaken: " +newTaken)
    // let newTakenTime = fields['Taken Time'].slice()
    // newTakenTime[idx] = Moment().format('HH:mm')
    // fields['Taken Time'] = newTakenTime
    let newFields = JSON.stringify(fields);
    let queryArgs = [newFields, med.event_details_id];
    Database.transaction(
      tx => {
        tx.executeSql(
          "Update event_details_tbl SET fields =? where event_details_id= ? ",
          queryArgs,
          (tx, results) => {
            callback();
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
        newTakenTime[idx] = Moment().format("HH:mm");
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
  let day = date.toISOString().substr(0, 10);
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
  // console.log("name:" + name + ". time: "+ time + ". takenVal:" + takenVal )
  let day = date.toISOString().substr(0, 10);
  dayArray = [day];
  // console.log(dayArray)
  // console.log('inside take medicine')
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

export function asyncSettingUpdate(name, value) {
  inputArray = [name, value];
  Database.transaction(
    tx => {
      tx.executeSql(
        "INSERT OR REPLACE INTO settings_tbl (setting_name,setting_value) VALUES (?,?)",
        inputArray,
        (f, c) => {
          tx.executeSql("Select * from settings_tbl", [], (a, b) => {
            console.log("WRITES", inputArray, c.rows, b.rows);
          });
        }
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
        console.log(rows.length);
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
