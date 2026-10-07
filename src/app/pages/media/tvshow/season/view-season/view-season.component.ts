import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TvshowService } from 'src/app/services/tvshow.service';
import { MediaService } from 'src/app/services/media.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-season',
  templateUrl: './view-season.component.html',
  styleUrls: ['./view-season.component.css']
})
export class ViewSeasonComponent implements OnInit {

  tvshowId: any;
  seasonId: any;
  tvshowName: any = '';
  seasonImage : any = '';
  seasonName: any = '';
  releasedDate: any = '';
  seasonCertificate: any = '';
  seasonDescription: any = '';
  trailerUrl: any = '';
  trailerButton: any = false;

  starring: any = '';
  directors: any = '';
  supportingActors: any = '';
  producers: any = '';
  contentAdvisory: any = '';
  allEpisodes: any = [];
  totalEpisodesCount: any = 0;

  constructor(
    private tvshowService : TvshowService,
    private mediaService : MediaService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.seasonId = this.route.snapshot.queryParamMap.get('sId');
    this.tvshowId = this.route.snapshot.queryParamMap.get('tvId');
    this.tvshowName = this.route.snapshot.queryParamMap.get('tvshowName');
    this.getseasonviewdetails();
    this.getcastandcrewdetail();
    this.getallepisodes();
    this.getvideodata();
  }

  /* get season details */
  getseasonviewdetails() {
    this.tvshowService.getseasonviewdetails(this.seasonId, this.tvshowId)
    .pipe(first())
    .subscribe(
      res => {
        this.seasonImage = res.data.cover;
        this.seasonName = res.data.season_name;
        this.seasonCertificate = res.data.certificate;
        this.releasedDate = res.data.released_date;
        this.seasonDescription = res.data.description;
        this.totalEpisodesCount = res.totalepisodes;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  /* season get cast and crew details */
  getcastandcrewdetail() {
    this.mediaService.getcastandcrewdetail(this.seasonId)
    .pipe(first())
    .subscribe(
      res => {
        this.starring = res.data.starring;
        this.directors = res.data.directors;
        this.supportingActors = res.data.supporting_actors;
        this.producers = res.data.producers;
        this.contentAdvisory = res.data.content_advisory;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  /* get all episodes */
  getallepisodes() {
    this.tvshowService.getallepisodes(this.seasonId, this.tvshowId)
    .pipe(first())
      .subscribe(
        res => {
         this.allEpisodes = res.data;
        },
        error => {
          this.toastr.error(error.error.errors[0]['msg']);
        });
  }

  getvideodata() {
    this.mediaService.getvideodata(this.seasonId)
    .pipe(first())
    .subscribe(
      res => {
        this.trailerUrl = res.data.video_source;
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
  openTrailerModal(trailerModal: any) {
    this.modalService.open(trailerModal, { centered: true, size: 'xl' });
  }

}
