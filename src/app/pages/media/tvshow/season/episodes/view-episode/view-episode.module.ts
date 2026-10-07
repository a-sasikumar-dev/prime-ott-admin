import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewEpisodeRoutingModule } from './view-episode-routing.module';
import { ViewEpisodeComponent } from './view-episode.component';
import { FeatherModule } from 'angular-feather';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    ViewEpisodeComponent
  ],
  imports: [
    CommonModule,
    ViewEpisodeRoutingModule,
    FeatherModule,
    SlickCarouselModule
  ]
})
export class ViewEpisodeModule { }
