import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewMovieRoutingModule } from './view-movie-routing.module';
import { ViewMovieComponent } from './view-movie.component';
import { FeatherModule  } from 'angular-feather';


@NgModule({
  declarations: [
    ViewMovieComponent
  ],
  imports: [
    CommonModule,
    ViewMovieRoutingModule,
    FeatherModule
  ]
})
export class ViewMovieModule { }
