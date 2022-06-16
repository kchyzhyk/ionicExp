import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import {LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies = [];
  currentPage = 1;
  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
   await this.loadMovies();
  }

  async loadMovies() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe( res => {
      loading.dismiss();
      this.movies = [...this.movies, ...res.results];
      console.log(res);
    });
  }

}
