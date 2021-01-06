import { combineReducers } from 'redux';
import userReducer from './user';
import contactReducer from './contact';
import companyReducer from './company';

export default combineReducers({
    user: userReducer,
    contact: contactReducer,
    company: companyReducer
})