import { capitalize } from 'lodash'
import i18n from 'i18next'

import { RU } from '../i18n/i18n'

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

export const getMoviesId = value =>
  value.reduce((byId, item) => {
    byId[item.id.toString()] = item

    return byId
  }, {})

export const getRandom = (min, max): number => Math.floor(Math.random() * (max - min)) + min
