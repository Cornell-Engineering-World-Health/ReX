import { StyleSheet, Dimensions } from "react-native";

const dateHeight = Dimensions.get("window").height / 2.5 / 6;

export default StyleSheet.create({
  head: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    justifyContent: "center",
    flexDirection: "row"
  },
  header2: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10
  },
  date: {
    textAlign: "center",
    fontWeight: "200",
    fontSize: 19
  },
  altDate: {
    textAlign: "center",
    fontWeight: "200",
    fontSize: 19,
    color: "#ffffff"
  },
  dateGray: {
    fontWeight: "200",
    fontSize: 20,
    color: "#b8b8b8"
  },
  week: {
    fontWeight: "200",
    fontSize: 15,
    color: "#b6c1cd",
    justifyContent: "center",
    alignItems: "center"
  },
  weekAlt: {
    fontWeight: "200",
    fontSize: 15,
    color: "#b6c1cd",
    justifyContent: "center",
    alignItems: "center"
  },
  weekAlt2: {
    fontWeight: "300",
    fontSize: 15,
    color: "#b6c1cd",
    marginLeft: 26
  },
  weekItem: {
    margin: 2,
    width: Dimensions.get("window").width / 7 - 7,
    justifyContent: "center",
    alignItems: "center"
  },
  month: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#373737",
    textAlign: "center"
  },
  year: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  tiles: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10
  },
  item: {
    margin: 2,
    width: Dimensions.get("window").width / 7 - 7,
    justifyContent: "center",
    alignItems: "center",
    height: dateHeight
  },
  altItem: {
    margin: 2,
    width: Dimensions.get("window").width / 7 - 7,
    justifyContent: "center",
    alignItems: "center",
    height: dateHeight,
    backgroundColor: "#A0A0A0"
  },
  generic: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: 2,
    backgroundColor: "#ffffff"
  },
  genericGray: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: 2,
    backgroundColor: "#A0A0A0"
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: 2
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    marginTop: 250
  },
  textBox: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 19
  },
  bar: {
    width: (Dimensions.get("window").width / 7 - 9) * 0.65
  },
  baseBar: {
    width: (Dimensions.get("window").width / 7 - 9) * 0.65,
    backgroundColor: "#FFFFFF",
    alignItems: "center"
  },
  baseBarSelected: {
    width: (Dimensions.get("window").width / 7 - 9) * 0.65,
    backgroundColor: "#A0A0A0",
    alignItems: "center"
  },
  dayBox: {
    flex: 1,
    flexDirection: "column",
    width: Dimensions.get("window").width / 7 - 9,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden"
  },
  circles: {
    display: "flex",
    flexDirection: "row",
    marginTop: 3,
    marginBottom: 4
  },
  modalButton: {
    color: "#A0A0A0",
    fontSize: 20,
    marginLeft: 30,
    marginRight: 30
  },
  lightShadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#808080",
    shadowOpacity: 0.2
  },
  darkShadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#808080",
    shadowOpacity: 0.2
  }
});
