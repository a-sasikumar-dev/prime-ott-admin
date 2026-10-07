import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KidsTvshowService } from 'src/app/services/kids-tvshow.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kids-season',
  templateUrl: './kids-season.component.html',
  styleUrls: ['./kids-season.component.css']
})
export class KidsSeasonComponent implements OnInit {

  season: any = [];
  tvshowId: any;
  tvshowName: any = '';
  newSeasonId: any;

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private kidstvshowService : KidsTvshowService,
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
    const curdate = new Date();
    const curtime = curdate.getTime();
    this.newSeasonId = curtime+Math.random().toString(36).substr(2, 9);
    this.tvshowId = this.route.snapshot.queryParamMap.get('tvId');
    this.tvshowName = this.route.snapshot.queryParamMap.get('tvshowName');
    
    this.kidstvshowService.getseason(this.tvshowId)
    .pipe(first())
    .subscribe(
      res => {
        this.season = res.data;
      },
      error => {
        this.toastr.error(error.error.errors[0]['msg']);
      });
  }
  
  deleteSeason(seasonId: any, tvshowId: any) {
    Swal.fire({
      text: 'Please enter "Delete" to delete the season.',
      input: 'text',
    }).then((result) => {
      if (result.value == 'Delete') {
        const data = {'seasonId' : seasonId, 'tvshowId' : tvshowId}
        this.kidstvshowService.deleteseason(data)
        .pipe(first())
        .subscribe(
          res => {
            // get index of object with movieId
            const removesubIndex = this.season.findIndex( (item: any) => item.season_id === seasonId );
            // remove object
            this.season.splice( removesubIndex, 1 );
            this.toastr.success(res.success[0]['msg']);
          },
          error => {
            this.toastr.error(error.error.errors[0]['msg']);
          });
      }
    });
  }

}