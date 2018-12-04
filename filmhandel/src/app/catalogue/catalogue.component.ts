import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  products: string;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    //Läser in produkter vid OnInit
    this.movieService.getProducts().subscribe((response: any) => {
      console.log(response)
      this.products = response;
    });
  }

  //Loggar ut genom att radera den token som sätts vid inloggning
  logout() {
    localStorage.removeItem('token');
  }
}

