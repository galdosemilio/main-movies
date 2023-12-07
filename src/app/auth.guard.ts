import { CanActivateFn, Router } from '@angular/router';
import { MoviesService } from './movies.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  let numberOfMovies = inject(MoviesService).movies.length;
  if (numberOfMovies) {
    return true;
  } else {
    inject(Router).navigate(['/movies-list']);
    return false;
  }
};
