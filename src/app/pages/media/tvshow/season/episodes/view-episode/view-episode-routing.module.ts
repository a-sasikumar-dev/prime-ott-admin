import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEpisodeComponent } from './view-episode.component';

const routes: Routes = [
  {
    path: '',
    component: ViewEpisodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewEpisodeRoutingModule { }
