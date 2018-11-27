// # define methods that take place on receiving those actions

import * as actionTypes from './actionTypes';
import axios from 'axios';


// when working with actions the objects that need to return always need to
// return a type. Therefore, type property needs to be include
export const authStart = () =>{
  return{
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = token =>{
  return{
    type: actionTypes.AUTH_SUCCESS,
    token: token
  }
}

export const authFail = error =>{
  return{
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

// this function requires 2 parameters from djangorestframework, currently we
// know 2 parameters but these would be initialized once django backend is setup
export const authLogin = (username, password) =>{
  // when we login we have to return a dispatch
  return dispatch=>{
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/login/', {
      username: username,
      password: password
    })
    .then(res=>{
      // response we will receive a key that is return form djangorestframework
      const token = res.data.key;

      // setting up an expirationDate to one hour
      const expirationDate = new Date(new Date().getTime +3600 * 1000);

      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);

      // if res is successful dispatch authSuccess method with toke as args
      dispatch(authSuccess(token));

      // 3600 seconds times 1000 gives 1hr
      dispatch(checkAuthTimeout(3600));

    })
    .catch(err => {
        dispatch(authFail(err))
    })
  }
}

export const logout = () =>{
  localStorage.removeItem('user');
  localStorage.removeItem('expirationDate');
  return{
      type: actionTypes.AUTH_LOGOUT
  }

}

checkAuthTimeout = expirationTime =>{
  // setTimeout will be in millisecond so need to turn seconds into milliseconds
  return dispatch =>{

    setTimeout(()=>{
        dispatch(logout());
    }, expirationTime * 1000)
  }
}



export const authSignup = (username, email, password1, password2) =>{
  // when we login we have to return a dispatch
  return dispatch=>{
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    }) // improvement: since same code w/ login create one function and call it
    .then(res=>{
      // response we will receive a key that is return form djangorestframework
      const token = res.data.key;

      // setting up an expirationDate to one hour
      const expirationDate = new Date(new Date().getTime +3600 * 1000);

      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);

      // if res is successful dispatch authSuccess method with toke as args
      dispatch(authSuccess(token));

      // 3600 seconds times 1000 gives 1hr
      dispatch(checkAuthTimeout(3600));

    })
    .catch(err => {
        dispatch(authFail(err))
    })
  }
}


// these methods are important because they are events that signals so that you
  // can do something else
