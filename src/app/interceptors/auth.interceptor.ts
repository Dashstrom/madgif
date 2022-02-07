import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http"
import { Observable } from "rxjs"
import { AuthService } from "../services/auth.service"

export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO check the url
    if (this.auth.isAuth()) {
      let cloneReq = req.clone({setHeaders: {"x-access-tokens": this.auth.getToken()}});
      return next.handle(cloneReq);
    } else {
      return next.handle(req);
    }
  }
}
