import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {select, Store} from '@ngrx/store';
import {takeWhile} from 'rxjs/operators';
import {Login} from './state/user.actions';
import {getIsLoggedIn} from './state/user.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  isLoggedIn = false;
  loggedinUser: User;
  componentActive = true;

  constructor(private fb: FormBuilder, private userService: UserService, private store: Store<any>) {
  }

  get users() {
    return this.userForm.get('users') as FormArray;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    });

    this.store.pipe(select(getIsLoggedIn),
      takeWhile(() => this.componentActive))
      .subscribe(
        loggedIn => this.isLoggedIn = loggedIn
      );
  }

  handleLogin(value: boolean): void {
    this.store.dispatch(new Login(value));
  }

  save() {
    const user = new User();
    user.username = this.userForm.get('username').value;
    user.password = this.userForm.get('password').value;
    user.firstName = this.userForm.get('firstName').value;
    user.lastName = this.userForm.get('lastName').value;
    user.email = this.userForm.get('email').value;
    this.userService.setUsers(user);

    // this.isLoggedIn = true;
    this.handleLogin(true);
    this.loggedinUser = user;
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
