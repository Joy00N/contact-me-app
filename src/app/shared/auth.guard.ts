import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountService} from '../service/account.service';
import {select, Store} from '@ngrx/store';
import {getIsLoggedIn} from '../user/state/user.selector';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private store: Store<any>
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let ret;
    this.store.pipe(select(getIsLoggedIn)).subscribe(
      loggedIn => {
        if (loggedIn === true) {
          ret = true;
        } else {
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
          ret = false;
        }
      }
    );
    return ret;
  }
}
