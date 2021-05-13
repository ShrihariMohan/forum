import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';import { Observable } from 'rxjs';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.url.includes('localhost:3500')) {
      req = req.clone({
        withCredentials: true
      });
    }
    return next.handle(req) ;
  }
}
