import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';

import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MadFooterComponent } from './mad-footer/mad-footer.component';
import { ImageCreditComponent } from './image-credit/image-credit.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
registerLocaleData(localeFr);

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeLandingInfoComponent } from './home-landing-info/home-landing-info.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    MadFooterComponent,
    ImageCreditComponent,
    HomeCarouselComponent,
    HomeLandingInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
