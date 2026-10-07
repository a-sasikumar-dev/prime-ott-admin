import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTvshowRoutingModule } from './view-tvshow-routing.module';
import { ViewTvshowComponent } from './view-tvshow.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    ViewTvshowComponent
  ],
  imports: [
    CommonModule,
    ViewTvshowRoutingModule,
    NgbModule,
    FeatherModule,
    SlickCarouselModule
  ]
})
export class ViewTvshowModule { }
