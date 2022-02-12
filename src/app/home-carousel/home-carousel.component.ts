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
      id: '91190d4a-4e0a-434b-afb1-4a56e951c6bd',
      imgURL: 'https://cdn.pixabay.com/photo/2022/01/10/18/09/budapest-6928973_1280.jpg',
      uploadDate: new Date()
    },
    {
      id: '4ee0aec1-278f-42af-a147-9db2b07ba90c',
      imgURL: 'https://cdn.pixabay.com/photo/2021/10/31/09/25/animal-6756751_1280.jpg',
      uploadDate: new Date()
    },
    {
      id: 'a2b69fc2-56a6-4bb6-9cac-405196b83994',
      imgURL: 'https://cdn.pixabay.com/photo/2021/12/13/09/46/moto-bikes-6867911_1280.jpg',
      uploadDate: new Date()
    },
    {
      id: 'a8ed7434-0553-4ee6-87b7-79c96a4a5d34',
      imgURL: 'https://cdn.pixabay.com/photo/2022/01/30/19/46/school-6982073_1280.jpg',
      uploadDate: new Date()
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
