import axios from 'axios';
import { toast } from 'react-toastify';
import { ActionTypes } from './index';

// see what url we are on, if localhost, use localhost root url
const currentURL = window.location.hostname;
let ROOT_URL = 'https://left-on-read.herokuapp.com/api';

if (currentURL.indexOf('localhost') >= 0) {
  ROOT_URL = 'http://localhost:9090/api';
}

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signOutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    toast.success('Successfully signed out');
  };
}

export function signInUser({ email, password }, callback) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.user });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('lorEmail', response.data.user.email);
      localStorage.setItem('lorFirstName', response.data.user.firstName);
      toast.success(`Welcome back ${response.data.user.email}!`);
      if (callback) {
        callback(true);
      }
    }).catch((error) => {
      if (callback) {
        callback(false);
      }
      toast.error('Invalid username/password pair');
    });
  };
}

export function signUpUser(user, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, user).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data.user });
      localStorage.setItem('token', response.data.token);
      if (localStorage.getItem('signUpRedirect')) {
        toast.success('Successfully signed up, returning to upload tab in 5 seconds...');
        localStorage.setItem('signUpRedirect', false);
        setTimeout(window.close, 3000);
      }
      history.push('/');
    }).catch((error) => {
      console.log(error.response);
      toast.error(error.response.data.error);
      dispatch(authError(`Sign Up Failed: ${error.response}`));
    });
  };
}
