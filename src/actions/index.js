import axios from 'axios';
import config from '../config/config';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_EMAIL
} from './types';

export function signinUser({ email, password }){
  return function(dispatch){
    axios.post(`${config.API_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', response.data.token);

        browserHistory.push('/settings');
      })
      .catch(() => {
        dispatch(authError('Bad login info'));
      });
  }
}

export function signupUser({ email, password }){
  return function(dispatch){
    axios.post(`${config.API_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });

        localStorage.setItem('token', response.data.token);

        browserHistory.push('/settings');
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  };
}

export function fetchMessage(){
  return function(dispatch){
    axios.get(config.API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    }).then(response => {
      dispatch({
        type: FETCH_EMAIL,
        payload: response.data.user
      })
    });
  }
}
