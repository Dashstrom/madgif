import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mad-footer',
  templateUrl: './mad-footer.component.html',
  styleUrls: ['./mad-footer.component.scss']
})
export class MadFooterComponent implements OnInit {
  currentDate!: Date;

  constructor() { }

  ngOnInit() {
    this.currentDate = new Date();
  }

}
