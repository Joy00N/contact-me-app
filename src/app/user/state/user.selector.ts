import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './user.reducer';

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getIsLoggedIn = createSelector(
  getUserFeatureState,
  state => state ? state.loggedIn : false
);
