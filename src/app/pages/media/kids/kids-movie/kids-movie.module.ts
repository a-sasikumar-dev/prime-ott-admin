import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsMovieRoutingModule } from './kids-movie-routing.module';
import { KidsMovieComponent } from './kids-movie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    KidsMovieComponent
  ],
  imports: [
    CommonModule,
    KidsMovieRoutingModule,
    NgbModule,
    FeatherModule,
    InfiniteScrollModule
  ]
})
export class KidsMovieModule { }
