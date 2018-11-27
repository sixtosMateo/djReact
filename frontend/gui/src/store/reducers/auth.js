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
