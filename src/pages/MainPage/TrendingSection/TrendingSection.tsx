import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { makeStyles, Typography, Switch, CircularProgress } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { getTrendMovies, fetchTrendingMovies, getIsLoading } from '../../../state'
import { Swiper } from '../../../components'
import { styles } from './TrendingSection.styles'

const useStyles = makeStyles(styles)

export const TrendingSection = () => {
  const trendingMovies = useSelector(getTrendMovies)
  const isLoading = useSelector(getIsLoading)

  const dispatch = useDispatch()
  const classes = useStyles()
  const { t } = useTranslation()
  const [dailyTrending, setDailyTrending] = useState(false)

  const handleTrendingChange = e => setDailyTrending(e.target.checked)

  useEffect(() => {
    dispatch(fetchTrendingMovies(dailyTrending))
  }, [dispatch, t, dailyTrending])

  return isLoading ? (
    <div className={classes.loader}>
      <CircularProgress color="primary" className={classes.loader} />
    </div>
  ) : (
    <div>
      <div className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          {t('trending')}
        </Typography>
        <div className={classes.switchContainer}>
          <Typography color="primary">{t('today')}</Typography>
          <Switch
            classes={{ track: classes.track, thumb: classes.thumb }}
            onChange={handleTrendingChange}
            checked={dailyTrending}
            data-testid={'switch'}
          />
          <Typography color="primary">{t('thisWeek')}</Typography>
        </div>
      </div>
      <Swiper items={trendingMovies} />
    </div>
  )
}
