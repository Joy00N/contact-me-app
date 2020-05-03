import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../service/config.service';
import {Contact} from '../service/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];

  constructor(private configService: ConfigService) {
    this.configService.getContacts()
      .subscribe((data: Contact[]) => {
        this.contacts = data;
      });
  }

  ngOnInit() {
  }
}
