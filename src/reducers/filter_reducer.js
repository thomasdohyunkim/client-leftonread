import { ActionTypes } from '../actions';

const FilterReducer = (state = {
  display: '',
  startDate: '',
  endDate: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_FILTER:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default FilterReducer;
