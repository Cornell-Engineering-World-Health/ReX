import { FileSystem } from 'expo';
import Moment from 'moment';
import constants, { getCardData } from '../resources/constants';

export function writeToFS(directory, file_name) {
  FileSystem.getInfoAsync(SURVEY_DIR, {}).then( e => {
      if(!e.exists || !e.isDirectory){
        console.log("making dir")
        return FileSystem.makeDirectoryAsync(SURVEY_DIR);
      }
    }
  ).then( e => {
    return FileSystem.getInfoAsync(SURVEY_DIR+"/"+file_name, {}).then( e => {
        if(e.exists && !e.isDirectory){
          console.log("append")
            return FileSystem.readAsStringAsync(SURVEY_DIR + "/" + file_name)
        } else {
          console.log("new!")
          return ""
        }
    })
  }).then((content) => {
    content += this.state_to_csv()
    console.log("writing")
    return FileSystem.writeAsStringAsync(SURVEY_DIR + "/" +file_name, content)
  }).then(() => {
    console.log("reading")
    return FileSystem.readAsStringAsync(SURVEY_DIR + "/" + file_name)
  }).then((content) => {
    console.log(content)
  }).catch(e => console.log(e))
  }

