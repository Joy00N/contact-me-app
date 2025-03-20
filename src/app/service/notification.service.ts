import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap, takeWhile, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Contact } from '../model/contact';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationUrl = `${environment.apiUrl}/notifications`;
  private isNotificationEnabled = true;

  constructor(
    private http: HttpClient,
    private contactService: ContactService
  ) {
    this.startNotificationCheck();
  }

  private startNotificationCheck(): void {
    interval(environment.notificationInterval)
      .pipe(
        takeWhile(() => this.isNotificationEnabled),
        switchMap(() => this.checkExpiredContacts())
      )
      .subscribe();
  }

  private checkExpiredContacts(): Observable<Contact[]> {
    return this.contactService.getContacts()
      .pipe(
        tap(contacts => {
          const expiredContacts = contacts.filter(contact => 
            contact.isExpired && !contact.lastNotificationSent
          );

          if (expiredContacts.length > 0) {
            this.sendExpiredNotifications(expiredContacts);
          }
        })
      );
  }

  private sendExpiredNotifications(contacts: Contact[]): void {
    contacts.forEach(contact => {
      this.http.post(`${this.notificationUrl}/expired`, {
        contactId: contact.id,
        productName: contact.productName,
        expirationDate: contact.expirationDate
      }).subscribe({
        next: () => {
          // Update the contact's last notification sent date
          this.contactService.updateContact({
            ...contact,
            lastNotificationSent: new Date().toISOString()
          }).subscribe();
        },
        error: (error) => console.error('Failed to send notification:', error)
      });
    });
  }

  enableNotifications(): void {
    this.isNotificationEnabled = true;
  }

  disableNotifications(): void {
    this.isNotificationEnabled = false;
  }

  sendTestNotification(): Observable<void> {
    return this.http.post<void>(`${this.notificationUrl}/test`, {});
  }
} 