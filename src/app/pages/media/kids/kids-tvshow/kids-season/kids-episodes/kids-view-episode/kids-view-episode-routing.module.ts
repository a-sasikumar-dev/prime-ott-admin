import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsViewEpisodeComponent } from './kids-view-episode.component';

const routes: Routes = [
  {
    path: '',
    component: KidsViewEpisodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsViewEpisodeRoutingModule { }
