import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsEpisodesRoutingModule } from './kids-episodes-routing.module';
import { KidsEpisodesComponent } from './kids-episodes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    KidsEpisodesComponent
  ],
  imports: [
    CommonModule,
    KidsEpisodesRoutingModule,
    NgbModule,
    FeatherModule
  ]
})
export class KidsEpisodesModule { }
