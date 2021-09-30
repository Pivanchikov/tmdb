import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getSelectedMovie, setMovieFound } from '../../../state'
import { AverageVote } from '../../../components'
import { styles } from './FoundMovie.styles'
import { getPosterPath, getYear, getVote } from './utils'

const useStyles = makeStyles(styles)

export const FoundMovie = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { t } = useTranslation()
  const movie = useSelector(getSelectedMovie)

  const [redirect, setRedirect] = useState(false)

  const redirectToMovie = async () => {
    await setRedirect(true)
    dispatch(setMovieFound(false))
  }

  const vote = getVote(movie)
  const year = getYear(movie)
  const overview = (movie && movie.overview) || t('overview')

  const posterPath = getPosterPath(movie)
  const redirectPath = movie && `/movie/${movie.id}-${movie.title}`

  return (
    <>
      {redirect && <Redirect to={redirectPath} />}
      <section className={classes.container}>
        {movie ? (
          <>
            <div className="poster">
              <img
                src={posterPath}
                alt="poster"
                width="200px"
                height="300px"
                className={classes.poster}
                onClick={redirectToMovie}
                data-testid={'poster'}
              />
            </div>
            <div className={classes.movieInfo}>
              <header className={classes.header}>
                <Typography
                  variant="h5"
                  className={classes.title}
                  onClick={redirectToMovie}
                  data-testid={'title'}
                >
                  {movie.title}
                </Typography>
                <AverageVote vote={vote} />
              </header>
              <Typography className={classes.date} data-testid={'date'}>
                {year}
              </Typography>
              <Typography className={classes.overview} data-testid={'overview'}>
                {overview}
              </Typography>
            </div>
          </>
        ) : (
          <Typography variant="h5" className={classes.movieNotFound}>
            Movie not found
          </Typography>
        )}
      </section>
    </>
  )
}
