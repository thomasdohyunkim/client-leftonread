import axios from 'axios';
import { toast } from 'react-toastify';
import { ActionTypes, errorDispatch } from './index';

// see what url we are on, if localhost, use localhost root url
const currentURL = window.location.hostname;
let ROOT_URL = 'https://left-on-read.herokuapp.com/api';

if (currentURL.indexOf('localhost') >= 0) {
  ROOT_URL = 'http://localhost:9090/api';
}


export function uploadFile(formData) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        let progressData = null;
        const totalLength = progressEvent.lengthComputable ?
          progressEvent.total :
          progressEvent.target.getResponseHeader('content-length') || ProgressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (totalLength !== null) {
          progressData = (progressEvent.loaded * 100) / totalLength;
        } else {
          progressData = 0;
        }
        dispatch({ type: ActionTypes.LOAD_PCT, payload: { pct: progressData } });
      },
    }).then((response) => {
      dispatch({ type: ActionTypes.LOAD_KEY, payload: { key: response.data.key, vcf: response.data.vcf } });
    }).catch((error) => {
      console.log(error.message);
      toast.error(error.message);
      // DO NOT DELETE THIS. IT IS HERE ON PURPOSE:
      dispatch(errorDispatch(error.message));
    });
  };
}

export function linkInstance(key, vcf) {
  return (dispatch) => {
    const data = {
      key,
      vcf,
    };
    dispatch({ type: ActionTypes.LINK_KEY, payload: { status: 1 } });
    axios.post(`${ROOT_URL}/link`, data, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.LINK_KEY, payload: { status: 2 } });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function resetInstance() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.RESET_INSTANCE });
  };
}
