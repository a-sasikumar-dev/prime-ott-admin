import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsViewTvshowRoutingModule } from './kids-view-tvshow-routing.module';
import { KidsViewTvshowComponent } from './kids-view-tvshow.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    KidsViewTvshowComponent
  ],
  imports: [
    CommonModule,
    KidsViewTvshowRoutingModule,
    NgbModule,
    FeatherModule,
    SlickCarouselModule
  ]
})
export class KidsViewTvshowModule { }
