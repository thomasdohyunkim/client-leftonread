import { ActionTypes } from '../actions';

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, { authenticated: true, email: action.payload.email, firstName: action.payload.firstName });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, { authenticated: false, email: null });
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state, { authenticated: false, email: null });
    default:
      return state;
  }
};

export default AuthReducer;
