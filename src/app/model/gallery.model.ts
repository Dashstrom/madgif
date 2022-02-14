import { SafeUrl } from "@angular/platform-browser";

export class Photo {
    id!: string;
    imgURL!: SafeUrl;
    uploadDate!: Date;
    display!: boolean;
}

export class EditQuery {
  w?: number;
  h?: number;
  rotate?: number;
  cropX?: number;
  cropY?: number;
  cropW?: number;
  cropH?: number;
}