import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FeatherModule } from 'angular-feather';
import { GenpipeModule } from 'src/app/genpipe/genpipe.module';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    NgbDropdownModule,
    SlickCarouselModule,
    FeatherModule,
    GenpipeModule,
    NgApexchartsModule
  ]
})
export class DashboardModule { }
