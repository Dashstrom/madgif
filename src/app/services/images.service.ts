import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  uploadImage(): void {

  }

  getImages(): void {

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
