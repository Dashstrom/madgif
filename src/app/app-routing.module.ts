import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageCreditComponent } from './image-credit/image-credit.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
  {
    path: "gallery",
    pathMatch: "full",
    component: GalleryComponent,
  },
  {
    path: "image-credits",
    pathMatch: "full",
    component: ImageCreditComponent,
  },
  {
    path: 'auth',
    pathMatch: "full",
    component: AuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
