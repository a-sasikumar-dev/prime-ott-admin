import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsSeasonRoutingModule } from './kids-season-routing.module';
import { KidsSeasonComponent } from './kids-season.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    KidsSeasonComponent
  ],
  imports: [
    CommonModule,
    KidsSeasonRoutingModule,
    NgbModule,
    FeatherModule
  ]
})
export class KidsSeasonModule { }
