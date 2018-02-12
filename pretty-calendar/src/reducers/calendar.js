import { PREV_MONTH, NEXT_MONTH } from '../actions/calendar';

const initialState = {
  currMonth: new Date(),
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case PREV_MONTH:
      return {
        ...state,
        currMonth: new Date(state.currMonth.getFullYear(), state.currMonth.getMonth(), 0),
      };
    case NEXT_MONTH:
      return {
        ...state,
        currMonth: new Date(state.currMonth.getFullYear(), state.currMonth.getMonth()+2, 0),
      };
    default:
      return state;
  }
};

export default reducer;
