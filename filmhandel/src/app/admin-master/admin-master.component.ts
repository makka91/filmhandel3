import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-master',
  templateUrl: './admin-master.component.html',
  styleUrls: ['./admin-master.component.css']
})
export class AdminMasterComponent implements OnInit {

  movies: string

  registerForm: FormGroup;
  registerForm2: FormGroup;
  movieId = "";

  constructor(private movieService: MovieService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMovies();

    //Formulär för att skapa ny master-film
    //Property binds från formulärets input.
    this.registerForm = this.formBuilder.group({
      id: '',
      title: '',
      director: '',
      releaseDate: '',
      genreId: '',
      language: ''
    });

    //Formulär för att uppdatera master-film
    //Property binds från formulärets input.
    this.registerForm2 = this.formBuilder.group({
      title: '',
      director: '',
      releaseDate: '',
      genreId: '',
      language: ''
    });
  }

  //Läser in filmer
  getMovies() {
    this.movieService.getMovies().subscribe((response: any) => {
      this.movies = response;
    });
  }

  //Skickar värdet från formuläret till servern vid submit
  //Skapar ny master-film post
  onSubmitAdd() {
    if (this.registerForm2.invalid) {
      return;
    }
    this.movieService.addMovie(this.registerForm2.value)
      .pipe(first())
      .subscribe((res) => {
        this.getMovies();
        console.log(res);
      },
        err => {
          console.log(err);
        });

  }

  //Skickar värdet från formuläret till servern vid submit
  //Uppdaterar befintlig master post
  onSubmitPut() {

    if (this.registerForm.invalid) {
      return;
    }
    this.movieService.updateMaster(this.movieId, this.registerForm.value)
      .pipe(first())
      .subscribe((res) => {
        this.getMovies();
        console.log(res);
      },
        err => {
          console.log("error");
        });
  }

  //Raderar master-post vid klick
  deleteItem(id) {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.getMovies();
      console.log('Raderad')
    });

  }
  goBack() {
    this.router.navigate(['/admin']);
  }

}

