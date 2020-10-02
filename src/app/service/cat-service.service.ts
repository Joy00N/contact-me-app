import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatServiceService {

  private url = `https://cors-anywhere.herokuapp.com/https://http.cat/`;

  constructor(private http: HttpClient) {
  }

  getCat(): Observable<Blob> {
    const httpCodeList = [100, 101, 102, 200, 201, 202, 204];
    const randomNumber = Math.floor(Math.random() * (httpCodeList.length - 1));
    return this.http.get(this.url + httpCodeList[randomNumber], {responseType: 'blob'});
  }
}
