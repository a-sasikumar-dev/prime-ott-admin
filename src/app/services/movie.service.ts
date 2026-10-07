import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  ApiUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+this.accessTokenObj['token']
  });

  addmoviebasicdetails(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/movie/addmoviebasicdetails`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }

  addmoviecastcrewdetails(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/movie/addmoviecastcrewdetails`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }

  getmoviebasicdetails(movieId : any) {
    return this.http.get<any>(`${this.ApiUrl}/movie/getmoviebasicdetails/${movieId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  getmovies(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/movie/getmovies`, formData, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  deletemovie(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/movie/deletemovie`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }

  updatestatus(mediaId: any) {
    return this.http.post<any>(`${this.ApiUrl}/movie/updatestatus/${mediaId}`, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
  
  /*view movie page*/
  getmoviedetails(movieId : any) {
    return this.http.get<any>(`${this.ApiUrl}/movie/getmoviedetails/${movieId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  
}
