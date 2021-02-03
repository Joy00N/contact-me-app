import {createAction} from '@ngrx/store';

export const login = createAction(
  '[User] Log In'
);

export const logout = createAction(
  '[User] Log Out'
);
