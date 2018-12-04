import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginUserData = {}

  constructor(private router: Router,
    private movieService: MovieService) { }

  //Tar data från input
  //Sätter token för användaren
  loginUser() {
    this.movieService.loginUser(this.loginUserData).subscribe(res => {
      console.log(res)
      localStorage.setItem('token', res.token);
      this.router.navigate(['/']);
    }, err => alert(err.error))
  }
}
