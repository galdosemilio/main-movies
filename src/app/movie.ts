export class Movie {
    id: string;
    title: string;
    description: string;
    rating: number;
    duration: string;
    genre: string;
    imagePath: string;
    releaseDate: Date;
    trailerLink: string;
    addedToWatchlist: boolean;

    constructor(id: string, title: string, description: string, rating: number, duration: string, genre: string, imagePath: string, releaseDate: Date, trailerLink: string, addedToWatchlist: boolean = false) {
        this.id = id;
        this.title = title;
        this.imagePath = imagePath;
        this.releaseDate = releaseDate;
        this.description = description;
        this.rating = rating;
        this.duration = duration;
        this.genre = genre;
        this.trailerLink = trailerLink;
        this.addedToWatchlist = addedToWatchlist;
    }
}