import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { KidsTvshowService } from 'src/app/services/kids-tvshow.service';
import { KidsMediaService } from 'src/app/services/kids-media.service';
import { MediauploadService } from 'src/app/services/mediaupload.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-kids-add-season',
  templateUrl: './kids-add-season.component.html',
  styleUrls: ['./kids-add-season.component.css']
})
export class KidsAddSeasonComponent implements OnInit {

  tvshowId: any;
  seasonId: any;
  tvshowName: any = '';
  basicInformation = true;
  castCrewInformation = false;

  releasedDate!: NgbDateStruct;
  portraitUploading = false;
  portraitUploadProgress: number = 0;
  portraitObj!: File;
  portraitImageUrl: any = '';
  coverUploading = false;
  coverUploadProgress: number = 0;
  coverObj!: File;
  coverImageUrl: any = '';
  basicInfosubmitted = false;
  basicInfoLoading = false;

  starring: any = [];
  supportingActors: any = [];
  directors: any = [];
  producers: any = [];
  certificate: any = 'U';
  contentAdvisory: any = [];
  isActorsFilled = false; 
  isSupportingActorsFilled = false;
  isDirectorsFilled = false;
  isProducersFilled = false;
  isContentAdvisoryFilled = false;

  /* Trailer Upload */
  trailerUploading: any = false;
  trailerUploadProgress: number = 0;
  trailerObj!: File;
  trailerUrl: any = '';
  deleteTrailerButton: any = false;
  castCrewsubmitted = false;
  castCrewLoading = false;
  
  constructor(
    private kidsmediaService : KidsMediaService,
    private mediauploadService : MediauploadService,
    private kidstvshowService : KidsTvshowService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  SeasonBasicInfo = new FormGroup({
    'seasonNumber' : new FormControl(null, Validators.required),
    'seasonName' : new FormControl(null, Validators.required),
    'releasedDate' : new FormControl(null, Validators.required),
    'seasonDescription' : new FormControl(null, Validators.required),
    'certificate' : new FormControl("U", Validators.required)
  });

  ngOnInit(): void {
    this.seasonId = this.route.snapshot.queryParamMap.get('sId');
    this.tvshowId = this.route.snapshot.queryParamMap.get('tvId');
    this.tvshowName = this.route.snapshot.queryParamMap.get('tvshowName');
    this.getseasondetails();
    this.getcastandcrew();
    this.getvideodata();
  }

  onPortraitPicked(event: Event){
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

  onCoverPicked(event: Event){
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

  basicInformationSubmit() {
    this.basicInfosubmitted = false;
    if (this.SeasonBasicInfo.valid) {
      if (this.portraitImageUrl == '' || this.coverImageUrl == '') {
        this.toastr.error('Please upload portrait & cover image');
      } else {
        const basicInfoData = {
          'seasonId' : this.seasonId,
          'tvshowId' : this.tvshowId,
          'seasonNumber' : this.SeasonBasicInfo.value.seasonNumber,
          'seasonName' : this.SeasonBasicInfo.value.seasonName,
          "releasedDate" : this.SeasonBasicInfo.value.releasedDate.year+'-'+this.SeasonBasicInfo.value.releasedDate.month+'-'+this.SeasonBasicInfo.value.releasedDate.day,
          "seasonDescription" : this.SeasonBasicInfo.value.seasonDescription,
          "certificate" : this.SeasonBasicInfo.value.certificate,
          "portraitImageUrl" : this.portraitImageUrl,
          "coverImageUrl" : this.coverImageUrl
        }
        this.basicInfoLoading = true;
        this.kidstvshowService.addseasondetails(basicInfoData)
        .pipe(first())
        .subscribe(
          res => {
            this.toastr.success(res.success[0]['msg']);
            this.basicInfoLoading = false;
            this.basicInformation = false;
            this.castCrewInformation = true;
          },
          error => {
            this.basicInfoLoading = false;
            this.toastr.error(error.error.errors[0]['msg']);
          });
      }
    } else {
      this.basicInfosubmitted = true;
      this.toastr.error('Please fill all fields');
    }
  }

  validateCastAndCrew() {
    if (this.starring != '') {
      this.isActorsFilled = false; 
    } else {
      this.isActorsFilled = true;
    }
    if (this.supportingActors != '') {
      this.isSupportingActorsFilled = false;
    } else {
      this.isSupportingActorsFilled = true;
    }
    if (this.directors != '') {
      this.isDirectorsFilled = false;
    } else {
      this.isDirectorsFilled = true;
    }
    if (this.producers != '') {
      this.isProducersFilled = false;
    } else {
      this.isProducersFilled = true;
    }
  }

  addContentAdvisory(advisory: any) {
    if(this.contentAdvisory.indexOf(advisory) !== -1) {
      this.contentAdvisory = this.contentAdvisory.filter((items: any) => items !== advisory);
    } else {
      this.isContentAdvisoryFilled = false;
      this.contentAdvisory.push(advisory);
    }
  }

  onTrailerPicked(event: Event) {
    const FILE = (event.target as HTMLInputElement).files![0];
    this.trailerObj = FILE;
    if (FILE.type == 'video/mp4') {
      this.trailerUploading = true;
      const trailerForm = new FormData();
      trailerForm.append('trailerUpload', this.trailerObj);
      trailerForm.append('mediaId', this.seasonId);
      this.mediauploadService.kidsuploadtrailer(trailerForm)
      .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              //console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              //console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.trailerUploadProgress = Math.round(event.loaded / event.total! * 100);
              // console.log(`Uploaded! ${this.movieUploadProgress}%`);
              break;
            case HttpEventType.Response:
              this.trailerUrl = event.body.trailerLocation;
              this.toastr.success('Trailer successfully uploaded'); 
              this.trailerUploadProgress = 0;
              this.trailerUploading = false;
              this.deleteTrailerButton = true; 
              // const reader = new FileReader();
              // reader.onload = () => {
              //   this.audioUrl = reader.result as string;
              // }
              // reader.readAsDataURL(FILE)
          }
        },(err:HttpErrorResponse)=>{
          // this.audioUploadProgress = 0;
          // this.audioUploading = false;
          //this.audioUrl = "";
          this.toastr.error(err.error.errors[0]['msg']);
        });
    } else {
      this.toastr.error("Plese upload .mp4 format");
    }
  }

  deleteTrailer(seasonId: any) {
    const data = {'mediaId' : seasonId}
    this.kidsmediaService.deletetrailer(data)
    .pipe(first())
    .subscribe(
      res => {
        this.trailerUrl = '';
        this.trailerUploading = false;
        this.toastr.success(res.success[0]['msg']);
        if (this.trailerUrl == '') {
          this.deleteTrailerButton = false;
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  trailerClose() {
   
  }

  castCrewInformationSubmit() {
    if (this.starring == '') {
      this.isActorsFilled = true;
    } else {
      this.isActorsFilled = false;
    }
    if (this.supportingActors == '') {
      this.isSupportingActorsFilled = true;
    } else {
      this.isSupportingActorsFilled = false;
    }
    if (this.directors == '') {
      this.isDirectorsFilled = true;
    } else {
      this.isDirectorsFilled = false;
    }
    if (this.producers == '') {
      this.isProducersFilled = true;
    } else {
      this.isProducersFilled = false;
    }
    if (this.contentAdvisory == '') {
      this.isContentAdvisoryFilled = true;
    } else {
      this.isContentAdvisoryFilled = false;
    }
    if (this.starring != '' && this.supportingActors != '' && this.directors != '' && this.producers != '') {
      const castCrewData = {
        "tvshowId" : this.tvshowId,
        "seasonId" : this.seasonId,
        "starring" : this.starring,
        "supportActors" : this.supportingActors,
        "directors" : this.directors,
        "producers" : this.producers,
        "certificate" : this.SeasonBasicInfo.value.certificate,
        "contentAdvisory" : this.contentAdvisory,
        "type": 'Season'
      }
      this.kidstvshowService.addseasoncastcrewdetails(castCrewData)
      .pipe(first())
      .subscribe(
        res => {
          this.toastr.success(res.success[0]['msg']);
          this.castCrewLoading = true;
          this.router.navigate(['/media/kids/tvshows/season'],{queryParams: {tvId: this.tvshowId, tvshowName: this.tvshowName}});
        },
        error => {
          this.castCrewLoading = false;
          this.toastr.error(error.error.errors[0]['msg']);
        });
    } else {
      this.toastr.error('Please fill all fields');
    }
  }
  castCrewInformationBack() {
    this.castCrewInformation = false;
    this.basicInformation = true;
  }

  /*get methods start*/
  getseasondetails() {
    this.kidstvshowService.getseasondetails(this.seasonId,this.tvshowId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data[0] != '' && res.data[0] != undefined) {
          this.SeasonBasicInfo.setValue({
            'seasonNumber' : res.data[0]['season_number'],
            'seasonName' : res.data[0]['season_name'],
            'releasedDate': res.data[0]['released_date'],
            'seasonDescription': res.data[0]['description'],
            'certificate': res.data[0]['certificate'],
          });
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
  getcastandcrew() {
    this.kidsmediaService.getcastandcrew(this.seasonId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data[0] != '' && res.data[0] != undefined) {
          this.starring = res.data[0]['starring'].split(',');
          this.supportingActors = res.data[0]['supporting_actors'].split(',');
          this.directors = res.data[0]['directors'].split(',');
          this.producers = res.data[0]['producers'].split(',');
          this.contentAdvisory = res.data[0]['content_advisory'].split(',');
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getvideodata() {
    this.kidsmediaService.getvideodata(this.seasonId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data.trailer_video_source != undefined && res.data.trailer_video_source != null) {
          this.trailerUrl = res.data.trailer_video_source;
          this.deleteTrailerButton = true;
        }
        else {
          this.deleteTrailerButton = false;
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }
}
