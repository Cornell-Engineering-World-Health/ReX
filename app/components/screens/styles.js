import { StyleSheet, Dimensions } from 'react-native';
import constants from '../Resources/constants';

const width = Dimensions.get('window').width;
const circleWidth = width*.8;
const height = Dimensions.get('window').height;
const borderW = 2;

export default StyleSheet.create({
  topInfo: {
    height: height - circleWidth - 75,
    marginLeft: 2,
    marginRight: 2,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  separator: {
    //backgroundColor: '#f2f2f2',
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth,
    marginLeft: 40,
    marginRight: 40
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  header: {
    marginTop: 20,
    padding: 20,
  },
  welcomeText: {
    color: constants.PrimaryGray,
    fontSize: 30,
  },
  nameText: {
    color: 'black',
    fontSize: 28,
    fontWeight: '800',
  },
  subHeader: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subHeaderText: {
    color: constants.PrimaryGray,
    fontSize: 18
  },
  medicineViewContainer: {
    height: circleWidth,
    width: circleWidth,
  },
  medicineViewRow: {
    flexDirection: 'row'
  },
  medicineButton: {
    width: circleWidth/2,
    height: circleWidth/2,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    //backgroundColor: MEDICINE_BUTTON_BACKGROUND_COLOR,
    margin: 0,
  },
  imageStyle: {
    width: 100,
    height: 100
  },
  topLeftQuadrant:{
    borderTopLeftRadius: circleWidth,
    borderWidth: borderW,
    borderBottomColor: constants.PrimaryGray,
    borderRightColor: constants.PrimaryGray,
    borderTopColor: constants.red,
    borderLeftColor: constants.red
  },
  topRightQuadrant:{
    borderTopRightRadius: circleWidth,
    borderWidth: borderW,
    borderTopColor: constants.cyan,
    borderRightColor: constants.cyan,
    borderBottomColor: constants.PrimaryGray,
    borderLeftColor: constants.PrimaryGray,
  },
  bottomLeftQuadrant:{
    borderBottomLeftRadius: circleWidth,
    borderWidth: borderW,
    borderTopColor: constants.PrimaryGray,
    borderRightColor: constants.PrimaryGray,
    borderBottomColor: constants.purple,
    borderLeftColor: constants.purple
  },
  bottomRightQuadrant:{
    borderBottomRightRadius: circleWidth,
    borderWidth: borderW,
    borderTopColor: constants.PrimaryGray,
    borderLeftColor: constants.PrimaryGray,
    borderBottomColor: constants.blue,
    borderRightColor: constants.blue
  }
});
