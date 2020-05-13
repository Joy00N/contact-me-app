import {Action} from '@ngrx/store';

export enum UserActionTypes {
  login = '[User] Log In'
}

export class Login implements Action {
  readonly type = UserActionTypes.login;

  constructor(public payload: boolean) {
  }
}

export type UserActions = Login;
