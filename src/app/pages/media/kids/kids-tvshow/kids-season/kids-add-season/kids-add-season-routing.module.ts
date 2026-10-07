import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsAddSeasonComponent } from './kids-add-season.component';

const routes: Routes = [
  {
    path: '',
    component: KidsAddSeasonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsAddSeasonRoutingModule { }
