import axios from 'axios'
import { API_KEY, HOST } from '../config'
import { MovieGetParams } from './types'

export const discoverMovies = async languageCode =>
  await axios.get(`${HOST}/discover/movie?api_key=${API_KEY}&language=${languageCode}`)

export const searchMovies = async (languageCode, query) =>
  await axios.get(`${HOST}/search/movie?api_key=${API_KEY}&language=${languageCode}&query=${query}`)

export const getMovie = async ({
  genre,
  country,
  year,
  languageCode,
  includeAdults = false,
}: MovieGetParams) =>
  await axios.get(
    `${HOST}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&region=${country}&primary_release_year=${year}&language=${languageCode}&include_adult=${includeAdults}`
  )

export const getGenres = async languageCode =>
  await axios.get(`${HOST}/genre/movie/list?api_key=${API_KEY}&language=${languageCode}`)

export const getPopularMovies = async languageCode =>
  await axios.get(`${HOST}/movie/popular?api_key=${API_KEY}&language=${languageCode}`)

export const getTrendingMovies = async (languageCode, timeWindow = 'day', mediaType = 'movie') =>
  await axios.get(`${HOST}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}&language=${languageCode}`)

export const getNowPlaying = async languageCode =>
  await axios.get(`${HOST}/movie/now_playing?api_key=${API_KEY}&language=${languageCode}`)

export const getUpcoming = async languageCode =>
  await axios.get(`${HOST}/movie/upcoming?api_key=${API_KEY}&language=${languageCode}`)

export const getTopRated = async languageCode =>
  await axios.get(`${HOST}/movie/top_rated?api_key=${API_KEY}&language=${languageCode}`)

export const getDetails = async (id, languageCode) =>
  await axios.get(`${HOST}/movie/${id}?api_key=${API_KEY}&language=${languageCode}`)

export const getCredits = async (id, languageCode) =>
  await axios.get(`${HOST}/movie/${id}/credits?api_key=${API_KEY}&language=${languageCode}`)

export const getReviews = async (id, languageCode) =>
  await axios.get(`${HOST}/movie/${id}/reviews?api_key=${API_KEY}&language=${languageCode}`)

export const getRecommendations = async (id, languageCode) =>
  await axios.get(`${HOST}/movie/${id}/recommendations?api_key=${API_KEY}&language=${languageCode}`)
