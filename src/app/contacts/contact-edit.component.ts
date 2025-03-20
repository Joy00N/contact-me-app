import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact, Priority} from '../model/contact';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
  }

  get contacts() {
    return this.contactForm.get('contacts') as FormArray;
  }
  ngOnInit() {
    this.contactForm = this.fb.group({
      productName: '',
      contactType: 'yearly',
      openingDate: '',
      isNotificationOn: true
    });
  }

  save() {
    console.log(this.contactForm.getRawValue() as Contact);
    const contact: Contact = {
      id: '',
      userId: '',
      productName: this.contactForm.get('productName').value,
      contactType: this.contactForm.get('contactType').value,
      openingDate: this.contactForm.get('openingDate').value,
      isNotificationOn: this.contactForm.get('isNotificationOn').value,
      expirationDate: '',
      isExpired: false,
      priority: Priority.MEDIUM,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.contactService.setContact(contact);
  }
}
