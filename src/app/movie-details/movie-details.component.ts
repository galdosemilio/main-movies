import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MoviesService } from '../movies.service';
import { ActivatedRoute } from '@angular/router';
import { WatchlistOptions } from '../types';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  currentMovie: Movie | undefined | null;
  checkedTest = false;
  currentWatchlistAction!: WatchlistOptions;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(
        {
          next: (params: any) => {
            this.currentMovie = this.moviesService.getMovieById(params.get('id'));
            this.currentWatchlistAction =
              this.currentMovie.addedToWatchlist ? "Remove from watchlist" : "Add to watchlist";
          },
          error: (error: any) => {
            console.error("An error occurred when getting parameters");
            console.error(error);
          },
        }
      );
  }


  updateWatchlistState() {
    if (this.currentWatchlistAction === "Remove from watchlist") {
      this.currentWatchlistAction = "Add to watchlist";
      if (this.currentMovie) {
        this.currentMovie = this.moviesService.removeFromWatchlist(this.currentMovie.id);
      }
    } else {
      this.currentWatchlistAction = "Remove from watchlist";
      if (this.currentMovie) {
        this.currentMovie = this.moviesService.addToWatchlist(this.currentMovie.id);
      }
    }
  }
}
