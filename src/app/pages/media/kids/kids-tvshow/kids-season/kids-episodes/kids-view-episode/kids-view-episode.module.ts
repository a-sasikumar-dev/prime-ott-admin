import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsViewEpisodeRoutingModule } from './kids-view-episode-routing.module';
import { KidsViewEpisodeComponent } from './kids-view-episode.component';
import { FeatherModule } from 'angular-feather';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    KidsViewEpisodeComponent
  ],
  imports: [
    CommonModule,
    KidsViewEpisodeRoutingModule,
    FeatherModule,
    SlickCarouselModule
  ]
})
export class KidsViewEpisodeModule { }
