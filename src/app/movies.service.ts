import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { HttpClient } from '@angular/common/http';
import { LocalService } from './local.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  movies: Movie[] = [];

  constructor(private httpClient: HttpClient, private localService: LocalService) { }

  getAllMovies() {
    const url: string = '/assets/mainMoviesDetails.json';
    if (!this.movies.length) {
      return this.httpClient.get(url)
        .pipe(
          map((resultMovies: any) => {
            let currentMovies: Movie[] = [];
            resultMovies.forEach((currentMovie: any) => {
              let newMovie = new Movie(currentMovie.Id,
                currentMovie.Title, currentMovie.Description, currentMovie.Rating, currentMovie.Duration,
                currentMovie.Genre, currentMovie.ImagePath, new Date(currentMovie.ReleaseDate), currentMovie.TrailerLink)
              newMovie.imagePath = this.getMovieImagePath(newMovie.title);

              newMovie.trailerLink = newMovie.trailerLink.replace("watch?v=", "embed/")
              let currentWatchlistMovie = this.localService.getData("watchlist");
              newMovie.addedToWatchlist = currentWatchlistMovie.includes(newMovie.id);

              currentMovies.push(newMovie);
            });

            this.movies = currentMovies;
            return this.movies;
          }),
          catchError((error) => {
            console.error("An error occurred while retrieving the movies");
            console.error(error);
            return [];
          })
        );
    } else {
      return of(this.movies);
    }
  }

  getMovieById(id: string) {
    return this.movies.filter(
      (resultMovies: Movie) => resultMovies.id === id
    )[0];
  }

  getMovieImagePath(title: string): string {
    let formattedTitle;

    switch (title) {
      case "Guardians of the Galaxy":
        formattedTitle = "Guardians of The Galaxy";
        break;

      case "Avengers: Age of Ultron":
        formattedTitle = "Avengers";
        break;

      case "Spider-Man: Into the Spider-Verse":
        formattedTitle = "Spider Man";
        break;

      default:
        formattedTitle = title;
        break;
    }

    return `../../assets/${formattedTitle}.png`;
  }

  addToWatchlist(movieId: string) {
    this.localService.saveData("watchlist", movieId);
    return this.updateMovieWatchlistState(movieId, true);
  }

  removeFromWatchlist(movieId: string) {
    this.localService.removeValue("watchlist", movieId);
    return this.updateMovieWatchlistState(movieId, false);
  }

  private updateMovieWatchlistState(movieId: string, newState: boolean) {
    let currentMovie = this.movies.filter(
      (currentValue: Movie) => currentValue.id === movieId
    );
    if (currentMovie.length) {
      currentMovie[0].addedToWatchlist = newState;
      return currentMovie[0];
    } else {
      return null;
    }
  }
}

