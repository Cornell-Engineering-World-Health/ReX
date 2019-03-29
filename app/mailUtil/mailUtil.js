import { MailComposer, FileSystem } from "expo";
import { Linking, Alert } from "react-native";
import {
  exportAllSymptoms,
  exportAllMedications,
  databaseGetUUID
} from "../databaseUtil/databaseUtil";
import { SYMPTOM_FIELDS } from "../resources/constants.js";

import Moment from "moment";
function convertArrayOfObjectsToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;
  var DEFAULT_VALUE = "N/A";

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ",";
  lineDelimiter = args.lineDelimiter || "\n";

  keys = args.keys ? args.keys : Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key] ? item[key] : DEFAULT_VALUE;
      ctr++;
    });
    result += lineDelimiter;
  });
  return result;
}

/*
Opens a mail modal with the given email and subject with attached csv file for
medicine information

email: email to send the message todo
subject: subject of the email
date: retrieve all information after this date

*/
export function exportMedicationsMailFunc(email, subject, date) {
  databaseGetUUID((id) => {
    SURVEY_DIR = FileSystem.documentDirectory + "medicinelog";
    let date_time = Moment().format('YYYY-MM-DDTHH:mm')
    FILE_NAME =  id + "_" + date_time + "_" + "MEDICINE.csv";

    SHARED_KEYS = [
      "date",
      "dosage",
      "medicine",
      "status",
      "time prescribed",
      "time taken"
    ]; //all symptoms have these keys
    //use database function to get an array of objects representing the data
    exportAllMedications(medicines => {
      let filtered_medicines = filterByDate(
        medicines,
        "date",
        date,
        "MM/DD/YYYY"
      );
      if (filtered_medicines.length == 0) {
        throwAlert(
          "Unable to export!",
          "You have no medication record to export from this period."
        );
        return;
      }

      FileSystem.getInfoAsync(SURVEY_DIR, {})
        .then(e => {
          if (!e.exists || !e.isDirectory) {
            return FileSystem.makeDirectoryAsync(SURVEY_DIR);
          }
        })
        .then(() => {
          content = "";
          content = convertArrayOfObjectsToCSV({
            data: filtered_medicines,
            keys: SHARED_KEYS //headers for csv file
          });
          return FileSystem.writeAsStringAsync(
            SURVEY_DIR + "/" + FILE_NAME,
            content
          );
        })
        .then(e => {
          MailComposer.composeAsync({
            recipients: [email],
            subject: subject,
            body: "",
            attachments: [SURVEY_DIR + "/" + FILE_NAME]
          });
        })
        .catch(e => console.log(e));
    });
  })
}

function filterByDate(list, dateKey, date, format) {
  return list.filter((d, i) => {
    return (
      !Moment(d[dateKey], format).isBefore(date, "day") ||
      Moment(d[dateKey], format).isSame(date, "day")
    );
  });
}

function throwAlert(label1, label2) {
  setTimeout(
    () => Alert.alert(label1, label2),
    550 //must delay it because it crashes if rendered over the modal
  );
}

/*
  Opens a mail modal with the given email and subject, and with the attachment of
  a csv file with all the symptoms.

email: email to send the message todo
subject: subject of the email
date: retrieve all information after this date
*/
export function exportSymptomsMailFunc(email, subject, date) {
  databaseGetUUID((id) => {
    SURVEY_DIR = FileSystem.documentDirectory + "doctordata";
    let date_time = Moment().format('YYYY-MM-DDTHH:mm')
    FILE_NAME =  id + "_" + date_time + "_" + "SYMPTOMHYSTORY.csv";
    SHARED_KEYS = ["symptom", "timestamp"]; //all symptoms have these keys
    //use database function to get an array of objects representing the data
    exportAllSymptoms(symptoms => {
      let filtered_symptoms = filterByDate(symptoms, "timestamp", date);
      if (filtered_symptoms.length == 0) {
        throwAlert(
          "Unable to export!",
          "You have no symptom record to export from this period."
        );

        return;
      }

      FileSystem.getInfoAsync(SURVEY_DIR, {})
        .then(e => {
          if (!e.exists || !e.isDirectory) {
            return FileSystem.makeDirectoryAsync(SURVEY_DIR);
          }
        })
        .then(() => {
          content = "";
          content = convertArrayOfObjectsToCSV({
            data: filtered_symptoms,
            keys: SHARED_KEYS.concat(SYMPTOM_FIELDS) //headers for csv file
          });
          return FileSystem.writeAsStringAsync(
            SURVEY_DIR + "/" + FILE_NAME,
            content
          );
        })
        .then(e => {
          MailComposer.composeAsync({
            recipients: [email],
            subject: subject,
            body: "",
            attachments: [SURVEY_DIR + "/" + FILE_NAME]
          }).catch(e => {
            throwAlert(
              "Sorry, the iOS mail app is not detected on your phone.",
              "To send attachments you must redownload that application."
            );
          });
        })
        .catch(e => {
          throwAlert("Cannot export!", "No symptoms to export.");
        });
    });
  })
}


/*
  Opens a mail modal with the given email and subject, and with the attachment of
  a csv file with all the survey responses.

email: email to send the message todo
subject: subject of the email
*/
export function exportSurveyMailFunc(email, subject, date) {
  databaseGetUUID((id) => {
    SURVEY_DIR = FileSystem.documentDirectory + "test_survey";
    let date_time = Moment().format('YYYY-MM-DDTHH:mm')
    DATA_FILE_NAME = 'survey.csv';
    NEW_FILE_NAME =  id + "_" + date_time + "_" + "survey.csv";

    FileSystem.getInfoAsync(SURVEY_DIR, {})
      .then(e => {
        if (!e.exists || !e.isDirectory) {
          return FileSystem.makeDirectoryAsync(SURVEY_DIR);
        }
      })
      .then(() => {
        return FileSystem.readAsStringAsync(SURVEY_DIR + "/" + DATA_FILE_NAME)
      }).then(content => {
        return FileSystem.writeAsStringAsync(
          SURVEY_DIR + "/" + NEW_FILE_NAME,
          content
        );
      })
      .then(e => {
        MailComposer.composeAsync({
          recipients: [email],
          subject: subject,
          body: "",
          attachments: [SURVEY_DIR + "/" + NEW_FILE_NAME]
        }).catch(e => {
          throwAlert(
            "Sorry, the iOS mail app is not detected on your phone.",
            "To send attachments you must redownload that application."
          );
        });
      })
      .catch(e => {
        throwAlert("Cannot export!", "No symptoms to export.");
      });
  })
}
