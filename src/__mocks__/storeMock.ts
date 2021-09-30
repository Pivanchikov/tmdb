import { MoviesState } from '../state/types'

export const initialState: MoviesState = {
  items: [],
  byId: {},
  genres: [],
  selectedMovie: null,
  isLoading: false,
  isFoundMovie: false,
  popularMovies: [],
  trendingMovies: [],
  nowPlayingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  movieDetails: null,
  recommendationMovies: [],
  credits: null,
  reviews: null,
  movieId: null,
}
