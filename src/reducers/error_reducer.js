import { ActionTypes } from '../actions';

const ErrorReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ERROR:
      return action.payload;
    default:
      return null;
  }
};

export default ErrorReducer;
