import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    NgbModule,
    FeatherModule,
    InfiniteScrollModule
  ]
})
export class MovieModule { }
