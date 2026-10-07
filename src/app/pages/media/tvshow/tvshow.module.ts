import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvshowRoutingModule } from './tvshow-routing.module';
import { TvshowComponent } from './tvshow.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    TvshowComponent
  ],
  imports: [
    CommonModule,
    TvshowRoutingModule,
    NgbModule,
    FeatherModule,
    InfiniteScrollModule
  ]
})
export class TvshowModule { }
