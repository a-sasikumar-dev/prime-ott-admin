import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TvshowService } from 'src/app/services/tvshow.service';
import { MediauploadService } from 'src/app/services/mediaupload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-tvshow',
  templateUrl: './add-tvshow.component.html',
  styleUrls: ['./add-tvshow.component.css']
})
export class AddTvshowComponent implements OnInit {

  tvshowId: any;
  releasedDate!: NgbDateStruct;
  genre: any = [];
  isGenreFilled = false;
  portraitUploading = false;
  portraitUploadProgress: number = 0;
  portraitObj!: File;
  portraitImageUrl: any = '';
  coverUploading = false;
  coverUploadProgress: number = 0;
  coverObj!: File;
  coverImageUrl: any = '';
  tvshowInfosubmitted = false;
  basicInfoLoading = false;

  constructor(
    private mediauploadService : MediauploadService,
    private tvshowService : TvshowService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  TvshowInfo = new FormGroup({
    'tvshowName' : new FormControl(null, Validators.required),
    'releasedDate' : new FormControl(null, Validators.required),
    'nativeLang' : new FormControl(null, Validators.required),
    'tvshowDescription' : new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    this.tvshowId = this.route.snapshot.queryParamMap.get('tvId');
    this.gettvshowdetails();
  }

  addGenre(gen: any) {
    if(this.genre.indexOf(gen) !== -1) {
      this.genre = this.genre.filter((items: any) => items !== gen);
    } else {
      this.isGenreFilled = false;
      this.genre.push(gen);
    }
  }

  onPortraitPicked(event: Event) {
    const FILE = (event.target as HTMLInputElement).files![0];
    this.portraitObj = FILE;
    const portraitForm = new FormData();
    portraitForm.append('portraitImage', this.portraitObj);
    this.mediauploadService.uploadportraitimage(
      portraitForm
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            //console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            //console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.portraitUploading = true;
            this.portraitUploadProgress = Math.round(event.loaded / event.total! * 100);
            //console.log(`Uploaded! ${this.portraitUploadProgress}%`);
            break;
          case HttpEventType.Response:
            this.portraitImageUrl = event.body.portraitLocation;
            this.toastr.success('Portrait image successfully uploaded');
            this.portraitUploadProgress = 0;
            this.portraitUploading = false;
        }
      },(err:HttpErrorResponse)=>{
        this.portraitUploadProgress = 0;
        this.portraitUploading = false;
        this.portraitImageUrl = "";
        this.toastr.error(err.error.errors[0]['msg']);
      });
  }

  portraitClose() {
    this.portraitUploadProgress = 0;
    this.portraitUploading = false;
    this.portraitImageUrl = "";
  }

  onCoverPicked(event: Event) {
    const FILE = (event.target as HTMLInputElement).files![0];
    this.coverObj = FILE;
    const coverForm = new FormData();
    coverForm.append('coverImage', this.coverObj);
    this.mediauploadService.uploadcoverimage(
      coverForm
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            //console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            //console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.coverUploading = true;
            this.coverUploadProgress = Math.round(event.loaded / event.total! * 100);
            //console.log(`Uploaded! ${this.portraitUploadProgress}%`);
            break;
          case HttpEventType.Response:
            this.coverImageUrl = event.body.coverLocation;
            this.toastr.success('Cover image successfully uploaded');
            this.coverUploadProgress = 0;
            this.coverUploading = false;
            // const reader = new FileReader();
            // reader.onload = () => {
            //   this.coverImageUrl = reader.result as string;
            // }
            // reader.readAsDataURL(FILE)
        }
      },(err:HttpErrorResponse)=>{
        this.coverUploadProgress = 0;
        this.coverUploading = false;
        this.coverImageUrl = "";
        this.toastr.error(err.error.errors[0]['msg']);
      });
  }

  coverClose() {
    this.coverUploadProgress = 0;
    this.coverUploading = false;
    this.coverImageUrl = "";
  }

  tvshowInformationSubmit() {
    this.tvshowInfosubmitted = false;
    if (this.genre == '') {
      this.isGenreFilled = true;
      this.toastr.error('Please fill all fields');
    } else {
      this.isGenreFilled = false;
    }
    if (this.TvshowInfo.valid) {
      if (this.portraitImageUrl == '' || this.coverImageUrl == '') {
        this.toastr.error('Please upload portrait & cover image');
      } else {
        const tvshowInfoData = {
          "tvshowId" : this.tvshowId,
          "tvshowName" : this.TvshowInfo.value.tvshowName, 
          "releasedDate" : this.TvshowInfo.value.releasedDate.year+'-'+this.TvshowInfo.value.releasedDate.month+'-'+this.TvshowInfo.value.releasedDate.day,
          "nativeLang" : this.TvshowInfo.value.nativeLang,
          "tvshowDescription" : this.TvshowInfo.value.tvshowDescription, 
          "genre" : this.genre,
          "portraitImageUrl" : this.portraitImageUrl,
          "coverImageUrl" : this.coverImageUrl
        }
        this.basicInfoLoading = true;
      this.tvshowService.addtvshowdetails(tvshowInfoData)
        .pipe(first())
        .subscribe(
          res => {
            this.toastr.success(res.success[0]['msg']);
            this.basicInfoLoading = true;
            this.router.navigate(['/media/tvshows']);
          },
          error => {
            this.toastr.error(error.error.errors[0]['msg']);
          });
      }
    } else {
      this.tvshowInfosubmitted = true;
      this.toastr.error('Please fill all fields');
    }
  }

  /*get methods start*/
  gettvshowdetails() {
    this.tvshowService.gettvshowdetails(this.tvshowId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data[0] != '' && res.data[0] != undefined) {
          this.TvshowInfo.setValue({
            'tvshowName' : res.data[0]['tvshow_name'],
            'releasedDate': res.data[0]['released_date'],
            'nativeLang': res.data[0]['native_lang'],
            'tvshowDescription': res.data[0]['description'],
          });
          this.genre = res.data[0]['genres'].split(',');
          let date = (new Date(res.data[0]['released_date'])).toISOString().split('T')[0];
          let dateres = date.split("-");
          let ayear = parseInt(dateres[0]);
          let amonth = parseInt(dateres[1]);
          let adate = parseInt(dateres[2]);
          this.releasedDate = {year: ayear, month: amonth, day: adate};
          this.portraitImageUrl = res.data[0]['poster'];
          this.coverImageUrl = res.data[0]['cover'];
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }
}
