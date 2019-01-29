import { ActionTypes } from '../actions';

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_FEEDBACK:
      return Object.assign({}, state, { [action.payload.key]: action.payload.value });
    default:
      return state;
  }
};

export default AuthReducer;
