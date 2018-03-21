import { StyleSheet, Dimensions } from 'react-native';
import constants from '../Resources/constants';

const width = Dimensions.get('window').width;
const circleWidth = width*.8;
const height = Dimensions.get('window').height;
const borderW = 4;

export default StyleSheet.create({
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
    margin: 0,
  },
  imageStyle: {
    width: 100,
    height: 100
  },
  topLeftQuadrant:{
    borderTopLeftRadius: circleWidth,
    borderWidth: borderW,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: constants.PrimaryGray,
    borderRightColor: constants.PrimaryGray,
    borderTopColor: constants.red,
    borderLeftColor: constants.red
  },
  topRightQuadrant:{
    borderTopRightRadius: circleWidth,
    borderWidth: borderW,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: constants.cyan,
    borderRightColor: constants.cyan,
    borderBottomColor: constants.PrimaryGray,
    borderLeftColor: constants.PrimaryGray,
  },
  bottomLeftQuadrant:{
    borderBottomLeftRadius: circleWidth,
    borderWidth: borderW,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderTopColor: constants.PrimaryGray,
    borderRightColor: constants.PrimaryGray,
    borderBottomColor: constants.purple,
    borderLeftColor: constants.purple
  },
  bottomRightQuadrant:{
    borderBottomRightRadius: circleWidth,
    borderWidth: borderW,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderTopColor: constants.PrimaryGray,
    borderLeftColor: constants.PrimaryGray,
    borderBottomColor: constants.blue,
    borderRightColor: constants.blue
  }
});
