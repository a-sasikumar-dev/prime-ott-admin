import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  ApiUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+this.accessTokenObj['token']
  });

  getrevenuedetails() {
    return this.http.get<any>(`${this.ApiUrl}/customers/getrevenuedetails`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }

  getcustomers(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/customers/getcustomers`,formData, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }

  getcustomerdetail(customerId: any) {
    return this.http.get<any>(`${this.ApiUrl}/customers/getcustomerdetail/${customerId}`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }

  getcustomerpaymentdetails(customerId: any) {
    return this.http.get<any>(`${this.ApiUrl}/customers/getcustomerpaymentdetails/${customerId}`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }

  getagentdata(customerId: any) {
    return this.http.get<any>(`${this.ApiUrl}/customers/getagentdata/${customerId}`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }

  getcurrentsubscription(customerId: any) {
    return this.http.get<any>(`${this.ApiUrl}/customers/getcurrentsubscription/${customerId}`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }

  getpaymenthistory(customerId: any) {
    return this.http.get<any>(`${this.ApiUrl}/customers/getpaymenthistory/${customerId}`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }

  //watch history
  getwatchhistory(customerId: any) {
    return this.http.get<any>(`${this.ApiUrl}/customers/getwatchhistory/${customerId}`, { headers: this.headers })
      .pipe(map(response => {
          return response;
      }));
  }
}
