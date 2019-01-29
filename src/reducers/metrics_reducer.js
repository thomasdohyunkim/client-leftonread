import { ActionTypes } from '../actions';

const MetricsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.EXPECTED_METRICS: {
      // When this gets dispatched, clear all previous graph data
      return { expectedMetrics: action.payload.metrics };
    }
    case ActionTypes.GRAPH_DATA: {
      return Object.assign({}, state, { [action.payload.metric]: action.payload.data });
    }
    case ActionTypes.WORD_FILTER: {
      return Object.assign({}, state, { TOP_FIVE_WORDS: action.payload });
    }
    case ActionTypes.SHARE_URL: {
      return Object.assign({}, state, { SHARE_URL: action.payload });
    }
    default:
      return state;
  }
};

export default MetricsReducer;
