import {Component, OnInit} from '@angular/core';
import {User} from './model/user';
import {AccountService} from './service/account.service';
import {select, Store} from '@ngrx/store';
import {getIsLoggedIn} from './user/state/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'contact-me-app';
  user: User;
  isLoggedIn = false;

  constructor(private accountService: AccountService, private store: Store<any>) {
    this.accountService.user.subscribe(v => this.user = v);
  }

  ngOnInit(): void {
    this.store.pipe(select(getIsLoggedIn)).subscribe(
      loggedIn => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  logout() {
    this.accountService.logout();
  }
}
