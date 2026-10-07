import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTvshowRoutingModule } from './add-tvshow-routing.module';
import { AddTvshowComponent } from './add-tvshow.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AddTvshowComponent
  ],
  imports: [
    CommonModule,
    AddTvshowRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FeatherModule,
    NgCircleProgressModule.forRoot({
      "titleFontSize": "22",
      "unitsFontSize": "22",
      "titleColor": "#00000a",
      "unitsColor": "#00000a"
    })
  ]
})
export class AddTvshowModule { }
