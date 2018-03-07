import { StyleSheet, Dimensions } from 'react-native';
 

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
      marginLeft: 14,
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
      paddingLeft: Dimensions.get('window').width / 17.2,
  },
  weekAlt: {
      fontWeight: "bold",
      fontSize: 15,
      color: '#b8b8b8',
  },
  weekAlt2: {
      fontWeight: "bold",
      fontSize: 15,
      color: '#b8b8b8',
      marginLeft: 26,
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
     height: 43,
   },
   altItem: {
      margin: 2,
      width: Dimensions.get('window').width / 7 -7,
      justifyContent: 'center',
      alignItems: 'center',
      height: 43,
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
   headache: {
       width: 4,
       height: 4,
       borderRadius: 2,
       marginLeft: 2,
       backgroundColor: "#6dd3bf",
   },
   blurred: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginLeft: 2,
      backgroundColor: "#ab87b8",
   },
   pill: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginLeft: 2,
      backgroundColor: "#c3496b",
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
