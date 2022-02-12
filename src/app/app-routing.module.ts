import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageCreditComponent } from './image-credit/image-credit.component';
import { EditionComponent } from './edition/edition.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent,
  },
  {
    path: "gallery",
    canActivate: [AuthGuard],
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
  },
  {
    path: "edition",
    canActivate: [AuthGuard],
    pathMatch: "full",
    component: EditionComponent,
  },
  {
    path: "edition/:id",
    canActivate: [AuthGuard],
    pathMatch: "full",
    component: EditionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
