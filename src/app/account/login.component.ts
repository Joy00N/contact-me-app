import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../service/account.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private accountService: AccountService
  ) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    const returnUrl = 'returnUrl';
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    });

    this.returnUrl = this.route.snapshot.queryParams[returnUrl] || '/';
  }

  onSubmit() {
    this.accountService.login(this.f.username.value, this.f.password.value)
      .pipe(take(1))
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        }
      );
  }

}
