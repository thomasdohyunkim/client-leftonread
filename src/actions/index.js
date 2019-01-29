import axios from 'axios';
import { toast } from 'react-toastify';

import { DEFAULT_METRICS, FILTERED_METRICS, getMetric } from './metricActions';

// see what url we are on, if localhost, use localhost root url
const currentURL = window.location.hostname;
let ROOT_URL = 'https://left-on-read.herokuapp.com/api';

if (currentURL.indexOf('localhost') >= 0) {
  ROOT_URL = 'http://localhost:9090/api';
  // ROOT_URL = 'https://left-on-read.herokuapp.com/api';
}

// keys for actiontypes
export const ActionTypes = {
  LOAD_KEY: 'LOAD_KEY',
  LOAD_PCT: 'LOAD_PCT',
  LINK_KEY: 'LINK_KEY',
  LOAD_INSTANCE: 'LOAD_INSTANCE',
  UPLOAD_ERR: 'UPLOAD_ERR',
  TOTAL_TEXTS: 'TOTAL_TEXTS',
  TEXTS_PER_DAY: 'TEXTS_PER_DAY',
  ERROR: 'ERROR',
  EXPECTED_METRICS: 'EXPECTED_METRICS',
  GRAPH_DATA: 'GRAPH_DATA',
  ALL_NUMBERS: 'ALL_NUMBERS',
  RESET_STATE: 'RESET_STATE',
  WORD_FILTER: 'WORD_FILTER',
  SENTIMENT: 'SENTIMENT',
  RECONNECT: 'RECONNECT',
  UPDATE_FILTER: 'UPDATE_FILTER',
  SHARE_URL: 'SHARE_URL',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  RESET_INSTANCE: 'RESET_INSTANCE',
  UPDATE_FEEDBACK: 'UPDATE_FEEDBACK',
};

/*
 * Dispatch an error if error is caught
 */
export function errorDispatch(error) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.ERROR,
      payload: error,
    });
  };
}

export function returnKey(history, key, password) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/instance`, { key, password })
      .then((response) => {
        dispatch({ type: ActionTypes.LOAD_KEY, payload: { key: response.data.key } });
        if (response.data.status === 'complete') {
          history.push('/overview');
        } else {
          history.push('/loader');
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error('Unable to find and/or validate instance');
      });
  };
}

export function getInstance(history, key) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/instance?key=${key}`)
      .then((response) => {
        dispatch({ type: ActionTypes.LOAD_INSTANCE, payload: { instance: response.data.instance } });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };
}

export function getAllNumbers(key) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/allnumbers`, { key }).then((response) => {
      dispatch({
        type: ActionTypes.ALL_NUMBERS,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error.response.data.error);
      // toast.error('Unable to get filterable contacts');

      toast.error(error.response.data.error);
    });
  };
}

export function updateFilter(key, display, startDate, endDate) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_FILTER,
      payload: {
        display,
        startDate,
        endDate,
      },
    });
  };
}

export function applyFilter(key, display, startDate, endDate) {
  const filters = {
    display,
    startDate,
    endDate,
  };
  return (dispatch) => {
    updateFilter(key, display, startDate, endDate)(dispatch);
    let metrics = DEFAULT_METRICS;
    if (display !== '' || startDate !== '' || endDate !== '') {
      metrics = FILTERED_METRICS;
    }
    for (let i = 0; i < metrics.length; i += 1) {
      const metric = metrics[i];
      getMetric(key, metric, filters)(dispatch);
    }
  };
}

export function wordFilter(word, key, filters) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/wordfilter`, { word, key, filters }, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.WORD_FILTER,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    });
  };
}

export function createSharePage(graphType, graphData, instanceKey) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/shareUrl`, { graphType, graphData, instanceKey })
      .then((response) => {
        dispatch({
          type: ActionTypes.SHARE_URL,
          payload: response.data.key,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };
}

export function getSharePage(graphUrl) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/shareUrl?graphUrl=${graphUrl}`)
      .then((response) => {
        const { graphType, graphData, instanceKey } = response.data.graph;
        dispatch({
          type: ActionTypes.EXPECTED_METRICS,
          payload: {
            metrics: graphType,
          },
        });
        dispatch({
          type: ActionTypes.GRAPH_DATA,
          payload: {
            metric: graphType,
            data: graphData,
          },
        });
        dispatch({
          type: ActionTypes.LOAD_KEY,
          payload: {
            key: instanceKey,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };
}
