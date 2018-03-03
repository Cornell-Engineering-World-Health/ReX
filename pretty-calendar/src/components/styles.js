import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  textBox: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: (Dimensions.get('window').width / 7 -9) * 0.65,
  },
  baseBar: {
    width: (Dimensions.get('window').width / 7 -9) * 0.65,
    backgroundColor: '#FFFFFF',
    height: 12,
    alignItems: 'center'
  },
  baseBarSelected: {
    width: (Dimensions.get('window').width / 7 -9) * 0.65,
    backgroundColor: '#A0A0A0',
    height: 12,
    alignItems: 'center'
  },
  dayBox: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width / 7 -9,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden'
  },
  circles: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4
  },
});
