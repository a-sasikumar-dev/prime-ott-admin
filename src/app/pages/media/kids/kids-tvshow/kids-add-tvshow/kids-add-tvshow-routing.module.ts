import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsAddTvshowComponent } from './kids-add-tvshow.component';

const routes: Routes = [
  {
    path: '',
    component: KidsAddTvshowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsAddTvshowRoutingModule { }
