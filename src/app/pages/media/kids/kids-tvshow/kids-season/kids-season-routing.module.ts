import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsSeasonComponent } from './kids-season.component';

const routes: Routes = [
  {
    path: '',
    component: KidsSeasonComponent
  },
  {
    path: 'view-season',
    loadChildren: () => import('./kids-view-season/kids-view-season.module').then(module => module.KidsViewSeasonModule)
  },
  {
    path: 'update-season',
    loadChildren: () => import('./kids-add-season/kids-add-season.module').then(module => module.KidsAddSeasonModule)
  },
  {
    path: 'episodes',
    loadChildren: () => import('./kids-episodes/kids-episodes.module').then(module => module.KidsEpisodesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsSeasonRoutingModule { }
