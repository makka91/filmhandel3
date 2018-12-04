import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieService } from './services/movie.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { LoginComponent } from './login/login.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { AdminComponent } from './admin/admin.component';
import { AdminMasterComponent } from './admin-master/admin-master.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { SearchPipe } from './search.pipe';
import { SearchGenrePipe } from './search-genre.pipe';
import { SearchFormatPipe } from './search-format.pipe';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CatalogueComponent,
    AdminComponent,
    AdminMasterComponent,
    AdminProductComponent,
    SearchPipe,
    SearchGenrePipe,
    SearchFormatPipe,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [MovieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
