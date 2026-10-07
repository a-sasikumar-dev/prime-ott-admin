import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannersComponent } from './banners.component';

const routes: Routes = [
  {
    path: '',
    component: BannersComponent
  },
  {
    path: 'movies',
    loadChildren: () => import('./movie-banners/movie-banners.module').then(module => module.MovieBannersModule)
  },
  {
    path: 'tvshows',
    loadChildren: () => import('./tvshow-banners/tvshow-banners.module').then(module => module.TvshowBannersModule)
  },
  {
    path: 'kids',
    loadChildren: () => import('./kids-banners/kids-banners.module').then(module => module.KidsBannersModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule { }
