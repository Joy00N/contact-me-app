import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactEditComponent} from './contacts/contact-edit.component';
import {SettingsComponent} from './settings/settings.component';
import {NotificationService} from './service/notification.service';
import {AuthInterceptor} from './shared/auth.interceptor';
import {userReducer} from './user/state/user.reducer';
import {UserEffects} from './user/state/user.effects';
import {ButtonComponent} from './button/button.component';
import {HeaderComponent} from './header/header.component';
import {PageComponent} from './page/page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatComponent } from './cat/cat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    ContactEditComponent,
    SettingsComponent,
    ButtonComponent,
    HeaderComponent,
    PageComponent,
    CatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({user: userReducer}),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [
    NotificationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
