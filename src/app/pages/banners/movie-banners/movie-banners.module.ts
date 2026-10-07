import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieBannersRoutingModule } from './movie-banners-routing.module';
import { MovieBannersComponent } from './movie-banners.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    MovieBannersComponent
  ],
  imports: [
    CommonModule,
    MovieBannersRoutingModule,
    NgbModule,
    InfiniteScrollModule,
    FeatherModule
  ]
})
export class MovieBannersModule { }
