import {Component} from '@angular/core';
import {User} from './model/user';
import {AccountService} from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-me-app';
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(v => this.user = v);
  }

  logout() {
    this.accountService.logout();
  }
}
