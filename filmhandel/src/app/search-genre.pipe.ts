import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchGenre'
})
export class SearchGenrePipe implements PipeTransform {

  //Filtrerar produkterna efter angiven genre från rullgardin
  transform(products: any, searchGenre: any): any {
    if (searchGenre == null) return products;

    return products.filter(function(product) {
      return product.movie.genre.name.toLowerCase().startsWith(searchGenre.toLowerCase());
    })
  }
}
