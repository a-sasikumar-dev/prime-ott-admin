import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSeasonComponent } from './add-season.component';

const routes: Routes = [
  {
    path: '',
    component: AddSeasonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSeasonRoutingModule { }
