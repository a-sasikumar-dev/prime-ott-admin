import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KidsMovieService } from 'src/app/services/kids-movie.service';
import { KidsMediaService } from 'src/app/services/kids-media.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kids-view-movie',
  templateUrl: './kids-view-movie.component.html',
  styleUrls: ['./kids-view-movie.component.css']
})
export class KidsViewMovieComponent implements OnInit {

  movieId: any;
  movieUrl: any = '';
  trailerUrl: any = '';
  movieImage: any = '';
  movieName: any = '';
  movieDescription: any = '';
  movieLanguage: any = '';
  releasedyear: any = '';
  certificate: any = '';
  runningHour: any = '';
  runningMinute: any = '';
  movieRunningTime: any = '';
  trailerButton: any = false;

  starring: any = '';
  directors: any = '';
  genres: any = '';
  supportingActors: any = '';
  producers: any = '';
  contentAdvisory: any = '';
  /* audio */
  audioLang: any = '';
  audioData: any = [];
  /* subtitle */
  subtitleLang: any = '';
  subtitleData: any = [];

  constructor(
    private kidsmovieService : KidsMovieService,
    private kidsmediaService : KidsMediaService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.queryParamMap.get('mId');
    this.getmovieviewdetails();
    this.getcastandcrewdetail();
    this.getaudiolang();
    this.getsubtitlelang();
    this.getvideodata();
  }

  /* get movie detail */ 
  getmovieviewdetails() {
    this.kidsmovieService.getmoviedetails(this.movieId)
  .pipe(first())
  .subscribe(
    res => {
      this.movieImage = res.data.cover;
      this.movieName = res.data.movie_name;
      this.movieDescription = res.data.description;
      this.movieLanguage = res.data.native_lang;
      this.releasedyear = res.data.released_date;
    },
    error => {
      this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  /* get cast and crew details */
  getcastandcrewdetail() {
    this.kidsmediaService.getcastandcrewdetail(this.movieId)
  .pipe(first())
  .subscribe(
    res => {
      this.certificate = res.data.certificate;
      this.starring = res.data.starring;
      this.directors = res.data.directors;
      this.genres = res.data.genres;
      this.supportingActors = res.data.supporting_actors;
      this.producers = res.data.producers;
      this.contentAdvisory = res.data.content_advisory;
    },
    error => {
      this.toastr.error(error.error.errors[0]['msg']);
    });
  }

  /* get audio detail*/
  getaudiolang() {
    this.kidsmediaService.getaudiolang(this.movieId)
    .pipe(first())
    .subscribe(
      res => {
        this.audioData = res.data;
        const result = this.audioData.map(function(val : any) {
          return val.audio_lang;
        }).join(', ');
        this.audioLang = result ? result : 'None';
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
    }

  /* get subtitle detail*/
  getsubtitlelang() {
    this.kidsmediaService.getsubtitlelang(this.movieId)
    .pipe(first())
    .subscribe(
      res => {
        this.subtitleData = res.data;
        const result = this.subtitleData.map(function(val : any) {
          return val.subtitle_lang;
        }).join(', ');
        this.subtitleLang = result ? result : 'None';
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
          if (runningTime[0] > 0) {
            this.movieRunningTime = `${runningTime[0]} h ${runningTime[2]} mins`;
          } else {
            this.movieRunningTime = `${runningTime[2]} mins`;
          }
        }
        this.movieUrl = res.data.video_source;
        if (res.data.trailer_video_source != undefined && res.data.trailer_video_source != null) {
          this.trailerButton = true;
          this.trailerUrl = res.data.trailer_video_source;
        } else {
          this.trailerButton = false;
        }
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  /* Video popup */
  openVideoModal(videoModal: any) {
    this.modalService.open(videoModal, { centered: true, size: 'xl' });
  }

  openTrailerModal(trailerModal: any) {
    this.modalService.open(trailerModal, { centered: true, size: 'xl' });
  }

}

