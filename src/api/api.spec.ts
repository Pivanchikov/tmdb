import axios from 'axios'
import {
  discoverMovies,
  searchMovies,
  getGenres,
  getMovie,
  getPopularMovies,
  getTrendingMovies,
  getNowPlaying,
  getUpcoming,
  getTopRated,
} from './api'
import { movies as expectedMovies, enGenresMock as expectedGenres } from '../__mocks__/'
import { RU } from '../i18n/i18n'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedParams = { genre: '12', country: 'RU', year: '1971', languageCode: 'en' }
const mockedWithAdultParams = {
  genre: '12',
  country: 'RU',
  year: '1971',
  languageCode: 'en',
  includeAdults: false,
}

describe('Api', () => {
  it('fetches successfully data from an API', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(expectedMovies))

    await expect(discoverMovies(RU)).resolves.toEqual(expectedMovies)
  })

  it('fetches successfully search data from an API', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(expectedMovies))

    await expect(searchMovies(RU, 'squad')).resolves.toEqual(expectedMovies)
  })

  it('fetches genres from an API', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(expectedGenres))

    await expect(getGenres(RU)).resolves.toEqual(expectedGenres)
  })

  it('fetches successfully single movie from an API', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve(expectedMovies))

    await expect(getMovie(mockedParams)).resolves.toEqual(expectedMovies)
    await expect(getMovie(mockedWithAdultParams)).resolves.toEqual(expectedMovies)
  })

  it('fetches popular movies from an API', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(expectedMovies))

    await expect(getPopularMovies(RU)).resolves.toEqual(expectedMovies)
  })

  it('fetches trending movies from an API', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(expectedMovies))

    await expect(getTrendingMovies(RU)).resolves.toEqual(expectedMovies)
    await expect(getTrendingMovies('week', RU, 'movie')).resolves.toEqual(expectedMovies)
  })

  it('fetches now playing movies from an API', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(expectedMovies))

    await expect(getNowPlaying(RU)).resolves.toEqual(expectedMovies)
  })

  it('fetches upcoming movies from an API', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(expectedMovies))

    await expect(getUpcoming(RU)).resolves.toEqual(expectedMovies)
  })

  it('fetches top rated movies from an API', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(expectedMovies))

    await expect(getTopRated(RU)).resolves.toEqual(expectedMovies)
  })
})
