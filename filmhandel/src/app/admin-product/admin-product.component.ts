import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  products: string;

  registerForm3: FormGroup;
  registerForm4: FormGroup;
  movieId = "";
  productId = "";

  constructor(private movieService: MovieService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProducts();

    //Formulär för att skapa ny produkt
    //Property binds med data från formulär
    this.registerForm3 = this.formBuilder.group({
      movieId: '',
      productId: '',
      title: '',
      director: '',
      releaseDate: '',
      genreId: '',
      language: '',
      subtitles: '',
      price: '',
      format: '',
    });

    //Formulär för att uppdatera befintlig produkt
    //Property binds med data från formulär
    this.registerForm4 = this.formBuilder.group({
      movieId: '',
      title: '',
      director: '',
      releaseDate: '',
      genreId: '',
      language: '',
      subtitles: [''],
      price: '',
      format: '',

    });
  }

  //Läser in alla produkter
  getProducts() {
    this.movieService.getProducts().subscribe((response: any) => {
      this.products = response;
    })
  }

  //Skickar data från formuläret till databasen
  //Skapar ny produkt
  onSubmitAddPro() {

    if (this.registerForm4.invalid) {
      return;
    }
    this.movieService.addProduct(this.registerForm4.value)
      .pipe(first())
      .subscribe((res) => {
        this.getProducts();
        console.log(res);
      },
        err => {
          console.log(err);
        })

  }

  //Skickar data från formulär till databasen
  //Uppdaterar befintlig produkt
  onSubmitPutPro() {

    if (this.registerForm3.invalid) {
      return;
    }
    this.movieService.updateProduct(this.productId, this.registerForm3.value)
      .pipe(first())
      .subscribe((res) => {
        this.getProducts();
        console.log(res);
      },
        err => {
          console.log("error");
        })

  }

  //Raderar produkt vid klick
  deleteProduct(id) {
    this.movieService.deleteProduct(id).subscribe(() => {
      this.getProducts();
      console.log('Raderad produkt')
    })
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
