import { Component } from '@angular/core';
import { MaterialModule } from './material/material.module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'madgif';
  opened = false;
}
