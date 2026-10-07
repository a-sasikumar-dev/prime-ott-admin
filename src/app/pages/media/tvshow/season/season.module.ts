import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonRoutingModule } from './season-routing.module';
import { SeasonComponent } from './season.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    SeasonComponent
  ],
  imports: [
    CommonModule,
    SeasonRoutingModule,
    NgbModule,
    FeatherModule
  ]
})
export class SeasonModule { }
