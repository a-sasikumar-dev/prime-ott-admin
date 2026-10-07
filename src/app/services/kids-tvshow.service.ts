import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KidsTvshowService {

  accessTokenData: any = localStorage.getItem("currentAdmin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  ApiUrl: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '+this.accessTokenObj['token']
  });

  /* Kids TV Shows Service*/
  addtvshowdetails(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-tvshow/addtvshowdetails`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
  gettvshowdetails(tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-tvshow/gettvshowdetails/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  gettvshows(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-tvshow/gettvshows`, formData, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  updatestatus(mediaId: any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-tvshow/updatestatus/${mediaId}`, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
  deletetvshow(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-tvshow/deletetvshow`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
  /* View page */
  gettvshowviewdetails(tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-tvshow/gettvshowviewdetails/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  getallseasons(tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-season/getallseasons/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  getallepisodes(seasonId : any, tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-episode/getallepisodes/${seasonId}/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  /* Season Service*/
  addseasondetails(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-season/addseasondetails`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
  addseasoncastcrewdetails(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-season/addseasoncastcrewdetails`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
  getseasondetails(seasonId : any, tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-season/getseasondetails/${seasonId}/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  getseason(tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-season/getseason/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  deleteseason(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-season/deleteseason`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
  /* View page */
  getseasonviewdetails(seasonId: any, tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-season/getseasonviewdetails/${seasonId}/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }

  /* Episode Service*/
  getseasonnumber(seasonId: any, tvshowId: any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-episode/getseasonnumber/${seasonId}/${tvshowId}`, { headers: this.headers })
    .pipe(map(response => {
        return response;
    }));
  }
  
  addepisodedetails(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-episode/addepisodedetails`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }
  getepisodedetails(episodeId : any, seasonId : any, tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-episode/getepisodedetails/${episodeId}/${seasonId}/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  getepisodes(seasonId : any, tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-episode/getepisodes/${seasonId}/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  deleteEpisode(formData: any) {
    return this.http.post<any>(`${this.ApiUrl}/kids-episode/deleteepisode`, formData, { headers: this.headers })
        .pipe(map(user => {
            return user;
        }));
  }

  /* View page */
  getepisodeviewdetails(episodeId: any, seasonId: any, tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-episode/getepisodeviewdetails/${episodeId}/${seasonId}/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
  getallviewepisodes(episodeId: any, seasonId : any, tvshowId : any) {
    return this.http.get<any>(`${this.ApiUrl}/kids-episode/getallviewepisodes/${episodeId}/${seasonId}/${tvshowId}`, { headers: this.headers })
        .pipe(map(response => {
            return response;
        }));
  }
}
