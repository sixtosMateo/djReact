import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

// here we define our initial state
    // ex: loading any errors, authentication token


const initialState = {
   token: null,
   error: null,
   loading: false
}


// recreating the methods that go hand to hand with our actions

// must return state that is updated
const authStart = (state, action) => {
    // what updateObject() method is doing is when we start we set
      // error to null and loading to true -> spinner will start spinning
    return updateObject(state,{
      error: null,
      loading: true
    })
}

const authSuccess = (state, action) => {
    // action is from action/actionTypes authSuccess one parameter is token & returns
      // an object therefore being able to grab the token here
    return updateObject(state, {
      token: action.token,
      error: null,
      loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
      token: null
    })
}
