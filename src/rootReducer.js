import { combineReducers } from 'redux';
import { counterReducer } from './store/counterReducer';

const rootReducer = combineReducers({
  counter: counterReducer,  
});

export default rootReducer;