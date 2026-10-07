import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  ApiUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  getmovies(offset: any, search: any) {
    return this.http.get<any>(`${this.ApiUrl}/banners/getmovies/${offset}/${search}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  addbanners(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/banners/addbanners`, formData, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  getbannersselected(page: any) {
    return this.http.get<any>(`${this.ApiUrl}/banners/getbannersselected/${page}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  deletebanner(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/banners/deletebanner`, formData, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  getbannerselectedmovies(page: any) {
    return this.http.get<any>(`${this.ApiUrl}/banners/getbannerselectedmovies/${page}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  //Tvshows
  gettvshows(offset: any, search: any) {
    return this.http.get<any>(`${this.ApiUrl}/banners/gettvshows/${offset}/${search}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  getbannerselectedtvshows(page: any) {
    return this.http.get<any>(`${this.ApiUrl}/banners/getbannerselectedtvshows/${page}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  //Kids
  getkids(offset: any, search: any) {
    return this.http.get<any>(`${this.ApiUrl}/banners/getkids/${offset}/${search}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  getbannerselectedkids(page: any) {
    return this.http.get<any>(`${this.ApiUrl}/banners/getbannerselectedkids/${page}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  //Home
  gethomemedias(offset: any, search: any) {
    return this.http.get<any>(`${this.ApiUrl}/banners/gethomemedias/${offset}/${search}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  getbannerselectedhome(page: any) {
    return this.http.get<any>(`${this.ApiUrl}/banners/getbannerselectedhome/${page}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
}
