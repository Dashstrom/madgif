import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable} from 'rxjs';
import { API } from '../constants';
import { EditQuery } from '../model/gallery.model';
 
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

  getImageById(iid: string): Observable<any> {
    return this.http.get(`${API}images/${iid}`);
  }

  getRawImageById(iid: string): void {

  }

  urlRawImageById(iid: string): Observable<SafeUrl> {
    return new Observable(o => {
      if (iid == null) {
        o.error({status: 400, msg: "Missing public_id"});
        return;
      }
      this.http.get(`${API}images/${iid}/raw`, { responseType: 'blob' }).subscribe(
        res => {
          const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(<any>res));
          o.next(url);
        },
        o.error,
        o.complete
      );
    });
  }

  editImage(iid: string, query: EditQuery): Observable<any> {
    return this.http.post(`${API}images/${iid}/edit`, query);
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
