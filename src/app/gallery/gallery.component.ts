import { Component, OnInit } from '@angular/core';
import { Photo } from '../model/gallery.model';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  photos!: Photo[];

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.photos = this.galleryService.photos;
  }

}
