import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvshowBannersRoutingModule } from './tvshow-banners-routing.module';
import { TvshowBannersComponent } from './tvshow-banners.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    TvshowBannersComponent
  ],
  imports: [
    CommonModule,
    TvshowBannersRoutingModule,
    NgbModule,
    InfiniteScrollModule,
    FeatherModule
  ]
})
export class TvshowBannersModule { }
