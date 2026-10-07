import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BannersService } from 'src/app/services/banners.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-movie-banners',
  templateUrl: './movie-banners.component.html',
  styleUrls: ['./movie-banners.component.css']
})
export class MovieBannersComponent implements OnInit {

  movies: any = [];
  page = 0;
  throttle = 150;
  scrollDistance = 0;

  bannersSelected: any = [];
  selectedBannerData: any = [];
  searchName: any = 0;
  
  constructor(
    private bannersService : BannersService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.getmovies();
    this.getbannerselected();
    this.getbannerselectedmovies();
  }

  onScrollDown () {
    this.page += 1;
    this.getmovies();
  }

  getmovies() {
    this.bannersService.getmovies(this.page,this.searchName)
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
          }
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getsearchmovies(event: any) {
    this.searchName = event.target.value;
    if (event.target.value != '') {
      this.bannersService.getmovies(this.page,event.target.value)
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
    } else {
      this.searchName = 0;
      this.getmovies();
    }
  }

  selectBannerClick(movieId: any, movieName: any, cover: any, mediaType: any) {
    const bannerData = {
      'mediaId': movieId,
      'Type': 'Movie',
      'Page': 'MoviePage'
    }
    this.bannersService.addbanners(bannerData)
    .pipe(first())
    .subscribe(
      res => {
        this.toastr.success(res.success[0]['msg']);
        this.bannersSelected.push(movieId);
        this.selectedBannerData.push({
          "media_id": movieId,
          "media_name": movieName,
          "cover": cover,
          "media_type": mediaType,
        })
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getbannerselected() {
    this.bannersService.getbannersselected('MoviePage')
    .pipe(first())
    .subscribe(
      res => {
        this.bannersSelected = res.data.map((items : any) => items.media_id);
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getbannerselectedmovies() {
    this.bannersService.getbannerselectedmovies('MoviePage')
    .pipe(first())
    .subscribe(
      res => {
        this.selectedBannerData = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  deleteBanner(movieId: any) {
    const deleteData = {
      'mediaId': movieId,
      'Page': 'MoviePage'
    }
    this.bannersService.deletebanner(deleteData)
    .pipe(first())
    .subscribe(
      res => {
        this.toastr.success(res.success[0]['msg']);
        // get index of object with audioId
        const removeIndex = this.selectedBannerData.findIndex( (item: any) => item.media_id === movieId );
        // remove object
        this.selectedBannerData.splice( removeIndex, 1 );
        const index = this.bannersSelected.indexOf(movieId);
        console.log(index);
        if (index > -1) {
          this.bannersSelected.splice(index, 1);
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      }); 
  }
}
