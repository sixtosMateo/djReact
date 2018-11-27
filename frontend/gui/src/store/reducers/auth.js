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
