import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsViewSeasonRoutingModule } from './kids-view-season-routing.module';
import { KidsViewSeasonComponent } from './kids-view-season.component';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    KidsViewSeasonComponent
  ],
  imports: [
    CommonModule,
    KidsViewSeasonRoutingModule,
    FeatherModule
  ]
})
export class KidsViewSeasonModule { }
