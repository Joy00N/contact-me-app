import {createReducer, on} from '@ngrx/store';
import {login, logout} from './user.actions';
import {User} from '../../model/user';

export interface UserState {
  currentUser: User;
  loggedIn: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loggedIn: false
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(login, (state): UserState => {
    console.log('login state: ' + JSON.stringify(state));
    return {
      ...state,
      loggedIn: true
    };
  }),
  on(logout, (state): UserState => {
    console.log('logout state: ' + JSON.stringify(state));
    return {
      ...state,
      loggedIn: false
    };
  })
);
