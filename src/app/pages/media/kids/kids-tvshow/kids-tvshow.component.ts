import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KidsTvshowService } from 'src/app/services/kids-tvshow.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kids-tvshow',
  templateUrl: './kids-tvshow.component.html',
  styleUrls: ['./kids-tvshow.component.css']
})
export class KidsTvshowComponent implements OnInit {

  page = 0;
  throttle = 150;
  scrollDistance = 0;
  tvshow: any = [];
  searchValue: any = '';
  searchType: any = '';
  newTvshowId: any;

  constructor(
    private kidstvshowService : KidsTvshowService,
    private toastr : ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const curdate = new Date();
    const curtime = curdate.getTime();
    this.newTvshowId = curtime+Math.random().toString(36).substr(2, 9);
    this.gettvshows(this.searchValue, this.searchType);
  }

  searchtvshows(event: any, type: any) {
    this.searchValue = event.target.value,
    this.searchType = type;
    this.page = 0;
    this.gettvshows(this.searchValue, this.searchType);
  }

  onScrollDown() {
    this.page += 1;
    this.gettvshows(this.searchValue, this.searchType);
  }

  gettvshows(searchValue: any, searchType: any) {
    const tvData = {
      'offset': this.page,
      'searchValue': searchValue,
      'searchType': searchType
    }
    this.kidstvshowService.gettvshows(tvData)
    .pipe(first())
    .subscribe(
      res => {
        if(this.page == 0) {
          this.tvshow = res.data;
        } else {
          if(res.data.length > 0) {
            for (let i = 0; i < res.data.length; ++i) {
              this.tvshow.push(res.data[i]);
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
    this.kidstvshowService.updatestatus(mediaId)
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

  deleteTvshow(tvshowId: any) {
    Swal.fire({
      text: 'Please enter "Delete" to delete the tvshow.',
      input: 'text',
    }).then((result) => {
      if (result.value == 'Delete') {
        const data = {'tvshowId' : tvshowId}
        this.kidstvshowService.deletetvshow(data)
        .pipe(first())
        .subscribe(
          res => {
            // get index of object with tvshowId
            const removesubIndex = this.tvshow.findIndex( (item: any) => item.tvshow_id === tvshowId );
            // remove object
            this.tvshow.splice( removesubIndex, 1 );
            this.toastr.success(res.success[0]['msg']);
          },
          error => {
            this.toastr.error(error.error.errors[0]['msg']);
          });
      }
    });
  }
}