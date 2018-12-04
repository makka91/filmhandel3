import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {

  //Filterar produkter efter värde angivet från input-ruta
  //Sökfunktion
  transform(products: any, searchText: any): any {
    if (searchText == null) return products;

    return products.filter(function(product) {
      return product.movie.title.toLowerCase().startsWith(searchText.toLowerCase());
    })
  }
}
