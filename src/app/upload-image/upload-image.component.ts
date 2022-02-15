import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ImagesService } from "../services/images.service";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"],
})
export class UploadImageComponent implements OnInit {
  file2upload!: File;
  filename!: string;
  displayUploadBtn: boolean = false;
  displayLoading: boolean = false;
  @Output() uploadEvent = new EventEmitter();

  constructor(private imagesService: ImagesService) {}

  ngOnInit() {}

  onChange(event) {
    this.file2upload = event.target.files[0];
    this.filename = this.file2upload.name;
    this.displayUploadBtn = true;
  }

  onUpload() {
    if (this.displayLoading) return;
    this.displayLoading = true;
    this.displayUploadBtn = false;
    this.imagesService.uploadImage(this.file2upload).subscribe(
      res => {
        this.filename = "Image mise en ligne avec succès !";
        this.uploadEvent.emit(res);
      },
      err => {
        console.error(err);
      },
      () => {
        this.displayLoading = false;
      }
    );
  }
}
