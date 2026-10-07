import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvshowBannersComponent } from './tvshow-banners.component';

const routes: Routes = [
  {
    path: '',
    component: TvshowBannersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvshowBannersRoutingModule { }
