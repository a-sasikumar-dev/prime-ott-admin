import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsBannersRoutingModule } from './kids-banners-routing.module';
import { KidsBannersComponent } from './kids-banners.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    KidsBannersComponent
  ],
  imports: [
    CommonModule,
    KidsBannersRoutingModule,
    NgbModule,
    InfiniteScrollModule,
    FeatherModule
  ]
})
export class KidsBannersModule { }
