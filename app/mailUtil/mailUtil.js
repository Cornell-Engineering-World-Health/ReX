import { MailComposer, FileSystem } from "expo";
import { Linking, Alert } from "react-native";
import {
  exportAllSymptoms,
  exportAllMedications
} from "../databaseUtil/databaseUtil";
import { SYMPTOM_FIELDS } from "../resources/constants.js";
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
*/
export function exportMedicationsMailFunc(email, subject, name) {
  SURVEY_DIR = FileSystem.documentDirectory + "medicinelog";
  FILE_NAME = "medicinelog.csv";
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

    console.log('medicine', medicines)

    FileSystem.getInfoAsync(SURVEY_DIR, {})
      .then(e => {
        if (!e.exists || !e.isDirectory) {
          return FileSystem.makeDirectoryAsync(SURVEY_DIR);
        }
      })
      .then(() => {
        content = "";
        content = convertArrayOfObjectsToCSV({
          data: medicines,
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
}
/*
  Opens a mail modal with the given email and subject, and with the attachment of
  a csv file with all the symptoms.
*/
export function exportSymptomsMailFunc(email, subject, name) {
  SURVEY_DIR = FileSystem.documentDirectory + "doctordata";
  FILE_NAME = "symptomhistory.csv";
  SHARED_KEYS = ["symptom", "timestamp"]; //all symptoms have these keys
  //use database function to get an array of objects representing the data
  exportAllSymptoms(symptoms => {
    FileSystem.getInfoAsync(SURVEY_DIR, {})
      .then(e => {
        if (!e.exists || !e.isDirectory) {
          return FileSystem.makeDirectoryAsync(SURVEY_DIR);
        }
      })
      .then(() => {
        content = "";
        content = convertArrayOfObjectsToCSV({
          data: symptoms,
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
          setTimeout(
            () =>
              Alert.alert(
                "Sorry, the iOS mail app is not detected on your phone.",
                "To send attachments you must redownload that application."
              ),
            501
          );
        });
      })
      .catch(e => {});
  });
}
