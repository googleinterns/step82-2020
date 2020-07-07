import { combineReducers } from 'redux';

import usersReducer from '../features/users';

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
