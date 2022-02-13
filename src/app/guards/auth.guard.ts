import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router ) { }

  async canActivate(): Promise<boolean | UrlTree> {
    if (!this.auth.isAuth()) {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return true;
    }
  }
}
