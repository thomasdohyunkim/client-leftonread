import axios from 'axios';
import { ActionTypes } from './index';

// see what url we are on, if localhost, use localhost root url
const currentURL = window.location.hostname;
let ROOT_URL = 'https://left-on-read.herokuapp.com/api';

if (currentURL.indexOf('localhost') >= 0) {
  ROOT_URL = 'http://localhost:9090/api';
  // ROOT_URL = 'https://left-on-read.herokuapp.com/api';
}

export function updateFeedback(key, value) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_FEEDBACK,
      payload: { key, value },
    });
  };
}

export function submitFeedback() {
  return (dispatch, getState) => {
    const { feedback } = getState();
    console.log(feedback);
  };
  // return (dispatch) => {
  //   axios.post(`${ROOT_URL}/feedback`, { feedback })
  //     .then((response) => {
  //       console.log('successfully submitted feedback');
  //     });
  // };
}
