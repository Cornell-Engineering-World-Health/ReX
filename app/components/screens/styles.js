import { StyleSheet, Dimensions } from 'react-native';
import constants from '../Resources/constants';

const width = Dimensions.get('window').width;
const circleWidth = width*.8;
const height = Dimensions.get('window').height;

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
  imageStyle: {
    width: 100,
    height: 100
  },

});
