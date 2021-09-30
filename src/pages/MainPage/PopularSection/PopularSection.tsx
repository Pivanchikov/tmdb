import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { getPopularMovie, fetchPopularMovies } from '../../../state'
import { Swiper } from '../../../components'
import { styles } from './PopularSection.styles'

const useStyles = makeStyles(styles)

export const PopularSection = () => {
  const popularMovie = useSelector(getPopularMovie)
  const dispatch = useDispatch()
  const classes = useStyles()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(fetchPopularMovies())
  }, [dispatch, t])

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        {t('popularMovies')}
      </Typography>
      <Swiper items={popularMovie} />
    </div>
  )
}
