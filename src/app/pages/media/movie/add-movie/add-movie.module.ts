import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMovieRoutingModule } from './add-movie-routing.module';
import { AddMovieComponent } from './add-movie.component';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule  } from 'angular-feather';
import { NgbModule, NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [
    AddMovieComponent
  ],
  imports: [
    CommonModule,
    AddMovieRoutingModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherModule,
    NgbModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgCircleProgressModule.forRoot({
      "titleFontSize": "22",
      "unitsFontSize": "22",
      "titleColor": "#00000a",
      "unitsColor": "#00000a"
    })
  ]
})
export class AddMovieModule { }
