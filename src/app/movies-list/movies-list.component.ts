import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MoviesService } from '../movies.service';
import { SortFieldType, SortOrderType } from '../types';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: Movie[];
  sortField: "title" | "releaseDate";
  sortOrder: "asc" | "desc";

  constructor(private moviesService: MoviesService) {
    this.movies = [];
    this.sortOrder = "asc";
    this.sortField = "title";
  }

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe({
      next: (movies: Movie[]) => {
        this.movies = movies;
      },
      error: (error: any) => {
        console.error("An error occurred when getting all the movies");
        console.error(error);
      }
    });
  }

  sortBy(sortField: SortFieldType, sortOrder: SortOrderType) {
    this.sortField = sortField;
    this.sortOrder = sortOrder;
  }

  addToWatchlist(movieId: string) {
    this.moviesService.addToWatchlist(movieId);
  }

  removeFromWatchlist(movieId: string) {
    this.moviesService.removeFromWatchlist(movieId);
  }
}
