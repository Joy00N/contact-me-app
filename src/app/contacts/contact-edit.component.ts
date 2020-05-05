import {Component, OnInit} from '@angular/core';
import {ContactService} from '../service/contact.service';
import {Contact} from '../service/contact';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contactForm: FormGroup;
  contact = new Contact();
  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(),
      type: new FormControl(),
      openDate: new FormControl(),
      email: new FormControl(),
      emailNotification: new FormControl(true)
    });
  }
}
