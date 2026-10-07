import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodesComponent } from './episodes.component';

const routes: Routes = [
  {
    path: '',
    component: EpisodesComponent
  },
  {
    path: 'view-episode',
    loadChildren: () => import('./view-episode/view-episode.module').then(module => module.ViewEpisodeModule)
  },
  {
    path: 'update-episode',
    loadChildren: () => import('./add-episode/add-episode.module').then(module => module.AddEpisodeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpisodesRoutingModule { }
