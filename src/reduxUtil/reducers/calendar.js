import { PREV_MONTH, NEXT_MONTH } from '../actions/calendar';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  generic: {
     width: 4,
     height: 4,
     borderRadius: 2,
     marginLeft: 2,
     backgroundColor: "#ffffff",
  },
});
const {generic} = styles;

const getCircles = (date) => {
  var numberOfDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  let circles = new Array(numberOfDays);

  for (var i = 0; i < numberOfDays; i++){
      circles[i] = [generic, generic, generic];
  }

  return circles;
}


var today = new Date();
let circles = getCircles(today);

const initialState = {
  currMonth: new Date(),
  circles: circles,
};


const reducer = (state = initialState, action) => {
  switch(action.type){
    case PREV_MONTH:
      return {
        ...state,
        currMonth: new Date(state.currMonth.getFullYear(), state.currMonth.getMonth(), 0),
        circles: getCircles(new Date(state.currMonth.getFullYear(), state.currMonth.getMonth(), 0)),
      };
    case NEXT_MONTH:
      return {
        ...state,
        currMonth: new Date(state.currMonth.getFullYear(), state.currMonth.getMonth()+2, 0),
        circles: getCircles(new Date(state.currMonth.getFullYear(), state.currMonth.getMonth()+2, 0)),
      };
    default:
      return state;
  }
};



export default reducer;
