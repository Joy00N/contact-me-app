import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AccountService} from '../service/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
  }

  canActivate(): boolean {
    if (this.accountService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/account/login']);
    return false;
  }
}
