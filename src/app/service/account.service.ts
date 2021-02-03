import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {logout} from '../user/state/user.actions';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  private authenticateUrl = `${environment.apiUrl}/api/users/authenticate`;
  private registerUrl = `${environment.apiUrl}/api/users/register`;

  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient, private store: Store<any>) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<boolean> {
    const userObj = new User();
    userObj.username = username;
    userObj.password = password;

    return this.http.post<boolean>(this.authenticateUrl, userObj);
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(this.registerUrl, user).subscribe(
      (err) => console.error(err)
    );
  }
}
