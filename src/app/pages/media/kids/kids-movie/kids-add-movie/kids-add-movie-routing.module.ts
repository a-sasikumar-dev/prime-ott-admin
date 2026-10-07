import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsAddMovieComponent } from './kids-add-movie.component';

const routes: Routes = [
  {
    path: '',
    component: KidsAddMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsAddMovieRoutingModule { }
