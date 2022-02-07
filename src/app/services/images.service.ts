import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) {}

  uploadImage(): void {

  }

  getImages(): void {

  }

  getImageById(iid: string): void {

  }

  getRawImageById(iid: string): void {

  }

  update_image(iid: string): void {

  }

  deleteImageById(iid: string): void {

  }
}
