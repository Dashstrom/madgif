export class Photo {
    id!: string;
    imgURL!: string;
    uploadDate!: Date;
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