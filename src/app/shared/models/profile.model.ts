import { Movie } from './movie.model';

export interface Profile {
  id?: number;
  name: string;
  child: boolean;
  pictureUrl: string;
  favourites: Movie[];
}
