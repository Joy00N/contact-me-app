import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions
  ) {}

  // Add your effects here
  // Example:
  // loadUsers$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.loadUsers),
  //   mergeMap(() => of([])
  //     .pipe(
  //       map(users => UserActions.loadUsersSuccess({ users })),
  //       catchError(error => of(UserActions.loadUsersFailure({ error })))
  //     ))
  // ));
} 