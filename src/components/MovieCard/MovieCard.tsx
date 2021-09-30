import { Typography, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'

import { AverageVote } from '..'
import { Movie } from '../../state/types'
import { getPosterPath, getVote } from '../../pages/DiscoverPage/FoundMovie/utils'
import { styles } from './MovieCard.styles'

type PopularCardProps = {
  movie: Movie
}

const useStyles = makeStyles(styles)

export const MovieCard = ({ movie }: PopularCardProps) => {
  const classes = useStyles()
  const posterPath = getPosterPath(movie)
  const vote = getVote(movie)
  const redirectPath = movie && `/movie/${movie.id}-${movie.title}`

  const [redirect, setRedirect] = useState(false)

  const redirectToMovie = () => setRedirect(true)

  return (
    <>
      {redirect && <Redirect to={redirectPath} />}
      <div className={classes.container}>
        <img
          src={posterPath}
          alt="poster"
          width="202px"
          height="300px"
          className={classes.poster}
          onClick={redirectToMovie}
          data-testid={'poster'}
        />
        <AverageVote vote={vote} classesName={classes.vote} />
        <Typography className={classes.title} data-testid={'title'} onClick={redirectToMovie}>
          {movie.title}
        </Typography>
      </div>
    </>
  )
}
