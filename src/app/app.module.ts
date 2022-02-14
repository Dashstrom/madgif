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
import { AuthService } from './services/auth.service';
import { ImagesService } from './services/images.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { EditionComponent } from './edition/edition.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { UploadImageComponent } from './upload-image/upload-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    MadFooterComponent,
    ImageCreditComponent,
    HomeCarouselComponent,
    HomeLandingInfoComponent,
    AuthComponent,
    HomeLandingInfoComponent,
    EditionComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe,
    AuthService,
    ImagesService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
