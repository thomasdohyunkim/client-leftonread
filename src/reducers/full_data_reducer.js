import { ActionTypes } from '../actions';

const FullDataReducer = (state = { numbers: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ALL_NUMBERS: {
      return {
        numbers: action.payload,
      };
    }
    default:
      return state;
  }
};

export default FullDataReducer;
