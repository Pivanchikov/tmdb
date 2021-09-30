import { Movie } from '../state/types'

export type Genres = {
  id: number
  name: string
}

export type GenresSelectOption = {
  value: number | string
  label: string
}

export type TransformMovies = {
  [key: string]: Movie
}
