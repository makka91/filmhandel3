import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';
import { List } from '../admin/models';

@Injectable()
export class MovieService {

  private loginUrl = "/api/login";

  constructor(private http: HttpClient) { }


  /* Service för master-filmer */

  //Lägger till film
  addMovie(list: List) {
    return this.http.post('/api/movies', list);
  }

  //Uppdaterar film
  updateMaster(movieId, list: List) {
    return this.http.put('/api/movies/' + movieId, list);
  }

  //Läs in film
  getMovies() {
    let data = this.http.get('/api/movies') as Observable<any>;
    return data;
  }

  //Raderar film utifrån angivet ID
  deleteMovie(id): Observable<any> {
    console.log('/api/movies/' + id);
    return this.http.delete('/api/movies/' + id)
  }


  /* Service för produkter */

  //Läser in produkter
  getProducts() {
    let data = this.http.get('/api/products') as Observable<any>;
    return data;
  }

  //Läser in produkt med angivet ID
  getProduct(productId: string): Observable<any> {
    let data = this.http.get('/api/products/' + productId) as Observable<any>
    return data;
  }

  //Raderar produkt med angivet ID
  deleteProduct(id): Observable<any> {
    return this.http.delete('/api/products/' + id)
  }

  //Skapar ny produkt
  addProduct(list: List) {
    return this.http.post('/api/products', list);
  }

  //Uppdaterar befintlig produkt från angivet ID
  updateProduct(productId, list: List) {
    return this.http.put('/api/products/' + productId, list);
  }


  /* Service för authentisering */

  //Läser in token från localstorage
  getToken() {
    return localStorage.getItem('token')
  }

  //Loggar ut användaren genom att radera token från localstorage
  logout() {
    localStorage.removeItem('token');
  }

  //Hämtar token för den inloggade användaren
  //Avkodar token för att komma åt att kontrollera admin-status
  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return false;

    return new JwtHelper().decodeToken(token);
  }

  //Kontrollerar tokens livslängd
  isLoggedIn() {
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');

    if (!token)
      return false;

    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired
  }

  //Loggar in användare genom att posta input till databasen för kontroll
  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user)
  }

}

