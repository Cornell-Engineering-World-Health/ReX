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
    height: 3.48,
  },
  dayBox: {
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width / 7 -9,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  circles: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
  },
});
