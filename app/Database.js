import { SQLite } from "expo";

let db_id = Math.random()
  .toString(36)
  .substring(7);

module.exports = SQLite.openDatabase("db" + 'pvme767w242in' + ".db");
