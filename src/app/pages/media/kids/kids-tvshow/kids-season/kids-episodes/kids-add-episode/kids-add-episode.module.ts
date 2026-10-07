import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsAddEpisodeRoutingModule } from './kids-add-episode-routing.module';
import { KidsAddEpisodeComponent } from './kids-add-episode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule  } from 'angular-feather';
import { NgbModule, NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    KidsAddEpisodeComponent
  ],
  imports: [
    CommonModule,
    KidsAddEpisodeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherModule,
    NgbModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgCircleProgressModule.forRoot({
      "titleFontSize": "22",
      "unitsFontSize": "22",
      "titleColor": "#00000a",
      "unitsColor": "#00000a"
    })
  ]
})
export class KidsAddEpisodeModule { }
