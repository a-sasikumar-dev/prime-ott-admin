import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { KidsMovieService } from 'src/app/services/kids-movie.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kids-movie',
  templateUrl: './kids-movie.component.html',
  styleUrls: ['./kids-movie.component.css']
})
export class KidsMovieComponent implements OnInit {

  page = 0;
  throttle = 150;
  scrollDistance = 0;
  movies: any = [];
  searchValue: any = '';
  searchType: any = '';
  newMovieId: any;
  constructor(
    private kidsmovieService : KidsMovieService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    const curdate = new Date();
    const curtime = curdate.getTime();
    this.newMovieId = curtime+Math.random().toString(36).substr(2, 9);
    this.getmovies(this.searchValue, this.searchType);
  }

  searchmovies(event: any, type: any) {
    this.searchValue = event.target.value,
    this.searchType = type;
    this.page = 0;
    this.getmovies(this.searchValue, this.searchType);
  }

  onScrollDown() {
    this.page += 1;
    this.getmovies(this.searchValue, this.searchType);
  }

  getmovies(searchValue: any, searchType: any) {
    const movData = {
      'offset': this.page,
      'searchValue': searchValue,
      'searchType': searchType
    } 
    this.kidsmovieService.getmovies(movData)
    .pipe(first())
    .subscribe(
      res => {
        if(this.page == 0) {
          this.movies = res.data;
        } else {
          if(res.data.length > 0) {
            for (let i = 0; i < res.data.length; ++i) {
              this.movies.push(res.data[i]);
            }
          } else {
            this.page -= 1;
          }
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  setLiveClick(mediaId: any, event: any) {
    this.kidsmovieService.updatestatus(mediaId)
    .pipe(first())
    .subscribe(
      res => {
        this.toastr.success(res.success[0]['msg']);
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
        event.target.checked = false;
      });
  }

  deleteMovie(movieId: any) {
    Swal.fire({
      text: 'Please enter "Delete" to delete the movie.',
      input: 'text',
    }).then((result) => {
      if (result.value == 'Delete') {
        const data = {'movieId' : movieId}
        this.kidsmovieService.deletemovie(data)
        .pipe(first())
        .subscribe(
          res => {
            // get index of object with movieId
            const removesubIndex = this.movies.findIndex( (item: any) => item.movie_id === movieId );
            // remove object
            this.movies.splice( removesubIndex, 1 );
            this.toastr.success(res.success[0]['msg']);
          },
          error => {
            this.toastr.error(error.error.errors[0]['msg']);
          });
      }
    });
  }

}