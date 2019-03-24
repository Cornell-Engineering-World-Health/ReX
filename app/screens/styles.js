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
    flex: 0.7,
    borderRadius: 10
  },
  modalHeader: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:COLOR.blue + "20",
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "300"
  },
  modalBody: {
    flex: 0.8,
  },
  modalFooter: {

    flex: 0.2,
    flexDirection: "row",
    alignItems: "stretch"
  },
  submit: {
    backgroundColor: COLOR.blue,
    justifyContent: "center",
    alignItems: 'center',
    borderColor: COLOR.blue,
    borderRadius: 10,
    borderWidth: 1,
    flex:1,
    margin:10
  },
  modalButton: {
    justifyContent: "center",
    alignItems: 'center',
    borderColor: COLOR.blue,
    borderBottomRightRadius:10,
    flex:1,
  },
  ButtonText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "200"
  },
  cardWrapper: {
    justifyContent: "center",
    alignItems: "stretch"
  },
  cardContainer: {
    padding: 10,
    flex: 1,
    borderRadius: 3,
    flexDirection: "row"
  },
  cardHeader: {
    flex: 0.8,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },
  cardBody: {
    flex: 0.4,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    justifyContent: "space-around",
    alignItems: "center"
  },
  cardHeaderText: {
    fontSize: 25,
    fontWeight: "100",
    flexWrap: "wrap",
    textAlign: "center"
  },
  cardBodyText: {
    fontSize: 15,
    fontWeight: "100",
    textAlign: "right"
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
  },
  cardIsConfirm: {
    backgroundColor: "#d2ffce"
  },
  cardIsUndo: {
    backgroundColor: "#ffafaf"
  }
});
