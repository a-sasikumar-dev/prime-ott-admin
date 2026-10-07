import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonComponent } from './season.component';

const routes: Routes = [
  {
    path: '',
    component: SeasonComponent
  },
  {
    path: 'view-season',
    loadChildren: () => import('./view-season/view-season.module').then(module => module.ViewSeasonModule)
  },
  {
    path: 'update-season',
    loadChildren: () => import('./add-season/add-season.module').then(module => module.AddSeasonModule)
  },
  {
    path: 'episodes',
    loadChildren: () => import('./episodes/episodes.module').then(module => module.EpisodesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeasonRoutingModule { }
