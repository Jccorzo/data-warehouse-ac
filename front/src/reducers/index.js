import { combineReducers } from 'redux';
import userReducer from './user';
import contactReducer from './contact';
import companyReducer from './company';
import regionReducer from './region';

export default combineReducers({
    user: userReducer,
    contact: contactReducer,
    company: companyReducer,
    region: regionReducer
})