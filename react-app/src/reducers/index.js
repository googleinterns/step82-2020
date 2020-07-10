import { combineReducers } from 'redux';

import usersReducer from '../features/users';
import clinkReducer from '../features/users';

const rootReducer = combineReducers({
  users: usersReducer,
  clink: clinkReducer
});

export default rootReducer;
