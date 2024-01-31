import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  private apiUrl = 'https://ivarpivar.netlify.app/api';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }
  //ToDo: Get only the parameters needed

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    throw error;
  }
}