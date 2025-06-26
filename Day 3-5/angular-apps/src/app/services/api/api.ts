import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { kreditur } from '../../../model/creditur.interface';

@Injectable({
  providedIn: 'root'
})
export class Api {

  api: string = "https://685cee1c769de2bf085e7a6f.mockapi.io/angular/data-list/kreditur"

  constructor(private http: HttpClient) { }

  getData(): Observable<kreditur[]> {
    return this.http.get<kreditur[]>(this.api);
  }

  addData(data: kreditur): Observable<kreditur> {
    return this.http.post<kreditur>(this.api, data);
  }

  deleteData(id: string): Observable<kreditur> {
    return this.http.delete<kreditur>(`${this.api}/${id}`);
  }
}
