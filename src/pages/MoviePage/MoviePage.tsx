import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, CircularProgress } from '@material-ui/core'

import { Swiper } from '../../components'
import { MovieDetails } from './MovieDetails'

import {
  getMovieDetails,
  getRecommendationMovies,
  getMovieCredits,
  // getMovieReviews,
  fetchMovieDetails,
  getMovieId,
  getIsLoading,
} from '../../state'

import classes from './MoviePage.module.scss'

export const MoviePage = () => {
  const isLoading = useSelector(getIsLoading)
  const movieDetails = useSelector(getMovieDetails)
  const movieCredits = useSelector(getMovieCredits)
  // const movieReviews = useSelector(getMovieReviews)
  const recommendationMovies = useSelector(getRecommendationMovies)
  const movieId = useSelector(getMovieId)

  const dispatch = useDispatch()
  const { t } = useTranslation()

  // console.log(movieReviews)

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId))
  }, [dispatch, t, movieId])

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.loader}>
          <CircularProgress color="primary" />
        </div>
      ) : (
        <>
          {movieDetails && <MovieDetails movie={movieDetails} />}
          <Typography variant="h5" className={classes.title}>
            {t('actors')}
          </Typography>
          {movieCredits && <Swiper items={movieCredits.cast} people={true} />}
          <Typography variant="h5" className={classes.title}>
            {t('moreLikeThis')}
          </Typography>
          <Swiper items={recommendationMovies} />
        </>
      )}
    </div>
  )
}
