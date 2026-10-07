import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsViewTvshowComponent } from './kids-view-tvshow.component';

const routes: Routes = [
  {
    path: '',
    component: KidsViewTvshowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsViewTvshowRoutingModule { }
