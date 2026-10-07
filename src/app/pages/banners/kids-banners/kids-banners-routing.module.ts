import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KidsBannersComponent } from './kids-banners.component';

const routes: Routes = [
  {
    path: '',
    component: KidsBannersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsBannersRoutingModule { }
