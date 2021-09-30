import {
  getMoviesId,
  fetchMovies,
  moviesSlice,
  transformGenres,
  getRandom,
  fetchGenres,
  fetchSingleMovie,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from './movies'
import { configureStore } from '@reduxjs/toolkit'
import {
  mockMovies,
  movies,
  movieWithAllParam,
  transformMovies,
  enGenresMock,
  ruGenresMock,
  enGenresSelectMock,
  ruGenresSelectMock,
  initialState,
} from '../__mocks__/'
import { HOST, API_KEY } from '../config'
import axios from 'axios'
import { i18n } from '../i18n/i18n'

jest.mock('i18next', () => ({
  language: 'en',
}))

const store = configureStore({
  reducer: function (state = initialState, action) {
    switch (action.type) {
      case 'searchMovies/fulfilled':
        state.items = action.payload
        state.byId = getMoviesId(action.payload)

        return state
      case 'genres/fulfilled':
        return action.payload
      default:
        return state
    }
  },
})

const movieName = 'squad'

describe('Movies slice actions', () => {
  it('transform movies from items to byId correctly', () => {
    mockMovies.forEach(movies => {
      const [mockData, result] = movies

      expect(getMoviesId(mockData)).toStrictEqual(result)
    })
  })
  it('test function returning a random value', () => {
    const randomValue = 0.4
    const min = 0
    const max = 5
    const expectedValue = 2
    jest.spyOn(global.Math, 'random').mockReturnValue(randomValue)
    expect(getRandom(min, max)).toEqual(expectedValue)
  })

  it('sets items and byId when fetchMovies is fulfilled', () => {
    const action = { type: fetchMovies.fulfilled.type, payload: movies }
    const state = moviesSlice.reducer(initialState, action)
    expect(state).toEqual({ ...initialState, items: movies, byId: transformMovies })
  })
  it('sets items and byId when fetchMovies is pending', () => {
    const action = { type: fetchMovies.pending.type }
    const state = moviesSlice.reducer(initialState, action)
    expect(state).toEqual(initialState)
  })

  it('search movies correctly', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { results: movies } })
    await store.dispatch(fetchMovies(movieName))

    expect(getSpy).toBeCalledWith(`${HOST}/search/movie?api_key=${API_KEY}&language=en&query=squad`)
  })

  it('search movies with error', async () => {
    const getSpyErr = jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject('Network Error'))
    await store.dispatch(fetchMovies(movieName))

    expect(getSpyErr).toBeCalled
  })

  it('test function for transforming genres', () => {
    expect(transformGenres(enGenresMock)).toEqual(enGenresSelectMock)

    i18n.language = 'ru'

    expect(transformGenres(ruGenresMock)).toEqual(ruGenresSelectMock)

    i18n.language = 'en'
  })

  it('sets genres when fetchGenres is fulfilled', () => {
    const action = { type: fetchGenres.fulfilled.type, payload: enGenresMock }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({ ...initialState, genres: enGenresMock })
  })

  it('fetch genres correctly', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { genres: enGenresMock } })
    await store.dispatch(fetchGenres())

    expect(getSpy).toBeCalledWith(`${HOST}/genre/movie/list?api_key=${API_KEY}&language=en`)

    const getSpyErr = jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject('Network Error'))
    await store.dispatch(fetchGenres())

    expect(getSpyErr).toBeCalled
  })

  it('sets selectedMovie when fetchSingleMovie is fulfilled with movies', () => {
    const action = { type: fetchSingleMovie.fulfilled.type, payload: [movieWithAllParam] }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      selectedMovie: movieWithAllParam,
      isLoading: false,
      isFoundMovie: true,
    })
  })

  it('sets selectedMovie when fetchSingleMovie is fulfilled without movies', () => {
    const action = { type: fetchSingleMovie.fulfilled.type, payload: [] }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      selectedMovie: null,
      isLoading: false,
      isFoundMovie: true,
    })
  })

  it('fetchSingleMovie is pending', () => {
    const action = { type: fetchSingleMovie.pending.type }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      isFoundMovie: false,
    })
  })

  it('fetch filterMovie correctly', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { results: movies } })
    await store.dispatch(fetchSingleMovie({ genre: '17', country: 'RU', year: 1971 }))

    expect(getSpy).toBeCalledWith(
      `${HOST}/discover/movie?api_key=${API_KEY}&with_genres=17&region=RU&primary_release_year=1971&language=en&include_adult=false`
    )

    const getSpyErr = jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject('Network Error'))
    await store.dispatch(fetchSingleMovie({ genre: '17', country: 'RU', year: 1971 }))

    expect(getSpyErr).toBeCalled
  })

  it('sets popularMovies when fetchPopularMovies is fulfilled', () => {
    const action = { type: fetchPopularMovies.fulfilled.type, payload: movies }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      popularMovies: movies,
    })
  })

  it('fetchPopularMovies is pending', () => {
    const action = { type: fetchPopularMovies.pending.type }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('fetch popular movies correctly', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { results: movies } })
    await store.dispatch(fetchPopularMovies())

    expect(getSpy).toBeCalledWith(`${HOST}/movie/popular?api_key=${API_KEY}&language=en`)

    const getSpyErr = jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject('Network Error'))
    await store.dispatch(fetchPopularMovies())

    expect(getSpyErr).toBeCalled
  })

  it('sets popularMovie when fetchTrendingMovies is fulfilled', () => {
    const action = { type: fetchTrendingMovies.fulfilled.type, payload: movies }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      trendingMovies: movies,
    })
  })
  it('fetchTrendingMovie is pending', () => {
    const action = { type: fetchTrendingMovies.pending.type }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    })
  })
  it('fetch trending movies correctly', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { results: movies } })
    await store.dispatch(fetchTrendingMovies(false))

    expect(getSpy).toBeCalledWith(`${HOST}/trending/movie/day?api_key=${API_KEY}&language=en`)

    const getSpyErr = jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject('Network Error'))
    await store.dispatch(fetchTrendingMovies(true))

    expect(getSpyErr).toBeCalled
  })

  it('fetchNowPlayingMovies is pending', () => {
    const action = { type: fetchNowPlayingMovies.pending.type }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('fetch now playing movies correctly', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { results: movies } })
    await store.dispatch(fetchNowPlayingMovies())

    expect(getSpy).toBeCalledWith(`${HOST}/movie/now_playing?api_key=${API_KEY}&language=en`)

    const getSpyErr = jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject('Network Error'))
    await store.dispatch(fetchNowPlayingMovies())

    expect(getSpyErr).toBeCalled
  })

  it('sets nowPlayingMovies when fetchNowPlayingMovies is fulfilled', () => {
    const action = { type: fetchNowPlayingMovies.fulfilled.type, payload: movies }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      nowPlayingMovies: movies,
    })
  })

  it('fetchUpcomingMovies is pending', () => {
    const action = { type: fetchUpcomingMovies.pending.type }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('fetch upcoming movies correctly', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { results: movies } })
    await store.dispatch(fetchUpcomingMovies())

    expect(getSpy).toBeCalledWith(`${HOST}/movie/upcoming?api_key=${API_KEY}&language=en`)

    const getSpyErr = jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject('Network Error'))
    await store.dispatch(fetchUpcomingMovies())

    expect(getSpyErr).toBeCalled
  })

  it('sets upcomingMovies when fetchUpcomingMovies is fulfilled', () => {
    const action = { type: fetchUpcomingMovies.fulfilled.type, payload: movies }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      upcomingMovies: movies,
    })
  })

  it('fetchTopRatedMovies is pending', () => {
    const action = { type: fetchTopRatedMovies.pending.type }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    })
  })

  it('fetch top rated movies correctly', async () => {
    const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { results: movies } })
    await store.dispatch(fetchTopRatedMovies())

    expect(getSpy).toBeCalledWith(`${HOST}/movie/top_rated?api_key=${API_KEY}&language=en`)

    const getSpyErr = jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject('Network Error'))
    await store.dispatch(fetchTopRatedMovies())

    expect(getSpyErr).toBeCalled
  })

  it('sets topRatedMovies when fetchTopRatedMovies is fulfilled', () => {
    const action = { type: fetchTopRatedMovies.fulfilled.type, payload: movies }
    const state = moviesSlice.reducer(initialState, action)

    expect(state).toEqual({
      ...initialState,
      topRatedMovies: movies,
    })
  })
})
