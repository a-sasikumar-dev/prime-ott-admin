import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsTvshowComponent } from './kids-tvshow.component';

const routes: Routes = [
  {
    path: '',
    component: KidsTvshowComponent
  },
  {
    path: 'view-tvshow',
    loadChildren: () => import('./kids-view-tvshow/kids-view-tvshow.module').then(module => module.KidsViewTvshowModule)
  },
  {
    path: 'update-tvshow',
    loadChildren: () => import('./kids-add-tvshow/kids-add-tvshow.module').then(module => module.KidsAddTvshowModule)
  },
  {
    path: 'season',
    loadChildren: () => import('./kids-season/kids-season.module').then(module => module.KidsSeasonModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsTvshowRoutingModule { }
