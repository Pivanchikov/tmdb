import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { getNowPLayingMovies, fetchNowPlayingMovies } from '../../../state'
import { Swiper } from '../../../components'
import { styles } from './NowPlayingSection.styles'

const useStyles = makeStyles(styles)

export const NowPlayingSection = () => {
  const nowPlayingMovies = useSelector(getNowPLayingMovies)
  const dispatch = useDispatch()
  const classes = useStyles()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(fetchNowPlayingMovies())
  }, [dispatch, t])

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        {t('nowPlaying')}
      </Typography>
      <Swiper items={nowPlayingMovies} />
    </div>
  )
}
