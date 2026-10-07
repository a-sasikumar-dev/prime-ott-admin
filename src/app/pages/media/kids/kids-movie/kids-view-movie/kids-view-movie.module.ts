import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsViewMovieRoutingModule } from './kids-view-movie-routing.module';
import { KidsViewMovieComponent } from './kids-view-movie.component';
import { FeatherModule  } from 'angular-feather';

@NgModule({
  declarations: [
    KidsViewMovieComponent
  ],
  imports: [
    CommonModule,
    KidsViewMovieRoutingModule,
    FeatherModule
  ]
})
export class KidsViewMovieModule { }
