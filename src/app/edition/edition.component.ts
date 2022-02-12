import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {
  RESIZE = 1;
  CROP = 2;
  ROTATE = 3;
  DOWNLOAD = 4;

  state = 0;
  iid: string|null;
  src: SafeUrl;

  image: File;

  setState(state: number): void {
    this.state = state;
  }

  hasState(state: number): boolean {
    return this.state == state;
  }

  constructor(private route: ActivatedRoute, public images: ImagesService) { }

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    this.iid = id ? id: null;
    this.src = this.images.urlRawImageById(this.iid).subscribe(
      url => this.src = url,
      err => console.error(err)
    );
  }

  canvas(e) {
    //image.src = URL.createObjectURL(picture)
  }
}

