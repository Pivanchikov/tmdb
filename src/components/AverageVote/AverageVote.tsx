import { Typography, makeStyles } from '@material-ui/core'
import cn from 'classnames'

import { styles } from './AverageVote.styles'

const useStyles = makeStyles(styles)

type AverageVoteProps = {
  vote: number | string
  classesName?: string
}

const LOW_VOTE = 4
const HIGH_VOTE = 7

export const AverageVote = ({ vote, classesName }: AverageVoteProps) => {
  const classes = useStyles()
  const lowVote = vote < LOW_VOTE
  const mediumVote = vote >= LOW_VOTE && vote < HIGH_VOTE
  const highVote = vote >= HIGH_VOTE

  return (
    <Typography
      className={cn(
        (lowVote && classes.red) || (mediumVote && classes.gray) || (highVote && classes.green),
        classesName
      )}
      data-testid={'vote'}
    >
      {vote}
    </Typography>
  )
}
