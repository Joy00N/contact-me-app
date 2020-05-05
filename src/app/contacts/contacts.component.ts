import {Component, OnInit} from '@angular/core';
import {Contact} from '../service/contact';
import {ContactService} from '../service/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactService: ContactService) {
    this.contactService.getContacts()
      .subscribe((data: Contact[]) => {
        this.contacts = data;
      });
  }

  ngOnInit() {
  }
}
