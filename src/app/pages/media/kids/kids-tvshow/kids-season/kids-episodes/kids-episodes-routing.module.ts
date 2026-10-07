import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsEpisodesComponent } from './kids-episodes.component';

const routes: Routes = [
  {
    path: '',
    component: KidsEpisodesComponent
  },
  {
    path: 'view-episode',
    loadChildren: () => import('./kids-view-episode/kids-view-episode.module').then(module => module.KidsViewEpisodeModule)
  },
  {
    path: 'update-episode',
    loadChildren: () => import('./kids-add-episode/kids-add-episode.module').then(module => module.KidsAddEpisodeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsEpisodesRoutingModule { }
