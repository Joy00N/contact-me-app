import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactEditComponent} from './contacts/contact-edit.component';
import {SettingsComponent} from './settings/settings.component';
import {AuthGuard} from './shared/auth.guard';
import { CatComponent } from './cat/cat.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'account', loadChildren: accountModule},
  {path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard]},
  {path: 'edit', component: ContactEditComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'cat', component: CatComponent, canActivate: []},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
