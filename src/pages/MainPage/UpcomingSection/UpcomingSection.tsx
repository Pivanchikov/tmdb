import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { getUpcomingMovies, fetchUpcomingMovies } from '../../../state'
import { Swiper } from '../../../components'
import { styles } from './UpcomingSection.styles'

const useStyles = makeStyles(styles)

export const UpcomingSection = () => {
  const upcomingMovies = useSelector(getUpcomingMovies)
  const dispatch = useDispatch()
  const classes = useStyles()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(fetchUpcomingMovies())
  }, [dispatch, t])

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        {t('upcoming')}
      </Typography>
      <Swiper items={upcomingMovies} />
    </div>
  )
}
