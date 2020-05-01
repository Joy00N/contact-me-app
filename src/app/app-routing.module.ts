import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactEditComponent} from './contacts/contact-edit.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'edit', component: ContactEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
