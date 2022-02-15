import { Component, OnInit, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import * as saveAs from "file-saver";
import { Photo } from "../model/gallery.model";
import { ImagesService } from "../services/images.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements OnInit {
  photos: Photo[] = [];
  amountPhotos: number = 0;

  constructor(
    private imagesService: ImagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.showNewPictures();
  }

  onDelete(image: Photo) {
    this.imagesService.deleteImageById(image.id);
    var arLength = this.photos.length;
    var i = 0;
    while (i < arLength) {
      if (image.id === this.photos[i].id) {
        this.photos.splice(i, 1);
        this.amountPhotos--;
        arLength = this.photos.length;
      } else {
        i++;
      }
    }
  }

  onDownload(img: Photo) {
    const src = this.sanitizer.sanitize(SecurityContext.URL, img.imgURL);
    saveAs(src, img.name);
  }

  showNewPictures() {
    this.loadPictures();
    console.log(this.photos);
  }

  isPictureAlreadyLoaded(image) {
    for (let i = 0; i < this.photos.length; i++) {
      if (image.public_id === this.photos[i].id) {
        return true;
      }
    }
    return false;
  }

  loadPictures() {
    this.imagesService.getImages().subscribe(
      (res) => {
        for (let i = 0; i < res.length; i++) {
          this.imagesService
            .urlRawImageById(res[i].public_id)
            .subscribe((url) => {
              if (!this.isPictureAlreadyLoaded(res[i])) {
                this.photos.unshift({
                  id: res[i].public_id,
                  imgURL: url,
                  uploadDate: res[i].date_creation,
                  name: res[i].name
                });
                this.sortArrayByDate();
                this.amountPhotos++;
              }
            });
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  sortArrayByDate() {
    this.photos.sort((a, b) => {
      if (b.uploadDate > a.uploadDate) return 1;
      if (b.uploadDate < a.uploadDate) return -1;
      return 0;
    });
  }
}
