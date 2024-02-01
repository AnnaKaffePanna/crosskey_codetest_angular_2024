import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { FundData } from '../models/fund.model';

@Injectable({
  providedIn: 'root',
})
export class FundService {
  private apiUrl = 'https://ivarpivar.netlify.app/api';

  constructor(private http: HttpClient) {}

  getData(): Observable<FundData[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((response) => this.filterData(response)),
      catchError(this.handleError)
    );
  }

  private filterData(response: any): FundData[] {
    if (response && response.length > 0 && response[0].data) {
      return response[0].data
        .filter(
          (item: any) =>
            item.change1m !== null &&
            item.change3m !== null &&
            item.change3y !== null
        )
        .map((item: any) => ({
          fundName: item.fundName,
          change1m: item.change1m,
          change3m: item.change3m,
          change3y: item.change3y,
        }));
    } else {
      return [];
    }
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
