import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
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
    return this.http.get(API + 'images').subscribe(
      res => { console.log(res); },
      err => { console.error(err); }
    )
  }

  getImageById(iid: string): void {

  }

  getRawImageById(iid: string): void {

  }

  urlRawImageById(iid: string): Observable<SafeUrl> {
    return this.http.get<Blob>(`${API}images/${iid}/raw`).pipe(
      map(raw => {
        console.log(raw);
        return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(<any>raw))
      })
    );
  }

  updateImage(iid: string): void {

  }

  deleteImageById(iid: string): void {

  }
}
