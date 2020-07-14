import { combineReducers } from 'redux';

import usersReducer from '../features/users';
import clinkReducer from '../features/clink';

const rootReducer = combineReducers({
  users: usersReducer,
  clink: clinkReducer
});

export default rootReducer;
