import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
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

  // Mock credentials
  private mockUsername = 'demo';
  private mockPassword = 'demo123';

  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient, private store: Store<any>) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<boolean> {
    // Mock login implementation
    if (username === this.mockUsername && password === this.mockPassword) {
      const userObj = new User();
      userObj.username = username;
      userObj.password = password;
      localStorage.setItem('user', JSON.stringify(userObj));
      this.userSubject.next(userObj);
      return of(true);
    }
    return of(false);
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

  isLoggedIn(): boolean {
    return !!this.userValue;
  }

  updateUserSettings(settings: any): Observable<any> {
    const user = this.userValue;
    user.settings = settings;
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
    return of(user);
  }
}
