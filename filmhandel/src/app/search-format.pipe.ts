import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFormat'
})
export class SearchFormatPipe implements PipeTransform {

  //Filtrerar produkterna som visas utifrån angivet värde från rullgardin
  transform(products: any, searchFormat: any): any {
    if (searchFormat == null) return products;

    return products.filter(function(product) {
      return product.format.toLowerCase().startsWith(searchFormat.toLowerCase());
    })
  }
}
