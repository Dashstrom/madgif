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
import { GalleryService } from './services/gallery.service';
import { AuthService } from './services/auth.service';
import { ImagesService } from './services/images.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

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
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe,
    GalleryService,
    AuthService,
    ImagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
