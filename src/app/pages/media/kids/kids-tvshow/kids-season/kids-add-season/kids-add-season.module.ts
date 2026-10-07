import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsAddSeasonRoutingModule } from './kids-add-season-routing.module';
import { KidsAddSeasonComponent } from './kids-add-season.component';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    KidsAddSeasonComponent
  ],
  imports: [
    CommonModule,
    KidsAddSeasonRoutingModule,
    TagInputModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherModule,
    NgCircleProgressModule.forRoot({
      "titleFontSize": "22",
      "unitsFontSize": "22",
      "titleColor": "#00000a",
      "unitsColor": "#00000a"
    })
  ]
})
export class KidsAddSeasonModule { }
