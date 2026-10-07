import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsAddEpisodeComponent } from './kids-add-episode.component';

const routes: Routes = [
  {
    path: '',
    component: KidsAddEpisodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsAddEpisodeRoutingModule { }
