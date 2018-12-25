import { MailComposer, FileSystem } from "expo";

function convertArrayOfObjectsToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ",";
  lineDelimiter = args.lineDelimiter || "\n";

  keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });
  //console.log('result of func conversion: ' + result);
  return result;
}

function getData() {
  let data = [
    {
      Symbol: "AAPL",
      Company: "Apple Inc.",
      Price: 132.54
    },
    {
      Symbol: "INTC",
      Company: "Intel Corporation",
      Price: 33.45
    },
    {
      Symbol: "GOOG",
      Company: "Google Inc",
      Price: 554.52
    }
  ];

  return data;
}

export function _mailFunc(email, subject) {
  var stockData = getData();
  SURVEY_DIR = FileSystem.documentDirectory + "doctordata";
  FILE_NAME = "data.csv";
  FileSystem.getInfoAsync(SURVEY_DIR, {})
    .then(e => {
      if (!e.exists || !e.isDirectory) {
        console.log("making dir");
        return FileSystem.makeDirectoryAsync(SURVEY_DIR);
      }
    })
    .then(() => {
      content = "";
      content = convertArrayOfObjectsToCSV({
        data: stockData
      });
      console.log("writing: " + content);
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
}
m;
