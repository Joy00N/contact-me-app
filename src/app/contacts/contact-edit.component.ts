import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../model/contact';
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
      name: '',
      type: 'yearly',
      openDate: '',
      emailNotification: true
    });
  }

  save() {
    console.log(this.contactForm.getRawValue() as Contact);
    const contact = new Contact();
    contact.name = this.contactForm.get('name').value;
    contact.contactType = this.contactForm.get('type').value;
    contact.openingDate = this.contactForm.get('openDate').value;
    this.contactService.setContacts(contact);
  }
}
