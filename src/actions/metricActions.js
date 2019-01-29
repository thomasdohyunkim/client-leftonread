import axios from 'axios';
import { toast } from 'react-toastify';
import { ActionTypes } from './index';

// see what url we are on, if localhost, use localhost root url
const currentURL = window.location.hostname;
let ROOT_URL = 'https://left-on-read.herokuapp.com/api';

if (currentURL.indexOf('localhost') >= 0) {
  ROOT_URL = 'http://localhost:9090/api';
  // ROOT_URL = 'https://left-on-read.herokuapp.com/api';
}

/* METRICS */

export const MetricTypes = {
  TOTAL_TEXTS: 'TOTAL_TEXTS',
  TEXTS_PER_DAY: 'TEXTS_PER_DAY',
  TOP_FIVE_FRIENDS: 'TOP_FIVE_FRIENDS',
  TOP_FIVE_WORDS: 'TOP_FIVE_WORDS',
  TOP_FIVE_EMOJIS: 'TOP_FIVE_EMOJIS',
  SENTIMENTS: 'SENTIMENTS',
  RECONNECT: 'RECONNECT',
  WORDS: 'WORDS',
  SENTIMENT_TIME: 'SENTIMENT_TIME',
  AVG_LENGTH: 'AVG_LENGTH',
  TIME_OF_DAY: 'TIME_OF_DAY',
};

// Example of a list of metrics to display; can create custom ones for filtering
export const DEFAULT_METRICS = [
  MetricTypes.TEXTS_PER_DAY,
  MetricTypes.TOTAL_TEXTS,
  MetricTypes.TOP_FIVE_FRIENDS,
  MetricTypes.TOP_FIVE_WORDS,
  MetricTypes.TOP_FIVE_EMOJIS,
  MetricTypes.AVG_LENGTH,
  MetricTypes.SENTIMENT_TIME,
  MetricTypes.SENTIMENTS,
  MetricTypes.RECONNECT,
  MetricTypes.TIME_OF_DAY,
];

export const FILTERED_METRICS = [
  MetricTypes.TEXTS_PER_DAY,
  MetricTypes.TOTAL_TEXTS,
  MetricTypes.TOP_FIVE_WORDS,
  MetricTypes.TOP_FIVE_EMOJIS,
  MetricTypes.AVG_LENGTH,
  MetricTypes.SENTIMENTS,
  MetricTypes.SENTIMENT_TIME,
  MetricTypes.TIME_OF_DAY,
];

export function getMetric(key, metric, filters) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/metric`, { key, metric, filters }, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
        toast.error(response.data.error);
        return;
      }
      dispatch({
        type: ActionTypes.GRAPH_DATA,
        payload: { data: response.data, metric, filters },
      });
    })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(`${error.response.data.error} found for ${metric}`);
        dispatch({
          type: ActionTypes.GRAPH_DATA,
          payload: {
            metric: `${metric}`,
            data: 'error',
          },
        });
      });
  };
}

// Sets what metrics are expected
export function setExpectedMetrics(metrics) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.EXPECTED_METRICS, payload: { metrics } });
  };
}

// Gets all metrics
export function getMetrics(key, metrics) {
  return (dispatch) => {
    for (let i = 0; i < metrics.length; i += 1) {
      const metric = metrics[i];
      getMetric(key, metric)(dispatch);
    }
  };
}
