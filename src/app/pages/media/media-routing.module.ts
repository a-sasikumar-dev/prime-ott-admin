import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('./movie/movie.module').then(module => module.MovieModule)
  },
  {
    path: 'tvshows',
    loadChildren: () => import('./tvshow/tvshow.module').then(module => module.TvshowModule)
  },
  {
    path: 'kids',
    loadChildren: () => import('./kids/kids.module').then(module => module.KidsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
