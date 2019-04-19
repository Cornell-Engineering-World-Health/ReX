import { SQLite } from "expo";

let db_id = Math.random()
  .toString(36)
  .substring(7);
//daste300
module.exports = SQLite.openDatabase("Database_V1.9.db");
