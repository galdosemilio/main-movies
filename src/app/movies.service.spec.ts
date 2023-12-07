import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from './movie';
import { LocalService } from './local.service';

describe('MoviesService', () => {
    let service: MoviesService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let localService: LocalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MoviesService]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(MoviesService);
    });

    beforeEach(() => {
        httpClient = TestBed.inject(HttpClient);
        localService = TestBed.inject(LocalService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all the movies the first time is executed', (done) => {
        service.movies = [];
        let spy = spyOn(httpClient, 'get').and.callThrough();
        service.getAllMovies().subscribe(
            (currentMovies: Movie[]) => {
                expect(currentMovies.length).toBe(0);
                expect(spy).toHaveBeenCalledTimes(1);
                done();
            }
        );

        const req = httpTestingController.expectOne(call => call.method === 'GET');
        req.flush([]);
    });

    it('should get already loaded movies without retrieving them again', (done) => {
        service.movies = [];
        service.movies.push(new Movie("9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe", "Avengers: Age of Ultron", "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
            7.3, "2h 21min", "Action, Adventure, Sci-Fi", "`../../assets/Avengers.png`", new Date("1 May 2015"), "https://www.youtube.com/watch?v=tmeOjFno6Do"));
        let spy = spyOn(httpClient, 'get').and.callThrough();
        service.getAllMovies().subscribe(
            (currentMovies: Movie[]) => {
                expect(currentMovies.length).toBe(1);
                expect(spy).toHaveBeenCalledTimes(0);
                done();
            }
        );
    });

    it('should get "Avengers: Age of Ultron" movie', () => {
        service.movies = [];
        let currentTitle = "Avengers: Age of Ultron";
        service.movies.push(new Movie("9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe", currentTitle, "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
            7.3, "2h 21min", "Action, Adventure, Sci-Fi", "`../../assets/Avengers.png`", new Date("1 May 2015"), "https://www.youtube.com/watch?v=tmeOjFno6Do"));

        let firstMovie = service.getMovieById("9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe");
        expect(firstMovie.title).toBe(currentTitle);
    });

    it('should get default movie image path', () => {
        let currentTitle = "New movie";

        let defaultMovieImagePath = service.getMovieImagePath(currentTitle);
        expect(defaultMovieImagePath).toBe(`../../assets/${currentTitle}.png`);
    });

    it('should add movie to the watchlist', () => {
        let currentMovieId = "9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe";
        service.movies = [];
        service.movies.push(new Movie("9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe", "Avengers: Age of Ultron", "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
            7.3, "2h 21min", "Action, Adventure, Sci-Fi", "`../../assets/Avengers.png`", new Date("1 May 2015"), "https://www.youtube.com/watch?v=tmeOjFno6Do"));
        let spy = spyOn(localService, 'saveData').and.callThrough();

        let updatedMovie = service.addToWatchlist(currentMovieId);
        if (updatedMovie) {
            expect(updatedMovie.addedToWatchlist).toBeTrue();
        }
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should add the movie to the watchlist and then remove it', () => {
        let currentMovieId = "9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe";
        service.movies = [];
        service.movies.push(new Movie("9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe", "Avengers: Age of Ultron", "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
            7.3, "2h 21min", "Action, Adventure, Sci-Fi", "`../../assets/Avengers.png`", new Date("1 May 2015"), "https://www.youtube.com/watch?v=tmeOjFno6Do"));
        let saveSpy = spyOn(localService, 'saveData').and.callThrough();
        let removeSpy = spyOn(localService, 'removeValue').and.callThrough();

        let updatedMovie = service.addToWatchlist(currentMovieId);
        if (updatedMovie) {
            expect(updatedMovie.addedToWatchlist).toBeTrue();
        }
        expect(saveSpy).toHaveBeenCalledTimes(1);
        updatedMovie = service.removeFromWatchlist(currentMovieId);
        if (updatedMovie) {
            expect(updatedMovie.addedToWatchlist).toBeFalse();
        }
        expect(removeSpy).toHaveBeenCalledTimes(1);
    });
});