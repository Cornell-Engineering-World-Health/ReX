import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "../resources/constants";

const width = Dimensions.get("window").width;
const circleWidth = width * 0.8;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  topInfo: {
    height: height - circleWidth - 75,
    marginLeft: 2,
    marginRight: 2,
    flexDirection: "column"
  },
  separator: {
    //backgroundColor: '#f2f2f2',
    backgroundColor: "black",
    height: StyleSheet.hairlineWidth,
    marginLeft: 40,
    marginRight: 40
  },
  pageContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  header: {
    marginLeft: 15
  },
  welcomeText: {
    color: COLOR.PrimaryGray,
    fontSize: 30
  },
  nameText: {
    color: "black",
    fontSize: 28,
    fontWeight: "800"
  },
  middleMessage: {
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  middleMessageText: {
    fontSize: 20,
    color: COLOR.PrimaryGray,
    textAlign: "center"
  },
  subHeader: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  subHeaderText: {
    color: COLOR.PrimaryGray,
    fontSize: 18
  },
  imageStyle: {
    width: 100,
    height: 100
  },
  modal: {
    justifyContent: "center",
    alignItems: "stretch",
    flex: 1
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "white",
    flex: 0.5,
    borderRadius: 10
  },
  modalHeader: {
    flex: 0.2
  },
  modalBody: {
    flex: 0.8
  },
  modalFooter: {
    flex: 0.2
  }
});
