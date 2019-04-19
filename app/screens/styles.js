import { StyleSheet, Dimensions } from "react-native";
import { COLOR } from "../resources/constants";

const width = Dimensions.get("window").width;
const circleWidth = width * 0.7;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  topInfo: {
    flex: 0.5,
    justifyContent: "space-around"
  },
  separator: {
    backgroundColor: "black",
    height: StyleSheet.hairlineWidth,
    marginLeft: 40,
    marginRight: 40
  },
  pageContainer: {
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    left: 5,
    right: 5
  },
  welcomeText: {
    color: "white",
    fontSize: 50,
    fontWeight: "200"
  },
  nameText: {
    color: "white",
    fontSize: 50,
    fontWeight: "300"
  },
  middleMessage: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
    opacity: 0.99,
    position: "absolute",
    left: 25,
    right: 25,
    borderRadius: 5
  },
  middleMessageText: {
    fontSize: 20,
    color: COLOR.gradient[0],
    textAlign: "center",
    fontWeight: "100"
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "blue"
  },
  subHeaderText: {
    color: COLOR.PrimaryGray,
    fontSize: 18
  },
  imageStyle: {
    width: 100,
    height: 100
  },
  bottomHalf: {
    alignItems: "center",
    flex: 0.6
  },
  lightShadow: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#102f60",
    shadowOpacity: 0.2
  },
  darkShadow: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#371f6a",
    shadowOpacity: 0.3
  },
  gradientShadow: {
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  addButton: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 3,
    height: 65,
    width: 65,
    backgroundColor: "white",
    borderTopWidth: 3,
    borderColor: "#5052ff80"
  },

  faceLeft: {
    borderLeftWidth: 3,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
  },
  faceRight: {
    borderRightWidth: 3,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15
  },
  addImageStyle: {
    width: 40,
    height: 40,
    resizeMode: "contain"
  },
  addButtonsContainer: {
    justifyContent: "space-between",
    alignItems: "stretch",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingBottom: 10
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "300"
  },
  badge: {
    position: "absolute",
    height: 30,
    width: 30,
    left: -10,
    top: -10,
    backgroundColor: "#5052ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100
  },
  badgeText: {
    color: "white",
    fontSize: 25,
    textAlign: "center"
  }
});
