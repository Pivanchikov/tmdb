export type MoviesState = {
  items: Movie[]
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
  movieDetails: Movie | null
  recommendationMovies: Movie[]
  credits: Credits | null
  reviews: Reviews | null
  movieId: null | number
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
  media_type?: string
  genres?: [{ name: string; label: string }]
}

export type fetchSingleMovieParams = { genre: string; country: string; year: number | string }

export type Credits = { id: number; cast: Cast[]; crew: Cast[] }

export type Cast = {
  adult: boolean
  cast_id: number
  character: string
  credit_id: number
  gender: number
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: string
}

export type Reviews = {
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string
    rating: number
  }
  content: string
  id: string
  updated_at: string
  url: string
}
