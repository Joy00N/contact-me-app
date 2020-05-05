import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../service/contact';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contactForm: FormGroup;
  contact = new Contact();

  constructor(private fb: FormBuilder, private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: '',
      type: 'yearly',
      openDate: '',
      email: '',
      emailNotification: true
    });
  }

  save() {
  }
}
