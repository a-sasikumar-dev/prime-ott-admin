import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSeasonRoutingModule } from './view-season-routing.module';
import { ViewSeasonComponent } from './view-season.component';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    ViewSeasonComponent
  ],
  imports: [
    CommonModule,
    ViewSeasonRoutingModule,
    FeatherModule
  ]
})
export class ViewSeasonModule { }
