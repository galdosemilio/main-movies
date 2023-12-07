import { TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { MoviesService } from '../movies.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { Movie } from '../movie';

let currentMovieTitle = "Knives Out";
let currentMovieDescription = "A detective investigates the death of a patriarch of an eccentric, combative family.";
let currentMovie = new Movie("a916dba7-4dce-4f81-9a72-a1448d1805da", currentMovieTitle, "A detective investigates the death of a patriarch of an eccentric, combative family.", 7.9, "2h 10min", "Comedy, Crime, Drama", "../../assets/Avengers.png", new Date("27 November 2019"), "https://www.youtube.com/watch?v=qGqiHJTsRkQ",
  false);

class MoviesServiceMock {
  getMovieById() {
    return currentMovie;
  }
  addToWatchlist() {
    currentMovie.addedToWatchlist = true;
    return currentMovie;
  }
  removeFromWatchlist() {
    currentMovie.addedToWatchlist = false;
    return currentMovie;
  }
}

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDetailsComponent,
        { provide: MoviesService, useClass: MoviesServiceMock },
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({
              id: 'd31e8b48-7309-4c83-9884-4142efdf7271',
            }))
          }
        }
      ],
    });

    component = TestBed.inject(MovieDetailsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set current movie details', () => {
    component.ngOnInit();

    if (component.currentMovie) {
      expect(component.currentMovie.title).toContain(currentMovieTitle);
      expect(component.currentMovie.description).toContain(currentMovieDescription);
    }
  });

  it('should set current movie details', () => {
    component.ngOnInit();
    if (component.currentMovie) {
      expect(component.currentMovie.title).toContain(currentMovieTitle);
    }
  });

  it('should add current movie to watchlist', () => {
    component.ngOnInit();
    if (component.currentMovie) {
      expect(component.currentMovie.addedToWatchlist).toBeFalse();
      component.updateWatchlistState();
      expect(component.currentMovie.addedToWatchlist).toBeTrue();
    }
  });
});
