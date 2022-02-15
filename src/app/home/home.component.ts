import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isCollapsed!: boolean[];
  arrowImg!: string[];

  constructor() {}

  ngOnInit() {
    this.isCollapsed = [false, false];
    this.arrowImg = [
      "/assets/img/down-arrow.png",
      "/assets/img/down-arrow.png",
    ];
  }

  collapseBlock(numBlock): void {
    if (this.isCollapsed[numBlock]) {
      this.arrowImg[numBlock] = "/assets/img/up-arrow.png";
      this.isCollapsed[numBlock] = false;
    } else {
      this.arrowImg[numBlock] = "/assets/img/down-arrow.png";
      this.isCollapsed[numBlock] = true;
    }
  }
}
