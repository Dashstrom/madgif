import { Component, OnInit } from '@angular/core';
import { Photo } from '../model/gallery.model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {
  carouselImages: Photo[] = [
    {
      id: '0',
      imgURL: '../../assets/img/home/budapest.jpg',
      uploadDate: new Date(),
      display: true
    },
    {
        id: '1',
        imgURL: '../../assets/img/home/goat.jpg',
        uploadDate: new Date(),
        display: true
    },
    {
        id: '2',
        imgURL: '../../assets/img/home/moto-bikes.jpg',
        uploadDate: new Date(),
        display: true
    },
    {
        id: '3',
        imgURL: '../../assets/img/home/school.jpg',
        uploadDate: new Date(),
        display: true
    }
  ]

  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

  ngOnInit() {
  }

}
