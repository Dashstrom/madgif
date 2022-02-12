import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../model/gallery.model';
import { API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  photos: Photo[] = this.getImages();
  /*photos: Photo[] = [
    {
        id: 0,
        imgURL: 'https://cdn.pixabay.com/photo/2021/07/25/12/22/tourist-attraction-6491734_1280.jpg',
        uploadDate: new Date()
    },
    {
        id: 1,
        imgURL: 'https://cdn.pixabay.com/photo/2021/12/18/06/01/sunset-6878021_1280.jpg',
        uploadDate: new Date()
    },
    {
        id: 2,
        imgURL: 'https://cdn.pixabay.com/photo/2022/01/07/07/13/chicago-6921297_1280.jpg',
        uploadDate: new Date()
    },
    {
        id: 3,
        imgURL: 'https://cdn.pixabay.com/photo/2022/01/17/06/38/altai-6943982_1280.jpg',
        uploadDate: new Date()
    },
    {
        id: 4,
        imgURL: 'https://cdn.pixabay.com/photo/2022/01/24/07/52/lizard-6962760_1280.jpg',
        uploadDate: new Date()
    },
    {
        id: 5,
        imgURL: 'https://cdn.pixabay.com/photo/2022/01/21/07/21/ring-tailed-lemur-6954076_1280.jpg',
        uploadDate: new Date()
    },
    {
        id: 6,
        imgURL: 'https://cdn.pixabay.com/photo/2021/11/17/11/02/flowers-6803234_1280.png',
        uploadDate: new Date()
    },
    {
        id: 7,
        imgURL: 'https://wallpaperaccess.com/full/1119015.jpg',
        uploadDate: new Date()
    },
    {
        id: 8,
        imgURL: 'https://cdn.pixabay.com/photo/2022/01/13/10/39/animal-6934928_1280.jpg',
        uploadDate: new Date()
    },
  ];*/

  constructor(private http: HttpClient) {}

  uploadImage(image: File): void {
    const formData = new FormData();
    formData.append("file", image, image.name);
    this.http.post(API + 'images', formData).subscribe(
      res => { console.log(res) },
      err => { console.error(err) }
    )
  }

  getImages(): any {
    return this.http.get(API + 'images');
  }

  getImageById(iid: string): void {

  }

  getRawImageById(iid: string): void {

  }

  updateImage(iid: string): void {

  }

  deleteImageById(iid: string): void {

  }
}
