import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KidsTvshowService } from 'src/app/services/kids-tvshow.service';
import { KidsMediaService } from 'src/app/services/kids-media.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kids-view-episode',
  templateUrl: './kids-view-episode.component.html',
  styleUrls: ['./kids-view-episode.component.css']
})
export class KidsViewEpisodeComponent implements OnInit {

  tvshowId: any;
  seasonId: any;
  tvshowName: any = '';
  seasonName: any = '';
  episodeId: any;
  episodeUrl: any = '';
  episodeImage : any = '';
  episodeName: any = '';
  episodeNumber: any = '';
  releasedDate: any = '';
  episodeCertificate: any = '';
  episodeDescription: any = '';
  episodeRunningTime: any = '';
  allEpisodes: any = [];
  /* audio */
  audioLang: any = '';
  audioData: any = [];
  /* subtitle */
  subtitleLang: any = '';
  subtitleData: any = [];

  constructor(
    private kidstvshowService : KidsTvshowService,
    private kidsmediaService : KidsMediaService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.episodeId = this.route.snapshot.queryParamMap.get('eId');
    this.seasonId = this.route.snapshot.queryParamMap.get('sId');
    this.tvshowId = this.route.snapshot.queryParamMap.get('tvId');
    this.tvshowName = this.route.snapshot.queryParamMap.get('tvshowName');
    this.seasonName = this.route.snapshot.queryParamMap.get('seasonName');
    this.getepisodeviewdetails();
    this.getallviewepisodes();
    this.getaudiolang();
    this.getsubtitlelang();
    this.getvideodata();
  }

  /* get episode details */
  getepisodeviewdetails() {
    this.kidstvshowService.getepisodeviewdetails(this.episodeId, this.seasonId, this.tvshowId)
    .pipe(first())
    .subscribe(
      res => {
        this.episodeImage = res.data.cover;
        this.episodeNumber = res.data.episode_number;
        this.episodeName = res.data.episode_name;
        this.episodeCertificate = res.data.certificate;
        this.releasedDate = res.data.released_date;
        this.episodeDescription = res.data.description;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  /* get all episodes */
  getallviewepisodes() {
    this.kidstvshowService.getallviewepisodes(this.episodeId, this.seasonId, this.tvshowId)
    .pipe(first())
      .subscribe(
        res => {
         this.allEpisodes = res.data
        },
        error => {
          this.toastr.error(error.error.errors[0]['msg']);
        });
  }

  /* get audio detail*/
  getaudiolang() {
    this.kidsmediaService.getaudiolang(this.episodeId)
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
    this.kidsmediaService.getsubtitlelang(this.episodeId)
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
    this.kidsmediaService.getvideodata(this.episodeId)
    .pipe(first())
    .subscribe(
      res => {
        if (res.data != undefined) {
          let runningTime = res.data.running_time.split(" ");
          if (runningTime[0] > 0) {
            this.episodeRunningTime = `${runningTime[0]} h ${runningTime[2]} mins`;
          } else {
            this.episodeRunningTime = `${runningTime[2]} mins`;
          }
        }
        this.episodeUrl = res.data.video_source;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  /* Video popup */
  openVideoModal(videoModal: any) {
    this.modalService.open(videoModal, { centered: true, size: 'xl' });
  }

  episodeSlideConfig = {
    "infinite": false,
    "draggable": true, 
    "loop": false,
    "slidesToShow": 6, 
    "slidesToScroll": 6,
    responsive: [     
      {
        breakpoint: 1700,
        settings: {
          "slidesToShow": 4,
          "slidesToScroll": 4
        },
      },   
      {
        breakpoint: 1199,
        settings: {
          "slidesToShow": 3,
          "slidesToScroll": 3
        },
      },                      
      {
        breakpoint: 767,
        settings: {
          "slidesToShow": 2,
          "slidesToScroll": 2
        },
      },
      {
        breakpoint: 576,
        settings: {
          "slidesToShow": 1,
          "slidesToScroll": 1
        },
      }
    ]
  };

}