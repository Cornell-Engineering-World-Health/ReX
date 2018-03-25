import { StyleSheet, Dimensions } from 'react-native';
import {COLOR} from '../Resources/constants';

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
    margin: 0,
  },
  buttonContent:{
    alignItems: 'center',
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
    borderBottomColor: COLOR.PrimaryGray,
    borderRightColor: COLOR.PrimaryGray,
    borderTopColor: COLOR.red,
    borderLeftColor: COLOR.red
  },
  topRightQuadrant:{
    borderTopRightRadius: circleWidth,
    borderWidth: borderW,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: COLOR.cyan,
    borderRightColor: COLOR.cyan,
    borderBottomColor: COLOR.PrimaryGray,
    borderLeftColor: COLOR.PrimaryGray,
  },
  bottomLeftQuadrant:{
    borderBottomLeftRadius: circleWidth,
    borderWidth: borderW,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderTopColor: COLOR.PrimaryGray,
    borderRightColor: COLOR.PrimaryGray,
    borderBottomColor: COLOR.purple,
    borderLeftColor: COLOR.purple
  },
  bottomRightQuadrant:{
    borderBottomRightRadius: circleWidth,
    borderWidth: borderW,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderTopColor: COLOR.PrimaryGray,
    borderLeftColor: COLOR.PrimaryGray,
    borderBottomColor: COLOR.blue,
    borderRightColor: COLOR.blue
  },
  amountText: {
    color: COLOR.PrimaryGray,
    fontSize: 22,
    top: -18,
  },
});
