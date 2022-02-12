import { Injectable } from '@angular/core';
import { Photo } from '../model/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
    photos: Photo[] = [
        {
            id: '91190d4a-4e0a-434b-afb1-4a56e951c6bd',
            imgURL: 'https://cdn.pixabay.com/photo/2021/07/25/12/22/tourist-attraction-6491734_1280.jpg',
            uploadDate: new Date()
        },
        {
            id: '4ee0aec1-278f-42af-a147-9db2b07ba90c',
            imgURL: 'https://cdn.pixabay.com/photo/2021/12/18/06/01/sunset-6878021_1280.jpg',
            uploadDate: new Date()
        },
        {
            id: 'a2b69fc2-56a6-4bb6-9cac-405196b83994',
            imgURL: 'https://cdn.pixabay.com/photo/2022/01/07/07/13/chicago-6921297_1280.jpg',
            uploadDate: new Date()
        },
        {
            id: 'a8ed7434-0553-4ee6-87b7-79c96a4a5d34',
            imgURL: 'https://cdn.pixabay.com/photo/2022/01/17/06/38/altai-6943982_1280.jpg',
            uploadDate: new Date()
        },
        {
            id: 'ca09891d-8f04-4bd6-9a0b-2c7395aa4019',
            imgURL: 'https://cdn.pixabay.com/photo/2022/01/24/07/52/lizard-6962760_1280.jpg',
            uploadDate: new Date()
        },
        {
            id: '7900da57-909e-4d2c-93a1-ed7a888a2356',
            imgURL: 'https://cdn.pixabay.com/photo/2022/01/21/07/21/ring-tailed-lemur-6954076_1280.jpg',
            uploadDate: new Date()
        },
        {
            id: 'fe23d7de-e44b-4678-ba7a-b51dc7d517f6',
            imgURL: 'https://cdn.pixabay.com/photo/2021/11/17/11/02/flowers-6803234_1280.png',
            uploadDate: new Date()
        },
        {
            id: '34e01bc0-5f16-4fe1-96d1-3617eb5b8c35',
            imgURL: 'https://wallpaperaccess.com/full/1119015.jpg',
            uploadDate: new Date()
        },
        {
            id: '974a3ddf-8fd2-44a7-a8c3-a5fe53e150ec',
            imgURL: 'https://cdn.pixabay.com/photo/2022/01/13/10/39/animal-6934928_1280.jpg',
            uploadDate: new Date()
        },
    ];
}
