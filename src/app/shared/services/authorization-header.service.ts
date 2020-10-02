import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationHeaderService implements HttpInterceptor {

  constructor(
    private router: Router,
    private storage: LocalStorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const blackListedRoutes = [
      '/users/login'
    ]

    const token = this.storage.getItem('accessToken')

    const user = this.storage.getItem('currentUser')

    let found = false

    for (let i = 0; i < blackListedRoutes.length; i ++) {
      if (blackListedRoutes[i] === req['url']) {
        found = true;
        break;
      }
    }

    if (user && token && found === false) {
      const authReq = req.clone({ setHeaders: { 'Authorization': 'Bearer ${token}'}})
      return next.handle(authReq)
    } else {
      return next.handle(req)
    }
  }
}
