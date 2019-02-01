import { FileSystem } from "expo";

export function writeToFS(directory, file_name) {
  FileSystem.getInfoAsync(SURVEY_DIR, {})
    .then(e => {
      if (!e.exists || !e.isDirectory) {
        return FileSystem.makeDirectoryAsync(SURVEY_DIR);
      }
    })
    .then(e => {
      return FileSystem.getInfoAsync(SURVEY_DIR + "/" + file_name, {}).then(
        e => {
          if (e.exists && !e.isDirectory) {
            return FileSystem.readAsStringAsync(SURVEY_DIR + "/" + file_name);
          } else {
            return "";
          }
        }
      );
    })
    .then(content => {
      content += this.state_to_csv();
      return FileSystem.writeAsStringAsync(
        SURVEY_DIR + "/" + file_name,
        content
      );
    })
    .then(() => {
      return FileSystem.readAsStringAsync(SURVEY_DIR + "/" + file_name);
    })
    .then(content => {})
    .catch(e => console.log(e));
}
