import { Movie } from './movie';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {

  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
  });

  it('sorts by title from A to Z', () => {
    const orderByPipe = new OrderByPipe();
    let movies: Movie[] = [];
    movies.push(new Movie("9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe", "Avengers: Age of Ultron", "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
      7.3, "2h 21min", "Action, Adventure, Sci-Fi", "`../../assets/Avengers.png`", new Date("1 May 2015"), "https://www.youtube.com/watch?v=tmeOjFno6Do"));
    movies.push(new Movie("a916dba7-4dce-4f81-9a72-a1448d1805da", "Knives Out", "A detective investigates the death of a patriarch of an eccentric, combative family.",
      7.9, "2h 10min", "Comedy, Crime, Drama", "`../../assets/Avengers.png`", new Date("27 November 2019"), "https://www.youtube.com/watch?v=qGqiHJTsRkQ"));
    movies.push(new Movie("b0f7442a-e1f2-4d89-99bd-2750e01c94c2", "Guardians of the Galaxy", "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
      8.0, "2h 1min", "Action, Adventure, Comedy", "`../../assets/Guardians of the Galaxy.png`", new Date("1 August 2014"), "https://www.youtube.com/watch?v=d96cjJhvlMA"));

    let sortedMovies = orderByPipe.transform(movies, "title", "desc");

    expect(sortedMovies.length).toBe(3);
    expect(sortedMovies[0].title).toBe("Knives Out");
    expect(sortedMovies[1].title).toBe("Guardians of the Galaxy");
    expect(sortedMovies[2].title).toBe("Avengers: Age of Ultron");
  });

  it('sorts by title from Z to A', () => {
    const orderByPipe = new OrderByPipe();
    let movies: Movie[] = [];
    movies.push(new Movie("9bda9852-68d6-4db4-9c4e-0dc2eaf2cbfe", "Avengers: Age of Ultron", "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
      7.3, "2h 21min", "Action, Adventure, Sci-Fi", "`../../assets/Avengers.png`", new Date("1 May 2015"), "https://www.youtube.com/watch?v=tmeOjFno6Do"));
    movies.push(new Movie("a916dba7-4dce-4f81-9a72-a1448d1805da", "Knives Out", "A detective investigates the death of a patriarch of an eccentric, combative family.",
      7.9, "2h 10min", "Comedy, Crime, Drama", "`../../assets/Avengers.png`", new Date("27 November 2019"), "https://www.youtube.com/watch?v=qGqiHJTsRkQ"));
    movies.push(new Movie("b0f7442a-e1f2-4d89-99bd-2750e01c94c2", "Guardians of the Galaxy", "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
      8.0, "2h 1min", "Action, Adventure, Comedy", "`../../assets/Guardians of the Galaxy.png`", new Date("1 August 2014"), "https://www.youtube.com/watch?v=d96cjJhvlMA"));

    let sortedMovies = orderByPipe.transform(movies, "title", "asc");

    expect(sortedMovies.length).toBe(3);
    expect(sortedMovies[0].title).toBe("Avengers: Age of Ultron");
    expect(sortedMovies[1].title).toBe("Guardians of the Galaxy");
    expect(sortedMovies[2].title).toBe("Knives Out");
  });
});
