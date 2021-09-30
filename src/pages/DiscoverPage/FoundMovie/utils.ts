import noImage from '../../../assets/img/noImage.svg'
import { Movie } from '../../../state/types'

const voteLength = 1

export const choicePosterPath = path => (path ? `https://image.tmdb.org/t/p/w200${path}` : noImage)
export const formatDate = date => new Date(date).getFullYear()
export const formatVote = (vote: number) => (Number.isInteger(vote) ? vote.toFixed(voteLength) : vote)

export const getVote = (movie: Movie | null) => (movie ? formatVote(movie.vote_average) : '')
export const getYear = (movie: Movie | null) => (movie ? formatDate(movie.release_date) : '')
export const getPosterPath = (movie: Movie | null) => (movie ? choicePosterPath(movie.poster_path) : '')
