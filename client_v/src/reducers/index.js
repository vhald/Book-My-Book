import { combineReducers } from 'redux';
import { authReducer } from './auth'


// combine multiple Reducers
const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;