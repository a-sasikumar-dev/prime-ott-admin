import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    NgbModule,
    FeatherModule,
    NgCircleProgressModule.forRoot({
      "titleFontSize": "22",
      "unitsFontSize": "22",
      "titleColor": "#00000a",
      "unitsColor": "#00000a"
    })
  ]
})
export class ProfileModule { }
