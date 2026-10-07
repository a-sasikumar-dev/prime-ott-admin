import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BannersService } from 'src/app/services/banners.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tvshow-banners',
  templateUrl: './tvshow-banners.component.html',
  styleUrls: ['./tvshow-banners.component.css']
})
export class TvshowBannersComponent implements OnInit {

  tvshows: any = [];
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
    this.gettvshows();
    this.getbannerselected();
    this.getbannerselectedtvshows();
  }

  onScrollDown () {
    this.page += 1;
    this.gettvshows();
  }

  gettvshows() {
    this.bannersService.gettvshows(this.page,this.searchName)
    .pipe(first())
    .subscribe(
      res => {
        if(this.page == 0) {
          this.tvshows = res.data;
        } else {
          if(res.data.length > 0) {
            for (let i = 0; i < res.data.length; ++i) {
              this.tvshows.push(res.data[i]);
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

  getsearchtvshows(event: any) {
    this.searchName = event.target.value;
    if (event.target.value != '') {
      this.bannersService.gettvshows(this.page,event.target.value)
      .pipe(first())
      .subscribe(
        res => {
          if(this.page == 0) {
            this.tvshows = res.data;
          } else {
            if(res.data.length > 0) {
              for (let i = 0; i < res.data.length; ++i) {
                this.tvshows.push(res.data[i]);
              }
            }
          }
        },
        error => {
          this.toastr.error(error.error.errors[0]['msg']);
        });  
    } else {
      this.searchName = 0;
      this.gettvshows();
    }
  }

  selectBannerClick(tvshowId: any, tvshowName: any, cover: any, mediaType: any) {
    const bannerData = {
      'mediaId': tvshowId,
      'Type': 'TVShow',
      'Page': 'TVShowPage'
    }
    this.bannersService.addbanners(bannerData)
    .pipe(first())
    .subscribe(
      res => {
        this.toastr.success(res.success[0]['msg']);
        this.bannersSelected.push(tvshowId);
        this.selectedBannerData.push({
          "media_id": tvshowId,
          "media_name": tvshowName,
          "cover": cover,
          "media_type": mediaType,
        })
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getbannerselected() {
    this.bannersService.getbannersselected('TVShowPage')
    .pipe(first())
    .subscribe(
      res => {
        this.bannersSelected = res.data.map((items : any) => items.media_id);
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getbannerselectedtvshows() {
    this.bannersService.getbannerselectedtvshows('TVShowPage')
    .pipe(first())
    .subscribe(
      res => {
        this.selectedBannerData = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  deleteBanner(tvshowId: any) {
    const deleteData = {
      'mediaId': tvshowId,
      'Page': 'TVShowPage'
    }
    this.bannersService.deletebanner(deleteData)
    .pipe(first())
    .subscribe(
      res => {
        this.toastr.success(res.success[0]['msg']);
        // get index of object with audioId
        const removeIndex = this.selectedBannerData.findIndex( (item: any) => item.media_id === tvshowId );
        // remove object
        this.selectedBannerData.splice( removeIndex, 1 );
        const index = this.bannersSelected.indexOf(tvshowId);
        if (index > -1) {
          this.bannersSelected.splice(index, 1);
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

}
