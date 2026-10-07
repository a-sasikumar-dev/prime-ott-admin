import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  ApiUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+this.accessTokenObj['token']
  });

  deleteaudio(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/media/deleteaudio`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }

  deletesubtitle(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/media/deletesubtitle`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }

  getcastandcrew(mediaId : any) {
    return this.http.get<any>(`${this.ApiUrl}/media/getcastandcrew/${mediaId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  getaudios(mediaId : any) {
    return this.http.get<any>(`${this.ApiUrl}/media/getaudios/${mediaId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  getsubtitles(mediaId : any) {
    return this.http.get<any>(`${this.ApiUrl}/media/getsubtitles/${mediaId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  /* View Page */
  getcastandcrewdetail(mediaId : any) {
    return this.http.get<any>(`${this.ApiUrl}/media/getcastandcrewdetail/${mediaId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  
  getaudiolang(mediaId : any) {
    return this.http.get<any>(`${this.ApiUrl}/media/getaudiolang/${mediaId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  getsubtitlelang(mediaId : any) {
    return this.http.get<any>(`${this.ApiUrl}/media/getsubtitlelang/${mediaId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  //video
  getvideodata(mediaId : any) {
    return this.http.get<any>(`${this.ApiUrl}/media/getvideodata/${mediaId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  deletevideo(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/media/deletevideo`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
  deletetrailer(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/media/deletetrailer`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
}
