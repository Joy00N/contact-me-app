import {CommonModule} from '@angular/common';
import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {SignupComponent} from '../app/user/signup.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../app/service/user.service';
import {Store, StoreModule} from '@ngrx/store';
import {DemoMaterialModule} from '../app/shared/material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

export default {
  title: 'Components/SignUp',
  component: SignupComponent,
  decorators: [
    moduleMetadata({
      declarations: [SignupComponent],
      imports: [CommonModule, ReactiveFormsModule, HttpClientModule, StoreModule.forRoot({}), DemoMaterialModule, BrowserAnimationsModule],
      providers: [FormBuilder, UserService, Store]
    }),
  ],
} as Meta;

const Template: Story<SignupComponent> = () => ({
  component: SignupComponent,
  template: `<app-signup></app-signup>`
});
export const SignUp = Template.bind({});
// Other stories could be added here as well, all you have to do is export them along!
