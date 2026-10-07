import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  ApiUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  getrevenueamount(selectedDate: any) {
    return this.http.get<any>(`${this.ApiUrl}/dashboard/getrevenueamount/${selectedDate}`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }
  
  getrecentlyaddedmovies() {
    return this.http.get<any>(`${this.ApiUrl}/dashboard/getrecentlyaddedmovies`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }

  getrecentlyaddedtvshows() {
    return this.http.get<any>(`${this.ApiUrl}/dashboard/getrecentlyaddedtvshows`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }

  getcustomerscount(selectedDate: any) {
    return this.http.get<any>(`${this.ApiUrl}/dashboard/getcustomerscount/${selectedDate}`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }
}
