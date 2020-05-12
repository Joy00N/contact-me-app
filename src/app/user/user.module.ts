import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {reducer} from './state/user.reducer';
import {SignupComponent} from './signup.component';


const userRoutes: Routes = [
  {path: 'login', component: SignupComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes),
    StoreModule.forFeature('users', reducer)
  ],
  declarations: [
    SignupComponent
  ]
})
export class UserModule {
}
