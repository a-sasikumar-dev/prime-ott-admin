import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTvshowComponent } from './view-tvshow.component';

const routes: Routes = [
  {
    path: '',
    component: ViewTvshowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTvshowRoutingModule { }
