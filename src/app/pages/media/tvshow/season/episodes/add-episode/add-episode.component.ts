import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TvshowService } from 'src/app/services/tvshow.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { MediauploadService } from 'src/app/services/mediaupload.service';
import { MediaService } from 'src/app/services/media.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: ['./add-episode.component.css']
})
export class AddEpisodeComponent implements OnInit {

  tvshowId: any;
  seasonId: any;
  episodeId: any;
  tvshowName: any = '';
  seasonName: any = '';
  seasonNumber: any = '';
  basicInformation = true;
  uploadInformation = false;
  formLoading = false;

  releasedDate!: NgbDateStruct;
  certificate: any = 'U';
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

  /* Episode Upload */
  episodeUploading: any = false;
  episodeUploadProgress: number = 0;
  episodeObj!: File;
  episodeUrl: any = '';
  deleteVideoButton: any = false;
  runningHour: any = '';
  isRunningHourFilled = false;
  runningMinute: any = '';
  isRunningMinuteFilled = false;
  formsubmitted = false;

  /*audio start*/
  audioUploading: any = false;
  audioUploadProgress: number = 0;
  audioObj!: File;
  audioUrl: any = '';
  audioLang: any = 'English';
  audioArray: any = [];
  audioFileName: any = '';
  audioLangArray: any = [];
  /*audio end*/

  /*subtitle start*/
  subtitleUploading: any = false;
  subtitleUploadProgress: number = 0;
  subtitleObj!: File;
  subtitleUrl: any = '';
  subtitleLang: any = 'English';
  subtitleArray: any = [];
  subtitleFileName: any = '';
  subtitleLangArray: any = [];
  /*subtitle end*/

  constructor(
    private mediauploadService : MediauploadService,
    private toastr : ToastrService,
    private tvshowService : TvshowService,
    private mediaService : MediaService,
    private route: ActivatedRoute,
    private router : Router 
  ) { }

  EpisodeBasicInfo = new FormGroup({
    'episodeNumber' : new FormControl(null, Validators.required),
    'episodeName' : new FormControl(null, Validators.required),
    'releasedDate' : new FormControl(null, Validators.required),
    'episodeDescription' : new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    this.episodeId = this.route.snapshot.queryParamMap.get('eId');
    this.seasonId = this.route.snapshot.queryParamMap.get('sId');
    this.tvshowId = this.route.snapshot.queryParamMap.get('tvId');
    this.tvshowName = this.route.snapshot.queryParamMap.get('tvshowName');
    this.seasonName = this.route.snapshot.queryParamMap.get('seasonName');
    this.getseasonnumber();
    this.getepisodedetails();
    this.getaudios();
    this.getsubtitles();
    this.getvideodata();
  }

  getseasonnumber() {
    this.tvshowService.getseasonnumber(this.seasonId,this.tvshowId)
    .pipe(first())
    .subscribe(
      res => {
        this.seasonNumber = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
    });
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
    this.coverUploading = false;
  }

  basicInformationSubmit() {
    this.basicInfosubmitted = false;
    if (this.EpisodeBasicInfo.valid) {
      if (this.portraitImageUrl == '' || this.coverImageUrl == '') {
        this.toastr.error('Please upload portrait & cover image');
      } else {
        const basicInfoData = {
          'episodeId' : this.episodeId,
          'seasonId' : this.seasonId,
          'tvshowId' : this.tvshowId,
          'seasonNumber' : this.seasonNumber,
          'episodeNumber' : this.EpisodeBasicInfo.value.episodeNumber,
          'episodeName' : this.EpisodeBasicInfo.value.episodeName,
          'releasedDate' : this.EpisodeBasicInfo.value.releasedDate.year+'-'+this.EpisodeBasicInfo.value.releasedDate.month+'-'+this.EpisodeBasicInfo.value.releasedDate.day,
          "episodeDescription" : this.EpisodeBasicInfo.value.episodeDescription,
          "certificate" : this.certificate,
          "portraitImageUrl" : this.portraitImageUrl,
          "coverImageUrl" : this.coverImageUrl
        }
        this.basicInfoLoading = true;
        this.tvshowService.addepisodedetails(basicInfoData)
        .pipe(first())
        .subscribe(
          res => {
            this.toastr.success(res.success[0]['msg']);
            this.basicInfoLoading = false;
            this.uploadInformation = true;
            this.basicInformation = false; 
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

  uploadInformationBack() {
    this.uploadInformation = false;
    this.basicInformation = true;
  }

  onVideoPicked(event: Event) {
    if (this.runningHour !== '' && this.runningMinute !== '') {
      const FILE = (event.target as HTMLInputElement).files![0];
      this.episodeObj = FILE;
      if (FILE.type == 'video/mp4') {
        this.episodeUploading = true;
        const videoForm = new FormData();
        videoForm.append('videoUpload', this.episodeObj);
        videoForm.append('mediaId', this.episodeId);
        videoForm.append('type', 'Episode');
        videoForm.append('runningHour', this.runningHour);
        videoForm.append('runningMinute', this.runningMinute);
        this.mediauploadService.uploadvideo(videoForm)
        .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                //console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                //console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
                this.episodeUploadProgress = Math.round(event.loaded / event.total! * 100);
                // console.log(`Uploaded! ${this.movieUploadProgress}%`);
                break;
              case HttpEventType.Response:
                this.episodeUrl = event.body.videoLocation;
                this.toastr.success('Video successfully uploaded'); 
                this.episodeUploadProgress = 0;
                this.episodeUploading = false;
                this.deleteVideoButton = true; 
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
      
    } else {
      this.isRunningHourFilled = true;
      this.isRunningMinuteFilled = true;
      this.toastr.error('Please fill running hour and minutes');
    }
  }

  deleteVideo(episodeId: any) {
    const data = {'mediaId' : episodeId}
    this.mediaService.deletevideo(data)
    .pipe(first())
    .subscribe(
      res => {
        this.episodeUrl = '';
        this.episodeUploading = false;
        this.toastr.success(res.success[0]['msg']);
        if (this.episodeUrl == '') {
          this.deleteVideoButton = false;
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  episodeClose() {
  }

  /*Audio Upload Start*/
  setAudioLang(event : any) {
    this.audioLang = event.target.value;
    // if(this.audioArray.indexOf(0) == this.audioArray.indexOf(0)) {
    //   this.toastr.error('Language Already Selected');
    // }
  }

  onAudioPicked(event: Event) {
    const FILE = (event.target as HTMLInputElement).files![0];
    this.audioObj = FILE;
    const audioForm = new FormData();
    audioForm.append('audio', this.audioObj);
    audioForm.append('mediaId', this.episodeId);
    audioForm.append('tvshowId', this.tvshowId);
    audioForm.append('seasonId', this.seasonId);
    audioForm.append('audioLang', this.audioLang);
    audioForm.append('type', 'TVShow');
    this.mediauploadService.uploadaudio(
      audioForm
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            //console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            //console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.audioUploading = true;
            this.audioUploadProgress = Math.round(event.loaded / event.total! * 100);
            //console.log(`Uploaded! ${this.portraitUploadProgress}%`);
            break;
          case HttpEventType.Response:
            //this.audioUrl = event.body.audioLocation;
            this.audioLangArray.push(event.body.audioData.audioLang);
            this.audioArray.push({"audio_id" : event.body.audioData.audioId, "audio_file_name" : event.body.audioData.audioFileName, "audio_lang" : event.body.audioData.audioLang})
            this.toastr.success('Audio successfully uploaded'); 
            this.audioUploadProgress = 0;
            this.audioUploading = false;
            // const reader = new FileReader();
            // reader.onload = () => {
            //   this.audioUrl = reader.result as string;
            // }
            // reader.readAsDataURL(FILE)
        }
      },(err:HttpErrorResponse)=>{
        this.audioUploadProgress = 0;
        this.audioUploading = false;
        //this.audioUrl = "";
        this.toastr.error(err.error.errors[0]['msg']);
      });
  }

  deleteAudio(audioId : any, audioLang: any) {
    const data = {
      "audioId" : audioId
    }
    this.mediaService.deleteaudio(data)
    .pipe(first())
    .subscribe(
      res => {
        // get index of object with audioId
        const removeIndex = this.audioArray.findIndex( (item: any) => item.audio_id === audioId );
        // remove object
        this.audioArray.splice( removeIndex, 1 );
        this.audioLangArray = this.audioLangArray.filter((items: any) => items !== audioLang);
        this.toastr.success(res.success[0]['msg']);
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }
  /*Audio Upload End*/

  /*Subtitle Upload Start*/
  setSubtitleLang(event: any) {
    this.subtitleLang = event.target.value;
    // if(this.subtitleArray.indexOf(0) == this.subtitleArray.indexOf(0)) {
    //   this.toastr.error('Language Already Selected');
    // }
  }
  onSubtitlePicked(event: Event) {
    const FILE = (event.target as HTMLInputElement).files![0];
    this.subtitleObj = FILE;
    const subtitleForm = new FormData();
    subtitleForm.append('subtitle', this.subtitleObj);
    subtitleForm.append('mediaId', this.episodeId);
    subtitleForm.append('tvshowId', this.tvshowId);
    subtitleForm.append('seasonId', this.seasonId);
    subtitleForm.append('subtitleLang', this.subtitleLang);
    subtitleForm.append('type', 'TVShow');
    this.mediauploadService.uploadsubtitle(
      subtitleForm
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            //console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            //console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.subtitleUploading = true;
            this.subtitleUploadProgress = Math.round(event.loaded / event.total! * 100);
            //console.log(`Uploaded! ${this.portraitUploadProgress}%`);
            break;
          case HttpEventType.Response:
            this.subtitleLangArray.push(event.body.subtitleData.subtitleLang);
            this.subtitleArray.push({"subtitle_id" : event.body.subtitleData.subtitleId, "subtitle_file_name" : event.body.subtitleData.subtitleFileName, "subtitle_lang" : event.body.subtitleData.subtitleLang})
            this.toastr.success('Subtitle successfully uploaded'); 
            this.subtitleUploadProgress = 0;
            this.subtitleUploading = false;
        }
      },(err:HttpErrorResponse)=>{
        this.subtitleUploadProgress = 0;
        this.subtitleUploading = false;
        this.toastr.error(err.error.errors[0]['msg']);
      });
  }
  deleteSubtitle(subtitleId : any, subtitleLang: any) {
    const data = {
      "subtitleId" : subtitleId
    }
    this.mediaService.deletesubtitle(data)
    .pipe(first())
    .subscribe(
      res => {
        // get index of object with subtitleId
        const removesubIndex = this.subtitleArray.findIndex( (item: any) => item.subtitle_id === subtitleId );
        // remove object
        this.subtitleArray.splice( removesubIndex, 1 );
        this.subtitleLangArray = this.subtitleLangArray.filter((items: any) => items !== subtitleLang);
        this.toastr.success(res.success[0]['msg']);
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }
  /*Subtitle Upload End*/

  runningHrChange(runningHour : any) {
    if (runningHour != null) {
      this.isRunningHourFilled = false;
    } else {
      this.isRunningHourFilled = true;
    }
  }
  runningMinChange(runningMinute : any) {
    if (runningMinute != null) {
      this.isRunningMinuteFilled = false;
    } else {
      this.isRunningMinuteFilled = true;
    }
  }

  submitForm() {
    const data = {
      "mediaId" : this.episodeId,
      "runningHour" : this.runningHour,
      "runningMinute" : this.runningMinute
    }
    this.mediauploadService.updaterunningtime(data)
    .pipe(first())
    .subscribe(
      res => {
        if (this.runningHour == '' || this.runningHour == null) {
          this.isRunningHourFilled = true;
        } else {
          this.isRunningHourFilled = false;
        }
        if (this.runningMinute == '' || this.runningMinute == null) {
          this.isRunningMinuteFilled = true;
        } else {
          this.isRunningMinuteFilled = false;
        }
        if (this.episodeUrl == '') {
          this.toastr.error('Please upload episode');
        }
        if (this.runningHour !== '' && this.runningMinute !== '' && this.episodeUrl !== '' && this.runningHour !== null && this.runningMinute !== null) {
          this.formLoading = true;
          this.toastr.success('Episode successfully updated');
          this.router.navigate(['/media/tvshows/season/episodes'],{queryParams: {sId: this.seasonId, tvId: this.tvshowId, tvshowName: this.tvshowName, seasonName: this.seasonName}});
        } else {
          this.toastr.error('Please fill all details');
        }
    });
  }

  /* get method start */
  getepisodedetails() {
    this.tvshowService.getepisodedetails(this.episodeId, this.seasonId, this.tvshowId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data[0] != '' && res.data[0] != undefined) {
          this.EpisodeBasicInfo.setValue({
            'episodeNumber' : res.data[0]['episode_number'],
            'episodeName' : res.data[0]['episode_name'],
            'releasedDate': res.data[0]['released_date'],
            'episodeDescription': res.data[0]['description']
          });
          let date = (new Date(res.data[0]['released_date'])).toISOString().split('T')[0];
          let dateres = date.split("-");
          let ayear = parseInt(dateres[0]);
          let amonth = parseInt(dateres[1]);
          let adate = parseInt(dateres[2]);
          this.releasedDate = {year: ayear, month: amonth, day: adate};
          this.certificate = res.data[0]['certificate'];
          this.portraitImageUrl = res.data[0]['poster'];
          this.coverImageUrl = res.data[0]['cover'];
        } 
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getaudios() {
    this.mediaService.getaudios(this.episodeId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data != '' && res.data != undefined) {
          this.audioArray = res.data;
          this.audioLangArray = _.map(this.audioArray, 'audio_lang');
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  getsubtitles() {
    this.mediaService.getsubtitles(this.episodeId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data != '' && res.data != undefined) {
          this.subtitleArray = res.data;
          this.subtitleLangArray = _.map(this.subtitleArray, 'subtitle_lang');
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }
  getvideodata() {
    this.mediaService.getvideodata(this.episodeId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data != undefined) {
          let runningTime = res.data.running_time.split(" ");
          this.runningHour = runningTime[0];
          this.runningMinute = runningTime[2];

          if (res.data.video_source != undefined && res.data.video_source != null) {
            this.episodeUrl = res.data.video_source;
            this.deleteVideoButton = true;
          }
          else {
            this.deleteVideoButton = false;
          }
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  /*get methods end*/
}
