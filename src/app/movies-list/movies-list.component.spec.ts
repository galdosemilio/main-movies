import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListComponent } from './movies-list.component';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatCard, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { OrderByPipe } from '../order-by.pipe';
import { of } from 'rxjs/internal/observable/of';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let firstMovieTitle = "Knives Out";
let firstMovieDescription = "A detective investigates the death of a patriarch of an eccentric, combative family.";
let firstMovie = new Movie("a916dba7-4dce-4f81-9a72-a1448d1805da", firstMovieTitle, firstMovieDescription, 7.9, "2h 10min", "Comedy, Crime, Drama", "../../assets/Avengers.png", new Date("27 November 2019"), "https://www.youtube.com/watch?v=qGqiHJTsRkQ",
    false);
let secondMovieTitle = "Avengers: Age of Ultron";
let secondMovieDescription = "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.";
let secondMovie = new Movie("9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe", secondMovieTitle, secondMovieDescription,
    7.3, "2h 21min", "Action, Adventure, Sci-Fi", "`../../assets/Avengers.png`", new Date("1 May 2015"), "https://www.youtube.com/watch?v=tmeOjFno6Do", false);

class MoviesServiceMock {
    getAllMovies() {
        return of([firstMovie, secondMovie]);
    }
    addToWatchlist() {
        firstMovie.addedToWatchlist = true;
        return firstMovie;
    }
    removeFromWatchlist() {
        firstMovie.addedToWatchlist = false;
        return firstMovie;
    }
}

describe('MoviesListComponent', () => {
    let component: MoviesListComponent;
    let fixture: ComponentFixture<MoviesListComponent>;
    let moviesService: MoviesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MoviesListComponent, OrderByPipe],
            providers: [{ provide: MoviesService, useClass: MoviesServiceMock },
            {
                provide: ActivatedRoute, useValue: {
                    paramMap: of(convertToParamMap({
                        id: 'd31e8b48-7309-4c83-9884-4142efdf7271',
                    }))
                }
            }],
            imports: [MatFormFieldModule, MatSelectModule, MatOptionModule, MatCardModule, FormsModule, RouterModule, MatIconModule, BrowserAnimationsModule]
        });
        fixture = TestBed.createComponent(MoviesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(() => {
        moviesService = TestBed.inject(MoviesService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get all movies', () => {
        component.ngOnInit();
        expect(component.movies.length).toBe(2);
    });

    it('should get all movies', () => {
        component.ngOnInit();
        expect(component.movies.length).toBe(2);
    });

    it('should sort movies by title in ascending order', () => {
        component.ngOnInit();

        component.sortBy("title", "asc");
        expect(component.sortField).toBe("title");
        expect(component.sortOrder).toBe("asc");
    });

    it('should sort movies by title in descending order', () => {
        component.ngOnInit();

        component.sortBy("title", "desc");
        expect(component.sortField).toBe("title");
        expect(component.sortOrder).toBe("desc");
    });

    it('should sort movies by release date in ascending order', () => {
        component.ngOnInit();

        component.sortBy("releaseDate", "asc");
        expect(component.sortField).toBe("releaseDate");
        expect(component.sortOrder).toBe("asc");
    });

    it('should sort movies by title in descending order', () => {
        component.ngOnInit();

        component.sortBy("releaseDate", "desc");
        expect(component.sortField).toBe("releaseDate");
        expect(component.sortOrder).toBe("desc");
    });

    it('should add movie to watchlist', () => {
        let spy = spyOn(moviesService, 'addToWatchlist').and.callThrough();
        component.ngOnInit();

        component.addToWatchlist(firstMovie.id);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should add movie to watchlist', () => {
        let spy = spyOn(moviesService, 'removeFromWatchlist').and.callThrough();
        component.ngOnInit();

        component.removeFromWatchlist(firstMovie.id);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
