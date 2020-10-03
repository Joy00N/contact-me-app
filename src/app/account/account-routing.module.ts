import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login.component';
import {SignupComponent} from '../user/signup.component';
import {LayoutComponent} from './layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: SignupComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
