import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KidsTvshowService } from 'src/app/services/kids-tvshow.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kids-episodes',
  templateUrl: './kids-episodes.component.html',
  styleUrls: ['./kids-episodes.component.css']
})
export class KidsEpisodesComponent implements OnInit {

  episodes: any = [];
  tvshowId: any;
  seasonId: any;
  newEpisodeId: any;
  tvshowName: any = '';
  seasonName: any = '';

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private kidstvshowService : KidsTvshowService,
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

    this.kidstvshowService.getepisodes(this.seasonId, this.tvshowId)
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
        this.kidstvshowService.deleteEpisode(data)
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