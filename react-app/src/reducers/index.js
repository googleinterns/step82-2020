import { combineReducers } from 'redux';

import usersReducer from '../features/users';
import homeReducer from '../features/home';

const rootReducer = combineReducers({
  users: usersReducer,
  home: homeReducer,
});

export default rootReducer;
