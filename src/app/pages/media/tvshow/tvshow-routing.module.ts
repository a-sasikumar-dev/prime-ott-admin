import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvshowComponent } from './tvshow.component';

const routes: Routes = [
  {
    path: '',
    component: TvshowComponent
  },
  {
    path: 'view-tvshow',
    loadChildren: () => import('./view-tvshow/view-tvshow.module').then(module => module.ViewTvshowModule)
  },
  {
    path: 'update-tvshow',
    loadChildren: () => import('./add-tvshow/add-tvshow.module').then(module => module.AddTvshowModule)
  },
  {
    path: 'season',
    loadChildren: () => import('./season/season.module').then(module => module.SeasonModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvshowRoutingModule { }
