import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { getTopRatedMovies, fetchTopRatedMovies } from '../../../state'
import { Swiper } from '../../../components'
import { styles } from './TopRatedSection.styles'

const useStyles = makeStyles(styles)

export const TopRatedSection = () => {
  const topRatedMovies = useSelector(getTopRatedMovies)
  const dispatch = useDispatch()
  const classes = useStyles()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(fetchTopRatedMovies())
  }, [dispatch, t])

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        {t('topRated')}
      </Typography>
      <Swiper items={topRatedMovies} />
    </div>
  )
}
