import Database from '../Database';

export function formatData(data){
  console.log(data)
  dataTemp = {};
  data.forEach(function(ev){
    let d = new Date(ev.timestamp.replace(' ','T'));
    let day = d.getDate() - 1;
    console.log(day)
    let symptom = ev.event_type_name;
    let intensity = parseInt(JSON.parse(ev.fields).Intensity) * 2 ;

    if(!dataTemp[symptom]){
      dataTemp[symptom] = {
        intensities: [],
        count: [],
      };
    }
    dataTemp[symptom].count[day] = (dataTemp[symptom].count[day] || 0) + 1;
    dataTemp[symptom].intensities[day] = ((dataTemp[symptom].intensities[day] || 0)*(dataTemp[symptom].count[day]-1) + intensity)/dataTemp[symptom].count[day];
  });
  //console.log(dataTemp)
  return dataTemp;
}


export function databaseFakeData(){
    //console.log('faking data')
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
    },err=> console.log(err));
    /*Database.transaction(tx => {
        tx.executeSql('Select * from event_tbl',[], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        )
    },err=> console.log(err));*/
    /*Database.transaction(tx => {
        tx.executeSql('Select * from event_details_tbl',[], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        )
    },err=> console.log(err));*/
}


export function pullFromDataBase(month, day, callback){
  databaseFakeData();
  console.log('pulling from database');
  
  formattedMonth = month.toISOString().substr(0,7)
  var arrayFormattedMonth = [formattedMonth]
  Database.transaction(tx => (tx.executeSql("SELECT event_id,event_type_name, timestamp, fields, strftime(\'%Y-%m\',timestamp) FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != \'1950-01-01 00:00:00\' AND strftime(\'%Y-%m\',timestamp) = ? ORDER BY timestamp", arrayFormattedMonth, (tx, { rows }) => callback(formatData(rows._array)))),err=>console.log(err));
      
 
      
  /*
  day = '2018-03-07'
  // Agenda query
  Database.transaction(tx => (tx.executeSql('SELECT event_id,event_type_name, timestamp,card_field_id1, card_field_id2, event_type_icon, fields,strftime(\'%Y-%m-%d\',timestamp) FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != \'1950-01-01 00:00:00\' AND \
      strftime(\'%Y-%m-%d\',timestamp) = ? ORDER BY timestamp', [day], (tx, { rows }) => console.log(rows._array))),err=>console.log(err));
      */
}
