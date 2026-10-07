import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediauploadService {

  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  ApiUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  headersWithoutContenttype = new HttpHeaders({
    'Authorization': 'Bearer '+this.accessTokenObj['token']
  });

  uploadavatar(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/uploadavatar`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }

  uploadportraitimage(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/media/uploadportraitimage`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
  uploadcoverimage(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/media/uploadcoverimage`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
  uploadaudio(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/media/uploadaudio`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
  uploadsubtitle(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/media/uploadsubtitle`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
  
  /*Kids*/
  kidsuploadaudio(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-media/kidsuploadaudio`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
  kidsuploadsubtitle(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-media/kidsuploadsubtitle`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }

  // Video
  uploadvideo(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/media/uploadvideo`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
  uploadtrailer(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/media/uploadtrailer`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
  updaterunningtime(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/media/updaterunningtime`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }

  // Kids Video
  kidsuploadvideo(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-media/kidsuploadvideo`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
  kidsuploadtrailer(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-media/kidsuploadtrailer`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
  kidsupdaterunningtime(formData : any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-media/kidsupdaterunningtime`, formData, { headers: this.headersWithoutContenttype, reportProgress: true, observe: 'events' })
        .pipe(map(response => {
            return response;
        }));
  }
}
