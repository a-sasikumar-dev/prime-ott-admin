import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTvshowComponent } from './add-tvshow.component';

const routes: Routes = [
  {
    path: '',
    component: AddTvshowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTvshowRoutingModule { }
