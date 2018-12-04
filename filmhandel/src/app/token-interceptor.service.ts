import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { MovieService } from './services/movie.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  //Fångar upp användarens token på väg till databasen
  //Sätter token i webbläsarens header
  intercept(req, next) {
    let movieService = this.injector.get(MovieService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${movieService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
