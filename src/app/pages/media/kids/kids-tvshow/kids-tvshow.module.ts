import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsTvshowRoutingModule } from './kids-tvshow-routing.module';
import { KidsTvshowComponent } from './kids-tvshow.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule  } from 'angular-feather';

@NgModule({
  declarations: [
    KidsTvshowComponent
  ],
  imports: [
    CommonModule,
    KidsTvshowRoutingModule,
    NgbModule,
    FeatherModule
  ]
})
export class KidsTvshowModule { }
