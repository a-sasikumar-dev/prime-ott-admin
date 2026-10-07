import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSeasonComponent } from './view-season.component';

const routes: Routes = [
  {
    path: '',
    component: ViewSeasonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSeasonRoutingModule { }
