import { Typography, makeStyles } from '@material-ui/core'

import { getPhotoPath } from '../../pages/DiscoverPage/FoundMovie/utils'
import { styles } from './PeopleCard.styles'
import { PeopleCardProps } from './types'

const useStyles = makeStyles(styles)

export const PeopleCard = ({ people }: PeopleCardProps) => {
  const classes = useStyles()
  const profilePath = getPhotoPath(people)

  return (
    <>
      <div className={classes.container}>
        <img
          src={profilePath}
          alt="poster"
          width="202px"
          height="300px"
          className={classes.poster}
          data-testid={'photo'}
        />
        <Typography className={classes.title} data-testid={'name'}>
          {people.name}
        </Typography>
        <Typography className={classes.title} data-testid={'character'}>
          {`(${people.character})`}
        </Typography>
      </div>
    </>
  )
}
