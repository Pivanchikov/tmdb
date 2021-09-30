import noImage from '../../../assets/img/noImage.svg'
import { Movie } from '../../../state/types'

const voteLength = 1

export const choicePosterPath = (path, width) =>
  path ? `https://image.tmdb.org/t/p/w${width}${path}` : noImage
export const formatDate = date => new Date(date).getFullYear()

export const getVote = (movie: Movie | null) => (movie ? movie.vote_average.toFixed(voteLength) : '')
export const getYear = (movie: Movie | null) => (movie ? formatDate(movie.release_date) : '')
export const getPosterPath = (movie: Movie | null, width = '200') =>
  movie ? choicePosterPath(movie.poster_path, width) : ''
export const getPhotoPath = (people, width = '200') =>
  people ? choicePosterPath(people.profile_path, width) : ''
