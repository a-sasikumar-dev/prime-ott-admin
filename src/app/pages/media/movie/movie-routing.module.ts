import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie.component';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent
  },
  {
    path: 'update-movie',
    loadChildren: () => import('./add-movie/add-movie.module').then(module => module.AddMovieModule)
  },
  {
    path: 'view-movie',
    loadChildren: () => import('./view-movie/view-movie.module').then(module => module.ViewMovieModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
