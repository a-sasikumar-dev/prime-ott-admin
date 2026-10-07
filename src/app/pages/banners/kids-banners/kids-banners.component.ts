import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BannersService } from 'src/app/services/banners.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-kids-banners',
  templateUrl: './kids-banners.component.html',
  styleUrls: ['./kids-banners.component.css']
})
export class KidsBannersComponent implements OnInit {

  kids: any = [];
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
    this.getkids();
    this.getbannerselected();
    this.getbannerselectedkids();
  }

  onScrollDown () {
    this.page += 1;
    this.getkids();
  }

  getkids() {
    this.bannersService.getkids(this.page,this.searchName)
    .pipe(first())
    .subscribe(
      res => {
        if(this.page == 0) {
          this.kids = res.data;
        } else {
          if(res.data.length > 0) {
            for (let i = 0; i < res.data.length; ++i) {
              this.kids.push(res.data[i]);
            }
          }
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getsearchkids(event: any) {
    this.searchName = event.target.value;
    if (event.target.value != '') {
      this.bannersService.getkids(this.page,event.target.value)
      .pipe(first())
      .subscribe(
        res => {
          if(this.page == 0) {
            this.kids = res.data;
          } else {
            if(res.data.length > 0) {
              for (let i = 0; i < res.data.length; ++i) {
                this.kids.push(res.data[i]);
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
      this.getkids();
    }
  }

  selectBannerClick(mediaId: any, medialName: any, cover: any, mediaType: any) {
    const bannerData = {
      'mediaId': mediaId,
      'Type': mediaType,
      'Page': 'KidsPage'
    }
    this.bannersService.addbanners(bannerData)
    .pipe(first())
    .subscribe(
      res => {
        this.toastr.success(res.success[0]['msg']);
        this.bannersSelected.push(mediaId);
        this.selectedBannerData.push({
          "media_id": mediaId,
          "media_name": medialName,
          "cover": cover,
          "media_type": mediaType,
        })
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getbannerselected() {
    this.bannersService.getbannersselected('KidsPage')
    .pipe(first())
    .subscribe(
      res => {
        this.bannersSelected = res.data.map((items : any) => items.media_id);
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }
  
  getbannerselectedkids() {
    this.bannersService.getbannerselectedkids('KidsPage')
    .pipe(first())
    .subscribe(
      res => {
        this.selectedBannerData = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  deleteBanner(mediaId: any) {
    const deleteData = {
      'mediaId': mediaId,
      'Page': 'KidsPage'
    }
    this.bannersService.deletebanner(deleteData)
    .pipe(first())
    .subscribe(
      res => {
        this.toastr.success(res.success[0]['msg']);
        // get index of object with audioId
        const removeIndex = this.selectedBannerData.findIndex( (item: any) => item.media_id === mediaId );
        // remove object
        this.selectedBannerData.splice( removeIndex, 1 );
        const index = this.bannersSelected.indexOf(mediaId);
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
