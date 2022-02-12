import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  src: SafeUrl | undefined;

  image: File;

  setState(state: number): void {
    this.state = state;
  }

  hasState(state: number): boolean {
    return this.state == state;
  }

  constructor(
    private route: ActivatedRoute,
    public images: ImagesService,
    private router: Router
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    if (id) {
      this.iid = id;
      this.images.urlRawImageById(this.iid).subscribe(
        url => this.src = url,
        err => console.log(err)
      );
    }
  }

  canvas(e) {
    //image.src = URL.createObjectURL(picture)
  }
}

