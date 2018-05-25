import { createStore , applyMiddleware} from 'redux';
import rootReducer from './reducers';
import { middleware } from '../utils/redux';
 
let store = createStore(rootReducer,applyMiddleware(middleware));
 
export default store;