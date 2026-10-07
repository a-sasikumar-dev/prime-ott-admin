import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ApiUrl: string = environment.apiBaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  accessTokenObj: any = localStorage.getItem("currentAdmin");
  constructor(private http: HttpClient) { }

  validatelogin(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/validatelogin`, formData, { headers: this.headers })
        .pipe(map(user => {
            if (user && user.token) {
                localStorage.setItem('currentAdmin', JSON.stringify(user));
            }
            return user;
        }));
  }

  public get getAuthenticatedUser() {
    let accessTokenObj = JSON.parse(this.accessTokenObj);
      if(accessTokenObj) {
        return accessTokenObj;
      } else {
        location.replace('/auth/login')
      }
  }
}
