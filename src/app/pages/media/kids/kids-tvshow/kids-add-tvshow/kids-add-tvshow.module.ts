import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsAddTvshowRoutingModule } from './kids-add-tvshow-routing.module';
import { KidsAddTvshowComponent } from './kids-add-tvshow.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    KidsAddTvshowComponent
  ],
  imports: [
    CommonModule,
    KidsAddTvshowRoutingModule,
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
export class KidsAddTvshowModule { }
