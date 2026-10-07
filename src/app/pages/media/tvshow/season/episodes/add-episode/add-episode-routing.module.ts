import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEpisodeComponent } from './add-episode.component';

const routes: Routes = [
  {
    path: '',
    component: AddEpisodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEpisodeRoutingModule { }
