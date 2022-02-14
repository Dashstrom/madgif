import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../constants';
import { Photo } from '../model/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  uploadImage(image: File): void {
    const formData = new FormData();
    formData.append("file", image, image.name);
    this.http.post(API + 'images', formData).subscribe(
      res => { console.log(res); },
      err => { console.error(err); }
    )
  }

  getImages(): any {
    return this.http.get(API + 'images');
  }

  getImageById(iid: string): void {

  }

  getRawImageById(iid: string): void {

  }

  urlRawImageById(iid: string): Observable<SafeUrl> {
    return new Observable(o => {
      console.log("Request " + iid);
      if (iid == null) {
        o.error({status: 400, msg: "Missing public_id"});
        return;
      }
      this.http.get(`${API}images/${iid}/raw`, { responseType: 'blob' }).subscribe(
        res => {
          const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(<any>res));
          o.next(url);
        },
        err => o.error(err),
        () => o.complete()
      );
    });
  }

  updateImage(iid: string): void {

  }

  deleteImageById(iid: string): void {
    this.http.delete(`${API}images/${iid}`).subscribe(
      res => console.log(res),
      err => console.error(err)
    )
  }
}
