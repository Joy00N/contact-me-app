import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {SignupComponent} from '../user/signup.component';
import { LayoutComponent } from './layout.component';


@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    LayoutComponent
  ]
})
export class AccountModule { }
