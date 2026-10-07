import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { MediauploadService } from 'src/app/services/mediaupload.service';
import { KidsMovieService } from 'src/app/services/kids-movie.service';
import { KidsMediaService } from 'src/app/services/kids-media.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-kids-add-movie',
  templateUrl: './kids-add-movie.component.html',
  styleUrls: ['./kids-add-movie.component.css']
})
export class KidsAddMovieComponent implements OnInit {

  movieId: any;
  basicInformation = true;
  genreInformation = false;
  uploadInformation = false;

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
  genre: any = [];
  contentAdvisory: any = [];
  isActorsFilled = false; 
  isSupportingActorsFilled = false;
  isDirectorsFilled = false;
  isProducersFilled = false;
  isGenreFilled = false;
  isContentAdvisoryFilled = false;
  castCrewsubmitted = false;
  castCrewLoading = false;

  /* Movie Upload */
  movieUploading: any = false;
  movieUploadProgress: number = 0;
  movieObj!: File;
  movieUrl: any = '';
  deleteVideoButton: any = false;
  runningHour: any = '';
  isRunningHourFilled = false;
  runningMinute: any = '';
  isRunningMinuteFilled = false;

  /* Trailer Upload */
  trailerUploading: any = false;
  trailerUploadProgress: number = 0;
  trailerObj!: File;
  trailerUrl: any = '';
  deleteTrailerButton: any = false;

  formsubmitted = false;
  formLoading = false;

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


  // var bob = {"sex":"male","age":21};
  // var bill = {"sex":"male","age":21};
  // if(_.isEqual(bob, bill)){
  //     //we are equal
  // }else{
  //   //we are not equal
  // }

  constructor(
    private mediauploadService : MediauploadService,
    private kidsmovieService : KidsMovieService,
    private kidsmediaService : KidsMediaService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private router : Router 
  ) { }

  MovieBasicInfo = new FormGroup({
    'movieName' : new FormControl(null, Validators.required),
    'releasedDate' : new FormControl(null, Validators.required),
    'nativeLang' : new FormControl(null, Validators.required),
    'movieDescription' : new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    this.movieId = this.route.snapshot.queryParamMap.get('mId');
    this.getmoviebasicdetails();
    this.getcastandcrew();
    this.getaudios();
    this.getsubtitles();
    this.getvideodata();
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

  basicInformationSubmit() {
    this.basicInfosubmitted = false;
    if (this.MovieBasicInfo.valid) {
      if (this.portraitImageUrl == '' || this.coverImageUrl == '') {
        this.toastr.error('Please upload portrait & cover image');
      } else {
        const basicInfoData = {
          "movieId" : this.movieId,
          "movieName" : this.MovieBasicInfo.value.movieName, 
          "releasedDate" : this.MovieBasicInfo.value.releasedDate.year+'-'+this.MovieBasicInfo.value.releasedDate.month+'-'+this.MovieBasicInfo.value.releasedDate.day,
          "nativeLang" : this.MovieBasicInfo.value.nativeLang,
          "movieDesc" : this.MovieBasicInfo.value.movieDescription,
          "portraitImageUrl" : this.portraitImageUrl,
          "coverImageUrl" : this.coverImageUrl
        }
        this.basicInfoLoading = true;
        this.kidsmovieService.addmoviebasicdetails(basicInfoData)
        .pipe(first())
        .subscribe(
          res => {
            this.toastr.success(res.success[0]['msg']);
            this.basicInfoLoading = false;
            this.basicInformation = false;
            this.genreInformation = true;
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

  addGenre(gen: any) {
    if(this.genre.indexOf(gen) !== -1) {
      this.genre = this.genre.filter((items: any) => items !== gen);
    } else {
      this.isGenreFilled = false;
      this.genre.push(gen);
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

  genreInformationSubmit() {
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
    if (this.genre == '') {
      this.isGenreFilled = true;
    } else {
      this.isGenreFilled = false;
    }
    if (this.contentAdvisory == '') {
      this.isContentAdvisoryFilled = true;
    } else {
      this.isContentAdvisoryFilled = false;
    }
    if (this.genre != '' && this.starring != '' && this.supportingActors != '' && this.directors != '' && this.producers != '') {
      const castCrewData = {
        "movieId" : this.movieId,
        "starring" : this.starring,
        "supportActors" : this.supportingActors,
        "directors" : this.directors,
        "producers" : this.producers,
        "certificate" : this.certificate,
        "genre" : this.genre,
        "contentAdvisory" : this.contentAdvisory
      }
      this.castCrewLoading = true;
      this.kidsmovieService.addmoviecastcrewdetails(castCrewData)
      .pipe(first())
      .subscribe(
        res => {
          this.toastr.success(res.success[0]['msg']);
          this.castCrewLoading = false;
          this.genreInformation = false;
          this.uploadInformation = true;
        },
        error => {
          this.castCrewLoading = false;
          this.toastr.error(error.error.errors[0]['msg']);
        });
    } else {
      this.toastr.error('Please fill all fields');
    }
  }

  genreInformationBack() {
    this.genreInformation = false;
    this.basicInformation = true;
  }

  uploadInformationBack() {
    this.uploadInformation = false;
    this.genreInformation = true;
  }

  onVideoPicked(event: Event) {
    if (this.runningHour !== '' && this.runningMinute !== '') {
      const FILE = (event.target as HTMLInputElement).files![0];
      this.movieObj = FILE;
      if (FILE.type == 'video/mp4') {
        this.movieUploading = true;
        const videoForm = new FormData();
        videoForm.append('videoUpload', this.movieObj);
        videoForm.append('mediaId', this.movieId);
        videoForm.append('type', 'Movie');
        videoForm.append('runningHour', this.runningHour);
        videoForm.append('runningMinute', this.runningMinute);
        this.mediauploadService.kidsuploadvideo(videoForm)
        .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                //console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                //console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
                this.movieUploadProgress = Math.round(event.loaded / event.total! * 100);
                // console.log(`Uploaded! ${this.movieUploadProgress}%`);
                break;
              case HttpEventType.Response:
                this.movieUrl = event.body.videoLocation;
                this.toastr.success('Video successfully uploaded'); 
                this.movieUploadProgress = 0;
                this.movieUploading = false;
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

  deleteVideo(movieId: any) {
    const data = {'mediaId' : movieId}
    this.kidsmediaService.deletevideo(data)
    .pipe(first())
    .subscribe(
      res => {
        this.movieUrl = '';
        this.movieUploading = false;
        this.toastr.success(res.success[0]['msg']);
        if (this.movieUrl == '') {
          this.deleteVideoButton = false;
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  movieClose() {
    // this.filePreview = false;
    // this.fileUpload = true;
  }

  onTrailerPicked(event: Event) {
    this.trailerUploading = true;
    const FILE = (event.target as HTMLInputElement).files![0];
    this.trailerObj = FILE;
    const trailerForm = new FormData();
    trailerForm.append('trailerUpload', this.trailerObj);
    trailerForm.append('mediaId', this.movieId);
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
  }

  deleteTrailer(movieId: any) {
    const data = {'mediaId' : movieId}
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
    // this.filePreview = false;
    // this.fileUpload = true;
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
    audioForm.append('mediaId', this.movieId);
    audioForm.append('audioLang', this.audioLang);
    audioForm.append('tvshowId', '0');
    audioForm.append('seasonId', '0');
    audioForm.append('type', 'Movie');
    this.mediauploadService.kidsuploadaudio(
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
  // audioCancel() {
  //   this.audioCircleProgress = false;
  //   this.audioUpload = true;
  // }
  deleteAudio(audioId : any, audioLang: any) {
    const data = {
      "audioId" : audioId
    }
    this.kidsmediaService.deleteaudio(data)
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
    subtitleForm.append('mediaId', this.movieId);
    subtitleForm.append('subtitleLang', this.subtitleLang);
    subtitleForm.append('tvshowId', '0');
    subtitleForm.append('seasonId', '0');
    subtitleForm.append('type', 'Movie');
    this.mediauploadService.kidsuploadsubtitle(
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
    this.kidsmediaService.deletesubtitle(data)
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
      "mediaId" : this.movieId,
      "runningHour" : this.runningHour,
      "runningMinute" : this.runningMinute
    }
    this.mediauploadService.kidsupdaterunningtime(data)
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
        if (this.movieUrl == '') {
          this.toastr.error('Please upload movie');
        }
        if (this.runningHour !== '' && this.runningMinute !== '' && this.movieUrl !== '' && this.runningHour !== null && this.runningMinute !== null) {
          this.formLoading = true;
          this.toastr.success('Kids movie successfully updated');
          this.router.navigate(['/media/kids/movies']);
        } else {
          this.toastr.error('Please fill all details');
        }
    });
  }

  /*get methods start*/
  getmoviebasicdetails() {
    this.kidsmovieService.getmoviebasicdetails(this.movieId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data[0] != '' && res.data[0] != undefined) {
          this.MovieBasicInfo.setValue({
            'movieName' : res.data[0]['movie_name'],
            'releasedDate': res.data[0]['released_date'],
            'nativeLang': res.data[0]['native_lang'],
            'movieDescription': res.data[0]['description']
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
    this.kidsmediaService.getcastandcrew(this.movieId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data[0] != '' && res.data[0] != undefined) {
          this.starring = res.data[0]['starring'].split(',');
          this.supportingActors = res.data[0]['supporting_actors'].split(',');
          this.directors = res.data[0]['directors'].split(',');
          this.producers = res.data[0]['producers'].split(',');
          this.genre = res.data[0]['genres'].split(',');
          this.contentAdvisory = res.data[0]['content_advisory'].split(',');
          this.certificate = res.data[0]['certificate'];
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }
  
  getaudios() {
    this.kidsmediaService.getaudios(this.movieId)
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
    this.kidsmediaService.getsubtitles(this.movieId)
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
    this.kidsmediaService.getvideodata(this.movieId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data != undefined) {
          let runningTime = res.data.running_time.split(" ");
          this.runningHour = runningTime[0];
          this.runningMinute = runningTime[2];

          if (res.data.video_source != undefined && res.data.video_source != null) {
            this.movieUrl = res.data.video_source;
            this.deleteVideoButton = true;
          }
          else {
            this.deleteVideoButton = false;
          }
          if (res.data.trailer_video_source != undefined && res.data.trailer_video_source != null) {
            this.trailerUrl = res.data.trailer_video_source;
            this.deleteTrailerButton = true;
          }
          else {
            this.deleteTrailerButton = false;
          }
        }
        
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  /*get methods end*/
}

