import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsAddMovieRoutingModule } from './kids-add-movie-routing.module';
import { KidsAddMovieComponent } from './kids-add-movie.component';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule  } from 'angular-feather';
import { NgbModule, NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    KidsAddMovieComponent
  ],
  imports: [
    CommonModule,
    KidsAddMovieRoutingModule,
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
export class KidsAddMovieModule { }
