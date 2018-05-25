import { combineReducers } from 'redux';
import nav from './nav';
import  auth from './auth';

const rootReducer = combineReducers({
    nav,
    auth
});
 
export default rootReducer;