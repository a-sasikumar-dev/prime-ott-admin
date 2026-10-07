import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsMovieComponent } from './kids-movie.component';

const routes: Routes = [
  {
    path: '',
    component: KidsMovieComponent
  },
  {
    path: 'update-movie',
    loadChildren: () => import('./kids-add-movie/kids-add-movie.module').then(module => module.KidsAddMovieModule)
  },
  {
    path: 'view-movie',
    loadChildren: () => import('./kids-view-movie/kids-view-movie.module').then(module => module.KidsViewMovieModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsMovieRoutingModule { }
