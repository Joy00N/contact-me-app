import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ContactsComponent} from './contacts/contacts.component';
import {HttpClientModule} from '@angular/common/http';
import {ContactEditComponent} from './contacts/contact-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './shared/material-module';
import {ReactiveFormsModule} from '@angular/forms';
import {ContactService} from './service/contact.service';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {UserModule} from './user/user.module';
import {AccountModule} from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    ContactEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    AccountModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Contact me DevTools',
      maxAge: 25
    })
  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
