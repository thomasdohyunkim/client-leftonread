import { ActionTypes } from '../actions';

const InstanceReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_KEY:
      return Object.assign({}, state, { key: action.payload.key, vcf: action.payload.vcf });
    case ActionTypes.LOAD_PCT:
      return Object.assign({}, state, { pct: action.payload.pct });
    case ActionTypes.LINK_KEY:
      return Object.assign({}, state, { status: action.payload.status, pct: 0 });
    // SHOULD BE DEPRECATED:
    case ActionTypes.LOAD_INSTANCE:
      return Object.assign({}, state, action.payload.instance);
    case ActionTypes.RESET_INSTANCE:
      return Object.assign({}, state, { status: 0, pct: 0 });
    default:
      return state;
  }
};

export default InstanceReducer;
