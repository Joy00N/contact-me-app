import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { ContactService } from '../service/contact.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  loading = false;
  error: string | null = null;
  currentPage = 1;
  pageSize = environment.defaultPageSize;
  totalItems = 0;
  private destroy$ = new Subject<void>();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadContacts(): void {
    this.loading = true;
    this.error = null;
    
    this.contactService.getContacts(this.currentPage, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.contacts = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadContacts();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.loadContacts();
  }

  handleSendEmail(contactId: string): void {
    this.loading = true;
    this.error = null;
    
    this.contactService.sendEmail(contactId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loading = false;
          // Show success message
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        }
      });
  }

  handleDeleteContact(contactId: string): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.loading = true;
      this.error = null;
      
      this.contactService.deleteContact(contactId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loading = false;
            this.loadContacts(); // Reload the list
          },
          error: (error) => {
            this.error = error.message;
            this.loading = false;
          }
        });
    }
  }
}
