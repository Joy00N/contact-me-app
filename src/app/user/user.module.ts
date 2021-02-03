import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {userReducer} from './state/user.reducer';


// const userRoutes: Routes = [
//   {path: 'login', component: SignupComponent}
// ];

@NgModule({
  imports: [
    // RouterModule.forChild(userRoutes),
    StoreModule.forFeature('users', userReducer)
  ],
  declarations: [
    // SignupComponent
  ]
})
export class UserModule {
}
