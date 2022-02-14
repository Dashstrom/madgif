import { SafeUrl } from "@angular/platform-browser";

export class Photo {
    id!: string;
    imgURL!: SafeUrl;
    uploadDate!: Date;
    display!: boolean;
}
