import { Typography, makeStyles } from '@material-ui/core'

import { AverageVote } from '../../../components'
import { Movie } from '../../../state/types'
import { getPosterPath, getVote, getYear } from '../../DiscoverPage/FoundMovie/utils'
import { styles } from './MovieDetails.styles'

type MovieDetailsProps = {
  movie: Movie
}

const useStyles = makeStyles(styles)
const posterWidth = '300'

export const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const classes = useStyles()
  const posterPath = getPosterPath(movie, posterWidth)
  const vote = getVote(movie)
  const year = getYear(movie)

  return (
    <div className={classes.container}>
      <div className="poster">
        <img src={posterPath} alt="poster" className={classes.poster} data-testid={'poster'} />
      </div>
      <div className={classes.movieInfo}>
        <header className={classes.header}>
          <Typography variant="h5" className={classes.title} data-testid={'title'}>
            {movie.title}
          </Typography>
          <AverageVote vote={vote} />
        </header>
        <Typography className={classes.date} data-testid={'date'}>
          {year}
        </Typography>
        <Typography className={classes.overview} data-testid={'overview'}>
          {movie.overview}
        </Typography>
        {movie.genres?.map(item => (
          <div key={item.name} className={classes.genre}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  )
}
