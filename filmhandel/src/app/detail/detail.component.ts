import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  product: any;

  constructor(private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //Laddar in data för det ID som följt med i routen
    let productId = this.route.snapshot.paramMap.get('id');
    this.movieService.getProduct(productId).subscribe((response: any) => {
      console.log(response)
      this.product = response
    })
  }

  toCart() {
    alert("The product has been added to your cart");
  }
  
  goBack() {
    this.router.navigate(['/']);
  }

}
