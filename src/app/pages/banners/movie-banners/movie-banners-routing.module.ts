import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieBannersComponent } from './movie-banners.component';

const routes: Routes = [
  {
    path: '',
    component: MovieBannersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieBannersRoutingModule { }
