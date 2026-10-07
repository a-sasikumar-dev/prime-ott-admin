import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsViewMovieComponent } from './kids-view-movie.component';

const routes: Routes = [
  {
    path: '',
    component: KidsViewMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsViewMovieRoutingModule { }
