import { StyleSheet, Dimensions } from 'react-native';

const dateHeight = Dimensions.get('window').height / 2.5 / 6;

export default StyleSheet.create({
  head: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
  },
  header: {
      display: "flex",
      flexDirection: "row",
      marginTop: 15,
      marginLeft: 10,
  },
  header2: {
      display: "flex",
      flexDirection: "row",
      marginTop: 10,
  },
  date: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 20,
  },
  altDate: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 20,
      color: '#ffffff',
  },
  dateGray: {
      fontWeight: '500',
      fontSize: 20,
      color: '#b8b8b8',
  },
  week: {
      fontWeight: "bold",
      fontSize: 15,
      color: '#b8b8b8',
      justifyContent: 'center',
      alignItems: 'center',
  },
  weekAlt: {
      fontWeight: "bold",
      fontSize: 15,
      color: '#b8b8b8',
      justifyContent: 'center',
      alignItems: 'center',
  },
  weekAlt2: {
      fontWeight: "bold",
      fontSize: 15,
      color: '#b8b8b8',
      marginLeft: 26,
  },
  weekItem:{
    margin: 2,
    width: Dimensions.get('window').width / 7 -7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  month: {
      fontWeight: "bold",
      fontSize: 25,
      color: '#373737',
  },
  year: {
      fontSize: 25,
      color: '#b0b0b0',
      fontWeight: '300',
  },
  tiles: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: Dimensions.get('window').length * 0.05
   },
  item: {
     margin: 2,
     width: Dimensions.get('window').width / 7 -7,
     justifyContent: 'center',
     alignItems: 'center',
     height: dateHeight,
   },
   altItem: {
      margin: 2,
      width: Dimensions.get('window').width / 7 -7,
      justifyContent: 'center',
      alignItems: 'center',
      height: dateHeight,
      backgroundColor: '#A0A0A0',
   },
   generic: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginLeft: 2,
      backgroundColor: "#ffffff",
   },
   genericGray: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginLeft: 2,
      backgroundColor: "#A0A0A0",
   },
   dot: {
       width: 4,
       height: 4,
       borderRadius: 2,
       marginLeft: 2,
   },
   buttons: {
       display: "flex",
       flexDirection: "column",
       marginTop: 250,
   },
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
    alignItems: 'center'
  },
  baseBarSelected: {
    width: (Dimensions.get('window').width / 7 -9) * 0.65,
    backgroundColor: '#A0A0A0',
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
    marginTop: 3,
    marginBottom: 4
  },
});
