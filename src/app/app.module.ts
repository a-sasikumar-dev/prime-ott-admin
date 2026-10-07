import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { HeaderComponent } from './layout/admin/header/header.component';
import { FooterComponent } from './layout/admin/footer/footer.component';
import { AuthFooterComponent } from './layout/auth/auth-footer/auth-footer.component';
import { SidebarComponent } from './layout/admin/header/sidebar/sidebar.component';
import { TopbarComponent } from './layout/admin/header/topbar/topbar.component';
import { FeatherModule  } from 'angular-feather';
import { IconsModule  } from './icons/icons.module';
import { NgbModule, NgbCollapseModule, NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    AuthFooterComponent,
    SidebarComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FeatherModule,
    IconsModule,
    NgbModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgCircleProgressModule,
    SlickCarouselModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
