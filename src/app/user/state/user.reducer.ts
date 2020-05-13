import {UserActionTypes} from './user.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface UserState {
  loggedIn: boolean;
}

const initialState: UserState = {
  loggedIn: false
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getIsLoggedIn = createSelector(
  getUserFeatureState,
  state => state.loggedIn
);

export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case UserActionTypes.login:
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
}
