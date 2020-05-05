import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../service/contact';
import {FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  constructor(private contactService: ContactService) {
  }

  form = new FormGroup({
    name: new FormGroup(''),
    type: new FormGroup(''),
    openDate: new FormGroup(''),
    email: new FormGroup('', [Validators.required, Validators.email]),
    emailNotification: new FormGroup('')
  });

  ngOnInit() {
  }

  onClickSave() {
  this.form

    this.contactService.setContacts();
  }

  // parseToContactFormat() {
  //   contact = new Contact();
  //
  // }
}
