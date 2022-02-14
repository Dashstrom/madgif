import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImagesService } from '../services/images.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  file2upload!: File;
  filename!: string;
  displayLoading: boolean = false;
  @Output() uploadEvent = new EventEmitter();

  constructor(
    private imagesService: ImagesService
  ) { }

  ngOnInit() {
  }

  onChange(event) {
    this.file2upload = event.target.files[0];
    this.filename = this.file2upload.name;
  }

  onUpload() {
    this.imagesService.uploadImage(this.file2upload);
    console.log(this.file2upload);
    console.log('file uploaded');
    this.displayLoading = true;
    setTimeout(
      () => {
        this.displayLoading = false;
        this.filename = 'Image mise en ligne avec succès !';
        this.uploadEvent.emit();
      },
      5000
    );
  }

}
