import { createSlice, createAsyncThunk, createSelector, createAction } from '@reduxjs/toolkit'
import i18n from 'i18next'

import {
  searchMovies,
  getGenres,
  getMovie,
  getPopularMovies,
  getTrendingMovies,
  getNowPlaying,
  getUpcoming,
  getTopRated,
  getDetails,
  getCredits,
  getReviews,
  getRecommendations,
} from '../api/api'
import { MoviesState, fetchSingleMovieParams, Movie, Credits, Reviews } from './types'
import { transformGenres, getMoviesId, getRandom } from './utils'

const ACTIONS = {
  fetchMovies: 'movies/searchMovies',
  fetchSingleMovie: 'movies/singleMovie',
  fetchGenres: 'movies/genres',
  fetchPopularMovies: 'movies/popularMovies',
  fetchTrendingMovies: 'movies/trendingMovies',
  fetchNowPlayingMovies: 'movies/nowPlayingMovies',
  fetchUpcomingMovies: 'movies/upcomingMovies',
  fetchTopRatedMovies: 'movies/topRatedMovies',
  fetchMovieDetails: 'movies/movieDetails',
}

export const fetchMovies = createAsyncThunk<[], string>(
  `${ACTIONS.fetchMovies}`,
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchMovies(i18n.language, query)
      const {
        data: { results },
      } = response

      return results
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchGenres = createAsyncThunk(`${ACTIONS.fetchGenres}`, async (_, { rejectWithValue }) => {
  try {
    const response = await getGenres(i18n.language)
    const {
      data: { genres },
    } = response

    return transformGenres(genres)
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const fetchSingleMovie = createAsyncThunk<[], fetchSingleMovieParams>(
  `${ACTIONS.fetchSingleMovie}`,
  async (params, { rejectWithValue }) => {
    try {
      const response = await getMovie({ ...params, languageCode: i18n.language })
      const {
        data: { results },
      } = response

      return results
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchPopularMovies = createAsyncThunk(
  `${ACTIONS.fetchPopularMovies}`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPopularMovies(i18n.language)
      const {
        data: { results },
      } = response

      return results
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchTrendingMovies = createAsyncThunk<[], boolean>(
  `${ACTIONS.fetchTrendingMovies}`,
  async (isDaily, { rejectWithValue }) => {
    try {
      const response = isDaily
        ? await getTrendingMovies(i18n.language, 'week')
        : await getTrendingMovies(i18n.language, 'day')
      const {
        data: { results },
      } = response

      return results
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchNowPlayingMovies = createAsyncThunk(
  `${ACTIONS.fetchNowPlayingMovies}`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNowPlaying(i18n.language)

      const {
        data: { results },
      } = response

      return results
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUpcomingMovies = createAsyncThunk(
  `${ACTIONS.fetchUpcomingMovies}`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUpcoming(i18n.language)

      const {
        data: { results },
      } = response

      return results
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchTopRatedMovies = createAsyncThunk(
  `${ACTIONS.fetchTopRatedMovies}`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTopRated(i18n.language)

      const {
        data: { results },
      } = response

      return results
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchMovieDetails = createAsyncThunk<[Movie, Movie[], Credits, Reviews], number>(
  `${ACTIONS.fetchMovieDetails}`,
  async (id, { rejectWithValue }) => {
    try {
      const details = await getDetails(id, i18n.language)
      const credits = await getCredits(id, i18n.language)
      const reviews = await getReviews(id, i18n.language)
      const recommendations = await getRecommendations(id, i18n.language)

      return [details.data, recommendations.data.results, credits.data, reviews.data.results]
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const initialState: MoviesState = {
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
export const setMovieFound = createAction('setMovieFound', (t: boolean) => ({ payload: t }))
export const setMovieId = createAction('setMovieId', (t: number) => ({ payload: t }))

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      state.items = payload
      state.byId = getMoviesId(payload)
    })
    builder.addCase(fetchGenres.fulfilled, (state, { payload }) => {
      state.genres = payload
    })
    builder.addCase(setMovieFound, (state, { payload }) => {
      state.isFoundMovie = payload
    })
    builder.addCase(fetchSingleMovie.fulfilled, (state, { payload }) => {
      const min = 0
      const max = payload.length

      state.selectedMovie = payload.length ? payload[getRandom(min, max)] : null
      state.isLoading = false
      state.isFoundMovie = true
    })
    builder.addCase(fetchSingleMovie.pending, state => {
      state.isFoundMovie = false
      state.isLoading = true
    })
    builder.addCase(fetchPopularMovies.fulfilled, (state, { payload }) => {
      state.popularMovies = payload
      state.isLoading = false
    })
    builder.addCase(fetchPopularMovies.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchTrendingMovies.fulfilled, (state, { payload }) => {
      state.trendingMovies = payload
      state.isLoading = false
    })
    builder.addCase(fetchTrendingMovies.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchNowPlayingMovies.fulfilled, (state, { payload }) => {
      state.nowPlayingMovies = payload
      state.isLoading = false
    })
    builder.addCase(fetchNowPlayingMovies.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchUpcomingMovies.fulfilled, (state, { payload }) => {
      state.upcomingMovies = payload
      state.isLoading = false
    })
    builder.addCase(fetchUpcomingMovies.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, { payload }) => {
      state.topRatedMovies = payload
      state.isLoading = false
    })
    builder.addCase(fetchTopRatedMovies.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchMovieDetails.fulfilled, (state, { payload }) => {
      const [details, recommendations, credits, reviews] = payload
      state.movieDetails = details
      state.recommendationMovies = recommendations
      state.credits = credits
      state.reviews = reviews
      state.isLoading = false
    })
    builder.addCase(fetchMovieDetails.pending, state => {
      state.isLoading = true
    })
    builder.addCase(setMovieId, (state, { payload }) => {
      state.movieId = payload
    })
  },
})

const getMovies = state => state.movies

export const getMoviesItems = createSelector(getMovies, movies => movies.items)
export const getGenresItems = createSelector(getMovies, movies => movies.genres)
export const getSelectedMovie = createSelector(getMovies, movies => movies.selectedMovie)
export const getIsLoading = createSelector(getMovies, movies => movies.isLoading)
export const getIsFoundMovie = createSelector(getMovies, movies => movies.isFoundMovie)
export const getPopularMovie = createSelector(getMovies, movies => movies.popularMovies)
export const getTrendMovies = createSelector(getMovies, movies => movies.trendingMovies)
export const getNowPLayingMovies = createSelector(getMovies, movies => movies.nowPlayingMovies)
export const getUpcomingMovies = createSelector(getMovies, movies => movies.upcomingMovies)
export const getTopRatedMovies = createSelector(getMovies, movies => movies.topRatedMovies)
export const getMovieDetails = createSelector(getMovies, movies => movies.movieDetails)
export const getRecommendationMovies = createSelector(getMovies, movies => movies.recommendationMovies)
export const getMovieCredits = createSelector(getMovies, movies => movies.credits)
export const getMovieReviews = createSelector(getMovies, movies => movies.reviews)
export const getMovieId = createSelector(getMovies, movies => movies.movieId)
