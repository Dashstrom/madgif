import { Component, OnInit } from '@angular/core';
import { Photo } from '../model/gallery.model';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  photos!: Photo[];
  file2upload!: File;

  constructor(private imagesService: ImagesService) {}

  ngOnInit() {
    this.photos = []; // this.imagesService.photos;
  }

  onChange(event) {
    this.file2upload = event.target.files[0];
  }

  onUpload() {
    this.imagesService.uploadImage(this.file2upload);
    console.log(this.file2upload);
    console.log('file uploaded');
  }

}
