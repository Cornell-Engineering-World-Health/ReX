import StyleSheet from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 25
  },
  imageContainer: {
    flex: 1
  },
  descriptionContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  titleTime: {
    justifyContent: 'space-between'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Cochin',
    color: '#000000'
  },
  timeStamp: {
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Cochin',
    color: '#D4D1D0'
  },
  note: {
    color: '#DEDDDD',
    fontSize: 15,
    fontFamily: 'Cochin'
  }
});
