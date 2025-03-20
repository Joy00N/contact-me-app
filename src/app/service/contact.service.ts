import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Contact} from '../model/contact';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly contactUrl = `${environment.apiUrl}/contacts`;
  private readonly emailUrl = `${environment.apiUrl}/sendEmail`;

  constructor(private http: HttpClient) {
  }

  getContacts(page: number = 1, pageSize: number = environment.defaultPageSize): Observable<Contact[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Contact[]>(this.contactUrl, {params})
      .pipe(
        retry(3),
        tap(data => console.log('Contacts fetched successfully:', data)),
        catchError(this.handleError)
      );
  }

  setContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactUrl, contact)
      .pipe(
        tap(data => console.log('Contact created successfully:', data)),
        catchError(this.handleError)
      );
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.contactUrl}/${contact.id}`, contact)
      .pipe(
        tap(data => console.log('Contact updated successfully:', data)),
        catchError(this.handleError)
      );
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.contactUrl}/${id}`)
      .pipe(
        tap(() => console.log('Contact deleted successfully')),
        catchError(this.handleError)
      );
  }

  sendEmail(contactId: string): Observable<void> {
    return this.http.post<void>(this.emailUrl, {contactId})
      .pipe(
        tap(() => console.log('Email sent successfully')),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Invalid data provided';
          break;
        case 401:
          errorMessage = 'Unauthorized: Please log in';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource was not found';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Please try again later';
          break;
        default:
          errorMessage = `Server Error: ${error.status} ${error.statusText}`;
      }
    }

    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}
