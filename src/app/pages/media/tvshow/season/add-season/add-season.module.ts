import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSeasonRoutingModule } from './add-season-routing.module';
import { AddSeasonComponent } from './add-season.component';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AddSeasonComponent
  ],
  imports: [
    CommonModule,
    AddSeasonRoutingModule,
    NgbModule,
    TagInputModule,
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
export class AddSeasonModule { }
