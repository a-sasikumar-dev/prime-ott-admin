import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  ApiUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.accessTokenObj['token']
  });

  headersWithoutContenttype = new HttpHeaders({
    'Authorization': 'Bearer '+this.accessTokenObj['token']
  });

  getadmindetails() {
    return this.http.get<any>(`${this.ApiUrl}/getadmindetails/${this.accessTokenObj['id']}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  updateadmindetails(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/updateadmindetails`, formData, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  updatepassword(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/updatepassword`, formData, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
}
