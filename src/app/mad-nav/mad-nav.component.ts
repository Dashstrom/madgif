import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-mad-nav",
  templateUrl: "./mad-nav.component.html",
  styleUrls: ["./mad-nav.component.scss"],
})
export class MadNavComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  opened: boolean;

  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
