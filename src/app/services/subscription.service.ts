import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  ApiUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+this.accessTokenObj['token']
  });

  getsubplans() {
    return this.http.get<any>(`${this.ApiUrl}/getsubplans`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  updatesubstatus(subId: any, status: any) {
    return this.http.post<any>(`${this.ApiUrl}/updatesubstatus/${subId}/${status}`, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }

  addsubscriptionplan(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/addsubscriptionplan`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
}
