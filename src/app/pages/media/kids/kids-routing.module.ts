import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('./kids-movie/kids-movie.module').then(module => module.KidsMovieModule)
  },
  {
    path: 'tvshows',
    loadChildren: () => import('./kids-tvshow/kids-tvshow.module').then(module => module.KidsTvshowModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsRoutingModule { }
