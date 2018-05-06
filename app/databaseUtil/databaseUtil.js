import Database from '../Database'
import Moment from 'moment'
import constants, {getCardData} from '../components/Resources/constants'

export function createTables () {
  console.log('creating tables')
  Database.transaction(tx => {
    tx.executeSql(
             'CREATE TABLE IF NOT EXISTS `event_details_tbl` (`event_details_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `fields` TEXT NOT NULL);'
          )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS `field_to_view_tbl` (`field_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `field_name` TEXT NOT NULL UNIQUE, `view_name` TEXT NOT NULL);'
          )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS `event_type_tbl` (`event_type_id` INTEGER NOT NULL PRIMARY KEY UNIQUE,`event_type_name` TEXT NOT NULL UNIQUE, `event_type_icon` TEXT NOT NULL, `card_field_id1` INTEGER, `card_field_id2` INTEGER,`event_type_category` TEXT, FOREIGN KEY(card_field_id1) REFERENCES `field_to_view_tbl`(`field_id`), FOREIGN KEY(`card_field_id2`) REFERENCES `field_to_view_tbl` (`field_id`));'
            )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS `event_tbl` (`event_id` INTEGER NOT NULL PRIMARY KEY,`event_type_id` INTEGER NOT NULL, `timestamp` TEXT NOT NULL, `event_details_id` INTEGER NOT NULL UNIQUE, FOREIGN KEY(`event_details_id`) REFERENCES `event_details_tbl`(`event_details_id`), FOREIGN KEY(`event_type_id`) REFERENCES `event_type_tbl`(`event_type_id`));'
          )
    tx.executeSql(
             'CREATE TABLE IF NOT EXISTS `settings_tbl` (`setting_name` TEXT NOT NULL PRIMARY KEY UNIQUE, `setting_value` TEXT NOT NULL);'
          )
          /* tx.executeSql(
           'CREATE TABLE IF NOT EXISTS view_to_component_tbl ( view_id INTEGER NOT NULL PRIMARY KEY UNIQUE, view_name TEXT NOT NULL UNIQUE, component` TEXT NOT NULL)'
          ); */
  }, err => console.log(err), () => console.log('done!!!'))
}
export function intializeDatabase () {
  console.log('intializing database')
  date = new Date()
  Database.transaction(tx => {
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (1, \'Headache\', \'image.png\', \'Intensity\',\'Duration\',\'HEAD\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,event_type_category) values (2, \'Dizziness\', \'image.png\',\'HEAD\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (3, \'Blurred Vision\', \'image.png\', \'Intensity\',\'Duration\',\'HEAD\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (4, \'Medication Reminder\', \'image.png\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (5, \'Knee Pain\', \'image.png\', \'Intensity\',\'Duration\',\'LEGS\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2,event_type_category) values (6, \'Back Pain\', \'image.png\', \'Intensity\',\'Duration\',\'TORSO\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (1, \'Intensity\', \'ScaleSlideInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (2, \'Duration\', \'NumericalPickerInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (3, \'Other\', \'TextInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (4, \'Pill Name\', \'TextInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (5, \'Dosage\', \'DosagePickerInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (6, \'Start Date\', \'DatePicker\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (7, \'End Date\', \'DatePicker\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (8, \'Time\', \'TimeCategoryInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (9, \'Time Category\', \'None\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (10, \'Days Of Week\', \'DayChooserInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (11, \'Taken\', \'None\')')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1,\'{"Intensity": "3","Duration": "40"}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (2,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (3,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (5,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (6,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (1, 1,\'1950-01-01 00:00:00\', 1)')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (2, 2,\'1950-01-01 00:00:00\', 2)')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (80, 3,\'1950-01-01 00:00:00\', 3)')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (81, 4,\'1950-01-01 00:00:00\', 1)')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (82, 5,\'1950-01-01 00:00:00\', 5)')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (83, 6,\'1950-01-01 00:00:00\', 6)')
    /* necessary default settings */
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'height_feet\',\'5\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'height_inches\',\'8\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'weight\',\'Select\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'height\',\'Select\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'name\',\'Select Edit\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'icon\',\'0\')')

    /* medication reminder examples */
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (50,\
    \'{"Pill Name": "Tylenol","Dosage": "20mg","Start Date": "2018-04-01","End Date": "2018-04-30","Days Of Week": [1,1,1,1,1,0,0],"Time": ["09:00","18:00"],"Time Category": ["Morning","Evening"],"Taken": [true,true]}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (50, 4,\'1950-01-01 00:00:00\', 50)')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (51,\
    \'{"Pill Name": "Aspirin","Dosage": "400mg","Start Date": "2018-04-01","End Date": "2018-04-20","Days Of Week": [1,1,1,1,1,1,1],"Time": ["09:00"],"Time Category": ["Morning"],"Taken": [true]}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (51, 4,\'1950-01-01 00:00:00\', 51)')
  }, err => console.log(err), () => console.log('intitialization complete'))

  Database.transaction(tx => {
    tx.executeSql('Select * from event_type_tbl;', [], (tx, {rows}) => console.log(JSON.stringify(rows)))
  }, err => console.log(err))
  // console.log(Database)
}

export function formatData (data) {
  // console.log(data)
  dataTemp = {}
  data.forEach(function (ev) {
    let d = new Date(ev.timestamp.replace(' ', 'T'))
    let day = d.getDate() - 1
    let symptom = ev.event_type_name
    let intensity = parseInt(JSON.parse(ev.fields).Intensity) * 2

    if (!dataTemp[symptom]) {
      dataTemp[symptom] = {
        intensities: [],
        count: []
      }
    }
    dataTemp[symptom].count[day] = (dataTemp[symptom].count[day] || 0) + 1
    dataTemp[symptom].intensities[day] = ((dataTemp[symptom].intensities[day] || 0) * (dataTemp[symptom].count[day] - 1) + intensity) / dataTemp[symptom].count[day]
  })
  // console.log(dataTemp)
  return dataTemp
}


export function databaseFakeData(){
    console.log('faking data')
    Database.transaction(tx => {
      tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (3,\'{"Intensity": "2","Duration": "40"}\')')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (3, 1,\'2018-03-07 06:00:00\', 3)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (4,\'{"Intensity": "4","Duration": "50"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (4, 1,\'2018-03-07 06:01:00\', 4)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (5,\'{"Intensity": "3","Duration": "30"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (5, 1,\'2018-03-06 06:01:00\', 5)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (6,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (6, 1,\'2018-03-06 06:01:00\', 6)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (7,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (7, 1,\'2018-03-08 06:01:00\', 7)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (8,\'{"Intensity": "1","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (8, 1,\'2018-03-09 06:01:00\', 8)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (9,\'{"Intensity": "1","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (9, 1,\'2018-03-09 06:01:00\', 9)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (10,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (10, 1,\'2018-03-17 06:01:00\', 10)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (11,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (11, 1,\'2018-04-17 06:01:00\', 11)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (14,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (14, 3,\'2018-04-17 06:01:00\', 14)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (15,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (15, 3,\'2018-04-19 06:01:00\', 15)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (16,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (16, 3,\'2018-04-01 06:01:00\', 16)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (17,\'{"Intensity": "2","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (17, 3,\'2018-04-03 06:01:00\', 17)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (18,\'{"Intensity": "2","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (18, 3,\'2018-04-07 06:01:00\', 18)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (19,\'{"Intensity": "4","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (19, 3,\'2018-04-11 06:01:00\', 19)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (20,\'{"Intensity": "4","Duration": "10"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (20, 5,\'2018-04-17 12:00:00\', 20)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (21,\'{"Intensity": "2","Duration": "10"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (21, 5,\'2018-04-03 06:01:00\', 21)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (22,\'{"Intensity": "4","Duration": "10"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (22, 5,\'2018-04-05 06:01:00\', 22)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (23,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (24, 3,\'2018-04-04 06:01:00\', 24)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (24,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (23, 3,\'2018-04-23 06:01:00\', 23)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (25,\'{"Intensity": "4","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (25, 3,\'2018-04-27 06:01:00\', 25)')

          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (26, 1,\'2018-04-15 06:01:00\', 26)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (26,\'{"Intensity": "5","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (27, 1,\'2018-04-14 06:01:00\', 27)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (27,\'{"Intensity": "4","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (28, 1,\'2018-04-09 06:01:00\', 28)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (28,\'{"Intensity": "4","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (29, 5,\'2018-04-21 06:01:00\', 29)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (29,\'{"Intensity": "4","Duration": "60"}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (30, 5,\'2018-04-06 06:01:00\', 30)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (30,\'{"Intensity": "4","Duration": "60"}\' )')
              /* medication reminder fake data */
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (52,\
               \'{"Pill Name": "Tylenol","Dosage": "20mg",  "Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00","18:00"],"Time Category": ["Morning","Evening"],"Days Of Week": [0,0,1,0,0,0,0],"Taken": [false,false]}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (52, 4,\'2018-04-17 09:00:00\', 52)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (53,\
              \'{"Pill Name": "Aspirin","Dosage": "400mg","Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00"],"Time Category": ["Morning"],"Days Of Week": [0,0,1,0,0,0,0],"Taken": [false]}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (53, 4,\'2018-04-17 09:00:00\', 53)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (54,\
              \'{"Pill Name": "Tylenol","Dosage": "20mg",  "Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00","18:00"],"Time Category": ["Morning","Evening"],"Days Of Week": [0,0,0,1,0,0,0],"Taken": [false,false]}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (54, 4,\'2018-04-18 09:00:00\', 54)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (55,\
              \'{"Pill Name": "Aspirin","Dosage": "400mg","Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00"],"Time Category": ["Morning"],"Days Of Week": [0,0,0,1,0,0,0],"Taken": [false]}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (55, 4,\'2018-04-18 09:00:00\', 55)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (56,\
              \'{"Pill Name": "Tylenol","Dosage": "20mg",  "Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00","18:00"],"Time Category": ["Morning","Evening"],"Days Of Week": [0,0,0,0,1,0,0],"Taken": [false,false]}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (56, 4,\'2018-05-05 09:00:00\', 56)')
          tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (57,\
              \'{"Pill Name": "Aspirin","Dosage": "400mg","Start Date": "2018-04-01","End Date": "2018-04-30","Time": ["09:00"],"Time Category": ["Morning"],"Days Of Week": [0,0,0,0,1,0,0],"Taken": [false]}\' )')
          tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (57, 4,\'2018-05-05 09:00:00\', 57)')


        /* medication reminder fake data */
  }, err => console.log(err))
    /* Database.transaction(tx => {
        tx.executeSql('Select * from event_tbl',[], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        )
    },err=> console.log(err));
    Database.transaction(tx => {
        tx.executeSql('Select * from event_details_tbl',[], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        )
    },err=> console.log(err)); */
}


export function pullFromDataBase(month, day, callback){
  console.log('pulling from database');

  formattedMonth = month.toISOString().substr(0,7)
  var arrayFormattedMonth = [formattedMonth]
  Database.transaction(tx => (tx.executeSql("SELECT event_id,event_type_name, timestamp, fields, strftime(\'%Y-%m\',timestamp) FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != \'1950-01-01 00:00:00\' AND event_type_name != \'Medication Reminder\' and \
      strftime(\'%Y-%m\',timestamp) = ? ORDER BY timestamp", arrayFormattedMonth, (tx, { rows }) => callback(formatData(rows._array)))), err => console.log(err))
}

function sameDay (d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

function formatAgenda (data) {
    // console.log('reached formatAgenda')
    // console.log(data)
  agendaFlatList = []
  data.forEach(function (ele) {
    formattedTime = Moment(ele.timestamp, 'YYYY-MM-DD HH:mm:ss').format('h:mm A')
    j = JSON.parse(ele.fields)
    note_value1 = ele.card_field_id1 + ': ' + j[ele.card_field_id1]
    note_value2 = ele.card_field_id2 + ': ' + j[ele.card_field_id2]

        // TODO: should have error checking here incase json is malformatted
        // TODO: should use event_type_name for cardData

    elementRecord = {id: ele.event_id, cardData: getCardData(ele.event_type_name), timeStamp: formattedTime, note1: note_value1, note2: note_value2}

        // console.log(elementRecord)

    let d = new Date(ele.day)
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000)

    let foundDate = false
    for (var i = 0; i < agendaFlatList.length; i++) {
      if (sameDay(agendaFlatList[i].date, d)) {
                // console.log('adding event')
        agendaFlatList[i].data.push(elementRecord)
        foundDate = true
        break
      }
    }

    if (!foundDate) {
            // console.log('adding a record to agendaFlatList')
      agendaFlatList.push({date: d, data: [elementRecord]})
    }
  })

    // console.log(agendaFlatList)

  return agendaFlatList
}
export function pullAgendaFromDatabase (callback) {
    // Agenda query
  console.log('reached pullAgendaFromDatabase')
  Database.transaction(tx => (tx.executeSql('SELECT event_id,event_type_name, timestamp,card_field_id1, card_field_id2, event_type_icon, fields,strftime(\'%Y-%m-%d\',timestamp) as day FROM event_tbl \
    INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
    INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
    WHERE timestamp != \'1950-01-01 00:00:00\' and event_type_name != \'Medication Reminder\' ORDER BY timestamp', [], (tx, { rows }) => callback(formatAgenda(rows._array)))), err => console.log(err))
}

export function asyncDeleteEvent (id) {
  inputArray = [id]
  Database.transaction(tx => {
    tx.executeSql('DELETE FROM event_tbl WHERE event_details_id = ?', inputArray)
  }, err => console.log(err))
}
function formatMedicineData (data) {
  console.log(data)
  dataTemp = {}
  data.forEach(function (med) {
    let earliestTime = new Date(med.timestamp.replace(' ', 'T'))
    let fields = JSON.parse(med.fields)

    if (!dataTemp[fields['Pill Name']]) {
      dataTemp[fields['Pill Name']] = {
        dosage: fields['Dosage'],
        time: fields['Time'],
        timeCategory: fields['Time Category'],
        taken: fields['Taken']
      }
    }
  })
  // console.log(dataTemp)
  return dataTemp
}

export function pullMedicineFromDatabase(date, callback){
  date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000 )
  let day = date.toISOString().substr(0,10)
  dayArray  = [day]
  Database.transaction(tx => {
    tx.executeSql('SELECT event_id,event_type_name, timestamp,fields,strftime(\'%Y-%m-%d\',timestamp) as day FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != \'1950-01-01 00:00:00\' AND event_type_name = \'Medication Reminder\' AND day = ? ORDER BY timestamp', dayArray, (_, { rows }) =>
      callback(formatMedicineData(rows._array)), err => console.log(err))
  })
}

function updateMedicineData(data,time,takenVal){
    data.forEach(function(med){
        var fields = JSON.parse(med.fields)
        console.log(med)
        var idx = fields['Time Category'].indexOf(time);

        if (idx !=-1){
            console.log('updating')
            let newTaken = fields['Taken'].slice()
            newTaken[idx] = takenVal
            console.log(newTaken)
            fields['Taken']= newTaken
            let newFields = JSON.stringify(fields)
            let queryArgs = [newFields, med.event_details_id]
            Database.transaction(tx => {
                tx.executeSql('Update event_details_tbl SET fields =? where event_details_id= ? ',queryArgs);
            },err=>console.log(err))
        }
    })
    /**
    Database.transaction(tx => {
        tx.executeSql('Select * from event_details_tbl where event_details_id = 55 OR event_details_id = 54',[], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        )
    },err=> console.log(err));
    */
}

export function databaseTakeMedicines(date,timeIndex,takenVal){
  let timeArray = ['Morning','Afternoon','Evening','Night']
  let timeString = timeArray[timeIndex]
  date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000 )
  let day = date.toISOString().substr(0,10)
  dayArray  = [day]

  console.log('date ', day)
  console.log('time ', timeString)

  Database.transaction(tx => {
      tx.executeSql('SELECT event_id,event_tbl.event_details_id,event_type_name, timestamp,fields,strftime(\'%Y-%m-%d\',timestamp) as day FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != \'1950-01-01 00:00:00\' AND event_type_name = \'Medication Reminder\' AND day = ? ORDER BY timestamp',dayArray, (_, { rows }) =>
      updateMedicineData(rows._array,timeString,takenVal));
  },err=>console.log(err))

}
export function asyncSettingUpdate(name, value){
  inputArray = [name,value]
  Database.transaction(tx => {
    tx.executeSql('INSERT OR REPLACE INTO settings_tbl (setting_name,setting_value) VALUES (?,?)', inputArray)
  }, err => console.log(err))
}

function parseSettings (data) {
  obj = {}
  data.forEach(function (ele) {
    obj[ele.setting_name] = ele.setting_value
  })
  return obj
}
export function pullSettingsFromDatabase (callback) {
  Database.transaction(tx => {
    tx.executeSql('SELECT * from settings_tbl', [], (_, { rows }) => callback(parseSettings(rows._array)))
  }, err => console.log(err))
}
