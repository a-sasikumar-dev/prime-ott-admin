import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KidsTvshowService } from 'src/app/services/kids-tvshow.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kids-view-tvshow',
  templateUrl: './kids-view-tvshow.component.html',
  styleUrls: ['./kids-view-tvshow.component.css']
})
export class KidsViewTvshowComponent implements OnInit {

  tvshowId: any;
  allSeasons: any = [];
  allEpisodes: any = [];
  tvshowImage: any = '';
  tvshowName: any = '';
  tvshowDescription: any = '';
  tvshowLanguage: any = '';
  genres: any = '';

  totalSeasons: any = 0;
  totalEpisodes: any = 0;
  totalSeasonEpisodesCount: any = 0;

  trailerUrl: any = '';

  constructor(
    private kidstvshowService : KidsTvshowService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.tvshowId = this.route.snapshot.queryParamMap.get('tvId');
      this.gettvshowviewdetails();
      this.getallseasons();
  }

  /* get tvshow details */
  gettvshowviewdetails() {
    this.kidstvshowService.gettvshowviewdetails(this.tvshowId)
    .pipe(first())
    .subscribe(
      res => {
        this.tvshowImage = res.data.cover;
        this.tvshowName = res.data.tvshow_name;
        this.tvshowDescription = res.data.description;
        this.tvshowLanguage = res.data.native_lang;
        this.genres = res.data.genres;
        this.totalSeasons = res.totalseasons;
        this.totalEpisodes = res.totalepisodes;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  /* get all seasons */
  getallseasons() {
    this.kidstvshowService.getallseasons(this.tvshowId)
      .pipe(first())
      .subscribe(
        res => {
          this.allSeasons = res.data;
          if (res.data != '') {
            this.getallepisodes(res.data[0]['season_id'])
          }
        },
        error => {
          this.toastr.error(error.error.errors[0]['msg']);
        });
  }

/* get all episodes */
  getallepisodes(seasonId: any) {
    this.kidstvshowService.getallepisodes(seasonId, this.tvshowId)
    .pipe(first())
      .subscribe(
        res => {
         this.allEpisodes = res.data;
         this.totalSeasonEpisodesCount = res.seasontotalepisodes;
        },
        error => {
          this.toastr.error(error.error.errors[0]['msg']);
        });
  }

  /* Video popup */
  openTrailerModal(trailerModal: any, trailerurl: any) {
    this.trailerUrl = trailerurl;
    this.modalService.open(trailerModal, { centered: true, size: 'xl' });
  }

  /* carousel slider */
  seasonSlideConfig = {
    "infinite": false,
    "draggable": true, 
    "loop": false,
    "slidesToShow": 3, 
    "slidesToScroll": 3,
    "variableWidth": true,
    responsive: [     
      {
        breakpoint: 1700,
        settings: {
          "slidesToShow": 2,
          "slidesToScroll": 2
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