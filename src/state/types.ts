export type MoviesState = {
  items: []
  byId: Record<string, never>
  genres: []
  selectedMovie: null | Movie
  isLoading: boolean
  isFoundMovie: boolean
  popularMovies: Movie[]
  trendingMovies: Movie[]
  nowPlayingMovies: Movie[]
  upcomingMovies: Movie[]
  topRatedMovies: Movie[]
}

export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string | null
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type fetchSingleMovieParams = { genre: string; country: string; year: number | string }
