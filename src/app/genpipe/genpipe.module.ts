import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunningtimePipe } from './runningtime.pipe';

@NgModule({
  declarations: [
    RunningtimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RunningtimePipe
  ]
})
export class GenpipeModule { }
