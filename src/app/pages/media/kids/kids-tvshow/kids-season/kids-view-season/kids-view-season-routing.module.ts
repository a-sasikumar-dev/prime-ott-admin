import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsViewSeasonComponent } from './kids-view-season.component';

const routes: Routes = [
  {
    path: '',
    component: KidsViewSeasonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsViewSeasonRoutingModule { }
