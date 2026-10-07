import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TvshowService } from 'src/app/services/tvshow.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  episodes: any = [];
  tvshowId: any;
  seasonId: any;
  newEpisodeId: any;
  tvshowName: any = '';
  seasonName: any = '';

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private tvshowService : TvshowService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    const curdate = new Date();
    const curtime = curdate.getTime();
    this.newEpisodeId = curtime+Math.random().toString(36).substr(2, 9);
    this.seasonId = this.route.snapshot.queryParamMap.get('sId');
    this.tvshowId = this.route.snapshot.queryParamMap.get('tvId');
    this.tvshowName = this.route.snapshot.queryParamMap.get('tvshowName');
    this.seasonName = this.route.snapshot.queryParamMap.get('seasonName');

    this.tvshowService.getepisodes(this.seasonId, this.tvshowId)
    .pipe(first())
    .subscribe(
      res => {
        this.episodes = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }

  deleteEpisode(episodeId: any, seasonId: any, tvshowId: any) {
    Swal.fire({
      text: 'Please enter "Delete" to delete the epidode.',
      input: 'text',
    }).then((result) => {
      if (result.value == 'Delete') {
        const data = {'episodeId' : episodeId,'seasonId' : seasonId, 'tvshowId' : tvshowId}
        this.tvshowService.deleteEpisode(data)
        .pipe(first())
        .subscribe(
          res => {
            // get index of object with movieId
            const removesubIndex = this.episodes.findIndex( (item: any) => item.episode_id === episodeId );
            // remove object
            this.episodes.splice( removesubIndex, 1 );
            this.toastr.success(res.success[0]['msg']);
          },
          error => {
            this.toastr.error(error.error.errors[0]['msg']);
          });
      }
    });
  }

}
