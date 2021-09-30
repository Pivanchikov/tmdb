import { createSlice, createAsyncThunk, createSelector, createAction } from '@reduxjs/toolkit'
import { capitalize } from 'lodash'
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
} from '../api/api'
import { MoviesState, fetchSingleMovieParams } from './types'
import { RU } from '../i18n/i18n'

const ACTIONS = {
  fetchMovies: 'movies/searchMovies',
  fetchSingleMovie: 'movies/singleMovie',
  fetchGenres: 'movies/genres',
  fetchPopularMovies: 'movies/popularMovies',
  fetchTrendingMovies: 'movies/trendingMovies',
  fetchNowPlayingMovies: 'movies/nowPlayingMovies',
  fetchUpcomingMovies: 'movies/upcomingMovies',
  fetchTopRatedMovies: 'movies/topRatedMovies',
}

export const transformGenres = genres =>
  i18n.language === RU
    ? genres.map(genre => ({
        value: genre.id,
        label: capitalize(genre.name),
      }))
    : genres.map(genre => ({
        value: genre.id,
        label: genre.name,
      }))

export const getRandom = (min, max): number => Math.floor(Math.random() * (max - min)) + min

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

export const getMoviesId = value =>
  value.reduce((byId, item) => {
    byId[item.id.toString()] = item

    return byId
  }, {})

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
}
export const setMovieFound = createAction('setMovieFound', (t: boolean) => ({ payload: t }))
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
  },
})

export const { actions, reducer: movies } = moviesSlice

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
