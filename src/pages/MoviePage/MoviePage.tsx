import { useParams } from 'react-router-dom'

import classes from './MoviePage.module.scss'

export const MoviePage = () => {
  const { id } = useParams()

  return (
    <div className={classes.container}>
      <h1 className={classes.title}> It is single movie with id {id}</h1>
    </div>
  )
}
